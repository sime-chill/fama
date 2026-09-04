package main

import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"runtime"
	"sort"
	"strings"
	"time"
)

type Config struct {
	PersonalRepo    string `json:"personal_repo"`
	PersonalGitRepo string `json:"personal_git_repo"`
	PersonalRemote  string `json:"personal_remote"`
	PersonalBranch  string `json:"personal_release_branch"`
	PersonalBackup  string `json:"personal_backup_branch"`
	FamaRepo        string `json:"fama_repo"`
	WorkDir         string `json:"work_dir"`
	PersonalDomain  string `json:"personal_domain"`
	FamaBasePath    string `json:"fama_base_path"`
	GitHubOwner     string `json:"github_owner"`
	FamaRepository  string `json:"fama_repository"`
	WSLDistribution string `json:"wsl_distribution"`
	Bun             string `json:"bun"`
	Node            string `json:"node"`
	GitHubCLI       string `json:"github_cli"`

	configDir string
}

var attrRE = regexp.MustCompile(`(?i)(?:href|src)=["']([^"']+)["']`)

func main() {
	os.Exit(runMain())
}

func runMain() int {
	root := flag.NewFlagSet("siteflow", flag.ContinueOnError)
	configPath := root.String("config", "siteflow.json", "path to siteflow configuration")
	root.SetOutput(io.Discard)
	if err := root.Parse(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return 2
	}
	args := root.Args()
	if len(args) == 0 {
		usage()
		return 2
	}

	cfg, err := loadConfig(*configPath)
	if err != nil {
		fmt.Fprintln(os.Stderr, "configuration:", err)
		return 1
	}
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Minute)
	defer cancel()

	command := args[0]
	switch command {
	case "doctor":
		err = doctor(ctx, cfg)
	case "build":
		err = build(ctx, cfg)
	case "verify":
		err = verify(cfg)
	case "all":
		if err = doctor(ctx, cfg); err == nil {
			err = build(ctx, cfg)
		}
		if err == nil {
			err = verify(cfg)
		}
	case "serve":
		err = serve(cfg)
	case "publish":
		publishFlags := flag.NewFlagSet("publish", flag.ContinueOnError)
		apply := publishFlags.Bool("apply", false, "commit and push the validated release")
		if parseErr := publishFlags.Parse(args[1:]); parseErr != nil {
			err = parseErr
		} else {
			err = publish(ctx, cfg, *apply)
		}
	default:
		usage()
		return 2
	}
	if err != nil {
		fmt.Fprintln(os.Stderr, "siteflow:", err)
		return 1
	}
	return 0
}

func usage() {
	fmt.Println("usage: siteflow [-config siteflow.json] <doctor|build|verify|all|serve|publish>")
}

func loadConfig(path string) (Config, error) {
	abs, err := filepath.Abs(path)
	if err != nil {
		return Config{}, err
	}
	b, err := os.ReadFile(abs)
	if err != nil {
		return Config{}, err
	}
	var cfg Config
	if err := json.Unmarshal(b, &cfg); err != nil {
		return Config{}, err
	}
	cfg.configDir = filepath.Dir(abs)
	cfg.PersonalRepo = resolve(cfg.configDir, cfg.PersonalRepo)
	if cfg.PersonalGitRepo != "" {
		cfg.PersonalGitRepo = resolve(cfg.configDir, cfg.PersonalGitRepo)
	}
	cfg.FamaRepo = resolve(cfg.configDir, cfg.FamaRepo)
	cfg.WorkDir = resolve(cfg.configDir, cfg.WorkDir)
	cfg.Bun = resolveExecutable(cfg.configDir, cfg.Bun)
	cfg.Node = resolveExecutable(cfg.configDir, cfg.Node)
	cfg.GitHubCLI = resolveExecutable(cfg.configDir, cfg.GitHubCLI)
	if cfg.PersonalDomain == "" || cfg.FamaBasePath == "" || cfg.GitHubOwner == "" || cfg.FamaRepository == "" {
		return Config{}, errors.New("domain, FAMA base path, GitHub owner, and repository are required")
	}
	if cfg.PersonalBranch == "" {
		cfg.PersonalBranch = "redesign/acad-homepage"
	}
	if cfg.PersonalBackup == "" {
		cfg.PersonalBackup = "backup/pre-acad-homepage-20260904"
	}
	if cfg.PersonalGitRepo != "" && cfg.PersonalRemote == "" {
		return Config{}, errors.New("personal_remote is required when personal_git_repo is set")
	}
	if !strings.HasPrefix(cfg.FamaBasePath, "/") || !strings.HasSuffix(cfg.FamaBasePath, "/") {
		return Config{}, errors.New("fama_base_path must start and end with a slash")
	}
	return cfg, nil
}

func resolve(base, value string) string {
	if filepath.IsAbs(value) {
		return filepath.Clean(value)
	}
	return filepath.Clean(filepath.Join(base, value))
}

func resolveExecutable(base, value string) string {
	if value == "" {
		return value
	}
	if strings.ContainsAny(value, `/\\`) {
		return resolve(base, value)
	}
	return value
}

func doctor(ctx context.Context, cfg Config) error {
	fmt.Println("[doctor] checking repositories and content")
	checks := []string{
		filepath.Join(cfg.PersonalRepo, "CNAME"),
		filepath.Join(cfg.PersonalRepo, "_config.yml"),
		filepath.Join(cfg.PersonalRepo, "_pages", "about.md"),
		filepath.Join(cfg.FamaRepo, "package.json"),
		filepath.Join(cfg.FamaRepo, "lib", "catalog.ts"),
	}
	for _, path := range checks {
		if info, err := os.Stat(path); err != nil || info.IsDir() {
			return fmt.Errorf("required file is missing: %s", path)
		}
	}
	cname, err := os.ReadFile(filepath.Join(cfg.PersonalRepo, "CNAME"))
	if err != nil {
		return err
	}
	if strings.TrimSpace(string(cname)) != cfg.PersonalDomain {
		return fmt.Errorf("CNAME must be %q", cfg.PersonalDomain)
	}
	if err := rejectPlaceholders(cfg); err != nil {
		return err
	}
	if err := verifyPersonalContentSource(cfg); err != nil {
		return err
	}
	for _, tool := range []string{"git", "wsl.exe"} {
		if _, err := exec.LookPath(tool); err != nil {
			return fmt.Errorf("required tool %s was not found", tool)
		}
	}
	if cfg.Bun == "" {
		return errors.New("bun executable is not configured")
	}
	if _, err := os.Stat(cfg.Bun); err != nil {
		if _, lookErr := exec.LookPath(cfg.Bun); lookErr != nil {
			return fmt.Errorf("bun executable was not found: %s", cfg.Bun)
		}
	}
	if cfg.Node == "" {
		return errors.New("node executable is not configured")
	}
	if _, err := os.Stat(cfg.Node); err != nil {
		if _, lookErr := exec.LookPath(cfg.Node); lookErr != nil {
			return fmt.Errorf("node executable was not found: %s", cfg.Node)
		}
	}
	if err := run(ctx, cfg.FamaRepo, "git", "status", "--porcelain=v1"); err != nil {
		return fmt.Errorf("FAMA repository: %w", err)
	}
	if err := runWSL(ctx, cfg, cfg.PersonalRepo, "git status --porcelain=v1"); err != nil {
		return fmt.Errorf("personal repository: %w", err)
	}
	fmt.Println("[doctor] OK")
	return nil
}

// verifyPersonalContentSource treats the existing Jekyll homepage as the
// source of truth. Every non-empty body line must remain present verbatim in
// the new AcadHomepage page; additions such as the FAMA callout are
// allowed, but silent rewriting of personal facts is not.
func verifyPersonalContentSource(cfg Config) error {
	originalPath := filepath.Join(cfg.PersonalRepo, "index.md")
	migratedPath := filepath.Join(cfg.PersonalRepo, "_pages", "about.md")
	original, err := os.ReadFile(originalPath)
	if err != nil {
		return fmt.Errorf("content source is missing: %s", originalPath)
	}
	migrated, err := os.ReadFile(migratedPath)
	if err != nil {
		return err
	}
	body := stripFrontMatter(string(original))
	target := strings.ReplaceAll(string(migrated), "\r\n", "\n")
	for _, line := range strings.Split(strings.ReplaceAll(body, "\r\n", "\n"), "\n") {
		line = strings.TrimRight(line, " \t")
		if strings.TrimSpace(line) == "" {
			continue
		}
		if !strings.Contains(target, line) {
			return fmt.Errorf("personal content changed or was omitted: %q", line)
		}
	}
	return nil
}

func stripFrontMatter(markdown string) string {
	markdown = strings.ReplaceAll(markdown, "\r\n", "\n")
	if !strings.HasPrefix(markdown, "---\n") {
		return markdown
	}
	if end := strings.Index(markdown[4:], "\n---\n"); end >= 0 {
		return markdown[4+end+5:]
	}
	return markdown
}

func rejectPlaceholders(cfg Config) error {
	paths := []string{
		filepath.Join(cfg.PersonalRepo, "_config.yml"),
		filepath.Join(cfg.PersonalRepo, "_pages", "about.md"),
	}
	for _, path := range paths {
		b, err := os.ReadFile(path)
		if err != nil {
			return err
		}
		lower := strings.ToLower(string(b))
		for _, marker := range []string{"lorem ipsum", "your_google_scholar_id", "kaiming he"} {
			if strings.Contains(lower, marker) {
				return fmt.Errorf("template placeholder %q remains in %s", marker, path)
			}
		}
	}
	return nil
}

func build(ctx context.Context, cfg Config) error {
	fmt.Println("[build] personal homepage")
	personalOut := filepath.Join(cfg.WorkDir, "personal")
	famaOut := filepath.Join(cfg.WorkDir, "fama")
	previewOut := filepath.Join(cfg.WorkDir, "preview")
	for _, out := range []string{personalOut, famaOut, previewOut} {
		if err := resetOutputDir(cfg.WorkDir, out); err != nil {
			return err
		}
	}
	jekyll := fmt.Sprintf("bundle exec jekyll build --destination %s", shellQuote(toWSLPath(personalOut)))
	if err := runWSL(ctx, cfg, cfg.PersonalRepo, jekyll); err != nil {
		return fmt.Errorf("Jekyll build failed: %w", err)
	}

	fmt.Println("[build] FAMA static export")
	env := append(os.Environ(), "FAMA_PAGES_OUT="+famaOut, "FAMA_NODE="+cfg.Node)
	if err := runEnv(ctx, cfg.FamaRepo, env, cfg.Bun, "run", "build:pages"); err != nil {
		return fmt.Errorf("FAMA build failed: %w", err)
	}
	if err := copyTree(personalOut, previewOut); err != nil {
		return err
	}
	famaSource := famaOut
	if exists(filepath.Join(famaOut, strings.Trim(cfg.FamaBasePath, "/"), "index.html")) {
		famaSource = filepath.Join(famaOut, strings.Trim(cfg.FamaBasePath, "/"))
	}
	if err := copyTree(famaSource, filepath.Join(previewOut, strings.Trim(cfg.FamaBasePath, "/"))); err != nil {
		return err
	}
	fmt.Println("[build] combined preview assembled at", previewOut)
	return nil
}

func resetOutputDir(root, target string) error {
	rootAbs, err := filepath.Abs(root)
	if err != nil {
		return err
	}
	targetAbs, err := filepath.Abs(target)
	if err != nil {
		return err
	}
	rel, err := filepath.Rel(rootAbs, targetAbs)
	if err != nil || rel == "." || strings.HasPrefix(rel, ".."+string(filepath.Separator)) || rel == ".." {
		return fmt.Errorf("refusing to reset output outside work_dir: %s", target)
	}
	if err := os.RemoveAll(targetAbs); err != nil {
		return err
	}
	return os.MkdirAll(targetAbs, 0o755)
}

func verify(cfg Config) error {
	preview := filepath.Join(cfg.WorkDir, "preview")
	fmt.Println("[verify] checking generated pages and links")
	required := []string{
		"index.html",
		filepath.Join(strings.Trim(cfg.FamaBasePath, "/"), "index.html"),
		filepath.Join(strings.Trim(cfg.FamaBasePath, "/"), "chips", "index.html"),
		filepath.Join(strings.Trim(cfg.FamaBasePath, "/"), "memory", "index.html"),
		filepath.Join(strings.Trim(cfg.FamaBasePath, "/"), "sources", "index.html"),
		filepath.Join(strings.Trim(cfg.FamaBasePath, "/"), "vendors", "index.html"),
	}
	for _, rel := range required {
		if !exists(filepath.Join(preview, rel)) {
			return fmt.Errorf("required generated page is missing: %s", rel)
		}
	}
	rootHTML, err := os.ReadFile(filepath.Join(preview, "index.html"))
	if err != nil {
		return err
	}
	rootText := string(rootHTML)
	for _, marker := range []string{
		"Yuhan He",
		"heyh25@m.fudan.edu.cn",
		"CIMS: A CAM-Based In-Memory Sorting Architecture",
		"CAMPRO: A CAM-Based Processing-In-Memory Processor",
		"CAP-HDC: A CAM-Based Processor",
		"CorTile: A Scalable Neuromorphic Processing Core",
		"FAMA",
		cfg.FamaBasePath,
	} {
		if !strings.Contains(rootText, marker) {
			return fmt.Errorf("personal content marker is missing from output: %s", marker)
		}
	}
	for _, marker := range []string{"Lorem ipsum", "YOUR_GOOGLE_SCHOLAR_ID", "Kaiming He"} {
		if strings.Contains(rootText, marker) {
			return fmt.Errorf("template placeholder leaked into homepage: %s", marker)
		}
	}

	var broken []string
	err = filepath.WalkDir(preview, func(path string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() || strings.ToLower(filepath.Ext(path)) != ".html" {
			return nil
		}
		b, readErr := os.ReadFile(path)
		if readErr != nil {
			return readErr
		}
		for _, match := range attrRE.FindAllStringSubmatch(string(b), -1) {
			raw := strings.TrimSpace(match[1])
			if target, ok := localTarget(preview, path, raw); ok && !targetExists(target) {
				rel, _ := filepath.Rel(preview, path)
				broken = append(broken, fmt.Sprintf("%s -> %s", rel, raw))
			}
		}
		return nil
	})
	if err != nil {
		return err
	}
	if len(broken) > 0 {
		sort.Strings(broken)
		if len(broken) > 30 {
			broken = broken[:30]
		}
		return fmt.Errorf("broken internal links:\n  %s", strings.Join(broken, "\n  "))
	}
	chipPages, _ := filepath.Glob(filepath.Join(preview, strings.Trim(cfg.FamaBasePath, "/"), "chips", "*", "index.html"))
	memoryPages, _ := filepath.Glob(filepath.Join(preview, strings.Trim(cfg.FamaBasePath, "/"), "memory", "*", "index.html"))
	if len(chipPages) == 0 || len(memoryPages) == 0 {
		return fmt.Errorf("detail pages were not pre-rendered (chips=%d memory=%d)", len(chipPages), len(memoryPages))
	}
	fmt.Printf("[verify] OK (%d chip pages, %d memory pages)\n", len(chipPages), len(memoryPages))
	return nil
}

func localTarget(root, currentHTML, raw string) (string, bool) {
	if raw == "" || strings.HasPrefix(raw, "#") || strings.HasPrefix(raw, "//") || strings.HasPrefix(raw, "data:") || strings.HasPrefix(raw, "mailto:") || strings.HasPrefix(raw, "tel:") || strings.HasPrefix(raw, "javascript:") {
		return "", false
	}
	u, err := url.Parse(raw)
	if err != nil || u.IsAbs() || u.Path == "" {
		return "", false
	}
	var target string
	if strings.HasPrefix(u.Path, "/") {
		target = filepath.Join(root, filepath.FromSlash(strings.TrimPrefix(u.Path, "/")))
	} else {
		target = filepath.Join(filepath.Dir(currentHTML), filepath.FromSlash(u.Path))
	}
	return filepath.Clean(target), true
}

func targetExists(path string) bool {
	if exists(path) {
		return true
	}
	if filepath.Ext(path) == "" {
		return exists(filepath.Join(path, "index.html")) || exists(path+".html")
	}
	return false
}

func serve(cfg Config) error {
	preview := filepath.Join(cfg.WorkDir, "preview")
	if !exists(filepath.Join(preview, "index.html")) {
		return errors.New("preview is missing; run siteflow all first")
	}
	addr := "127.0.0.1:4173"
	fmt.Println("[serve] http://" + addr)
	return http.ListenAndServe(addr, http.FileServer(http.Dir(preview)))
}

func publish(ctx context.Context, cfg Config, apply bool) error {
	if err := doctor(ctx, cfg); err != nil {
		return err
	}
	if err := build(ctx, cfg); err != nil {
		return err
	}
	if err := verify(cfg); err != nil {
		return err
	}
	fmt.Printf("[publish] personal: https://%s/\n", cfg.PersonalDomain)
	fmt.Printf("[publish] FAMA:     https://%s%s\n", cfg.PersonalDomain, cfg.FamaBasePath)
	if !apply {
		fmt.Println("[publish] dry run complete; pass --apply to commit and push")
		return nil
	}
	gh := cfg.GitHubCLI
	if gh == "" {
		gh = "gh"
	}
	if _, err := os.Stat(gh); err != nil {
		if _, lookErr := exec.LookPath(gh); lookErr != nil {
			return errors.New("GitHub CLI is required for the one-time repository creation and is not installed")
		}
	}
	if err := run(ctx, cfg.FamaRepo, gh, "auth", "status", "--hostname", "github.com"); err != nil {
		return errors.New("GitHub CLI is not authenticated; run `gh auth login` first")
	}
	if err := run(ctx, cfg.FamaRepo, "git", "add", "-A"); err != nil {
		return err
	}
	if err := commitIfNeeded(ctx, cfg.FamaRepo, "Publish FAMA static site"); err != nil {
		return err
	}
	remote := cfg.GitHubOwner + "/" + cfg.FamaRepository
	if !gitHasRemote(ctx, cfg.FamaRepo, "origin") {
		if err := run(ctx, cfg.FamaRepo, gh, "repo", "create", remote, "--public", "--source", ".", "--remote", "origin"); err != nil {
			return err
		}
	}
	if err := run(ctx, cfg.FamaRepo, "git", "push", "-u", "origin", "main"); err != nil {
		return err
	}
	if err := ensurePages(ctx, cfg, gh, remote); err != nil {
		return err
	}
	if err := waitForPublicFAMA(ctx, cfg); err != nil {
		return err
	}
	personalCommit := `git add -A && ` +
		`(git diff --cached --quiet || git commit -m 'Rename AI memory architecture project to FAMA')`
	if err := runWSL(ctx, cfg, cfg.PersonalRepo, personalCommit); err != nil {
		return err
	}
	if err := pushPersonal(ctx, cfg); err != nil {
		return err
	}
	fmt.Println("[publish] pushed both repositories")
	return nil
}

func pushPersonal(ctx context.Context, cfg Config) error {
	if cfg.PersonalGitRepo == "" {
		pushes := fmt.Sprintf(
			"git push origin %s && git push -u origin HEAD:%s && git push origin HEAD:master",
			shellQuote(cfg.PersonalBackup),
			shellQuote(cfg.PersonalBranch),
		)
		return runWSL(ctx, cfg, cfg.PersonalRepo, pushes)
	}

	// WSL may occasionally lose outbound DNS while its filesystem remains
	// available. Git for Windows can push the shared refs over the authenticated
	// HTTPS transport without changing the repository's original SSH remote.
	safeDir := filepath.ToSlash(cfg.PersonalGitRepo)
	base := []string{"-c", "safe.directory=" + safeDir, "-C", cfg.PersonalGitRepo, "push", cfg.PersonalRemote}
	refspecs := []string{
		cfg.PersonalBackup + ":" + cfg.PersonalBackup,
		cfg.PersonalBranch + ":" + cfg.PersonalBranch,
		cfg.PersonalBranch + ":master",
	}
	for _, refspec := range refspecs {
		if err := run(ctx, cfg.configDir, "git", append(base, refspec)...); err != nil {
			return err
		}
	}
	return nil
}

func ensurePages(ctx context.Context, cfg Config, gh, remote string) error {
	query := exec.CommandContext(ctx, gh, "api", "repos/"+remote+"/pages")
	query.Dir = cfg.FamaRepo
	if query.Run() == nil {
		return nil
	}
	fmt.Println("[publish] enabling GitHub Pages with the workflow source")
	return run(ctx, cfg.FamaRepo, gh, "api", "--method", "POST", "repos/"+remote+"/pages", "-f", "build_type=workflow")
}

func waitForPublicFAMA(ctx context.Context, cfg Config) error {
	target := fmt.Sprintf("https://%s%s", cfg.PersonalDomain, cfg.FamaBasePath)
	fmt.Println("[publish] waiting for", target)
	client := &http.Client{Timeout: 15 * time.Second}
	ticker := time.NewTicker(15 * time.Second)
	defer ticker.Stop()
	deadline := time.NewTimer(6 * time.Minute)
	defer deadline.Stop()
	for {
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, target, nil)
		if err != nil {
			return err
		}
		resp, requestErr := client.Do(req)
		if requestErr == nil {
			body, readErr := io.ReadAll(io.LimitReader(resp.Body, 2<<20))
			resp.Body.Close()
			if readErr == nil && resp.StatusCode == http.StatusOK && strings.Contains(string(body), "FAMA") {
				fmt.Println("[publish] FAMA is live")
				return nil
			}
		}
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-deadline.C:
			return fmt.Errorf("GitHub Pages did not become ready within six minutes: %s", target)
		case <-ticker.C:
		}
	}
}

func commitIfNeeded(ctx context.Context, dir, message string) error {
	cmd := exec.CommandContext(ctx, "git", "diff", "--cached", "--quiet")
	cmd.Dir = dir
	if err := cmd.Run(); err == nil {
		return nil
	}
	return run(ctx, dir, "git", "commit", "-m", message)
}

func gitHasRemote(ctx context.Context, dir, name string) bool {
	cmd := exec.CommandContext(ctx, "git", "remote", "get-url", name)
	cmd.Dir = dir
	return cmd.Run() == nil
}

func run(ctx context.Context, dir, name string, args ...string) error {
	return runEnv(ctx, dir, os.Environ(), name, args...)
}

func runEnv(ctx context.Context, dir string, env []string, name string, args ...string) error {
	fmt.Printf("  > %s %s\n", name, strings.Join(args, " "))
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Dir = dir
	cmd.Env = env
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func runWSL(ctx context.Context, cfg Config, windowsDir, command string) error {
	wslDir := toWSLPath(windowsDir)
	full := "cd " + shellQuote(wslDir) + " && " + command
	return run(ctx, cfg.configDir, "wsl.exe", "-d", cfg.WSLDistribution, "--", "bash", "-lc", full)
}

func toWSLPath(path string) string {
	if runtime.GOOS != "windows" {
		return filepath.ToSlash(path)
	}
	clean := filepath.Clean(path)
	volume := filepath.VolumeName(clean)
	if len(volume) == 2 && volume[1] == ':' {
		rest := strings.TrimPrefix(clean, volume)
		return "/mnt/" + strings.ToLower(volume[:1]) + strings.ReplaceAll(rest, `\`, "/")
	}
	return filepath.ToSlash(clean)
}

func shellQuote(value string) string {
	return "'" + strings.ReplaceAll(value, "'", `'\''`) + "'"
}

func copyTree(src, dst string) error {
	return filepath.WalkDir(src, func(path string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		rel, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		target := filepath.Join(dst, rel)
		if d.IsDir() {
			return os.MkdirAll(target, 0o755)
		}
		in, err := os.Open(path)
		if err != nil {
			return err
		}
		if err := os.MkdirAll(filepath.Dir(target), 0o755); err != nil {
			in.Close()
			return err
		}
		out, err := os.Create(target)
		if err != nil {
			in.Close()
			return err
		}
		_, copyErr := io.Copy(out, bufio.NewReader(in))
		inCloseErr := in.Close()
		closeErr := out.Close()
		if copyErr != nil {
			return copyErr
		}
		if inCloseErr != nil {
			return inCloseErr
		}
		return closeErr
	})
}

func exists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
