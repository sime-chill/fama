# Siteflow

`siteflow` is the release tool for Yuhan He's academic homepage and the
FAMA project site. It keeps the two repositories independent while
assembling and checking the exact public result locally.

Canonical location after the WSL migration:

- WSL: `/home/wsl_hyh/web/fama/tools/siteflow`
- Windows access: `\\wsl.localhost\Ubuntu-20.04\home\wsl_hyh\web\fama\tools\siteflow`

The tool deliberately does not generate biography or publication text. It
only builds content already present in the repositories and rejects common
template placeholders before release.

## Commands

```bash
cp siteflow.example.json siteflow.json
go test ./...
go run . doctor
go run . all
go run . serve
go run . publish            # dry run
go run . publish --apply    # real commits and pushes; requires user approval
```

- `doctor` checks the repositories, domain, source content, and required tools.
- `all` builds both sites, assembles a combined preview, and validates links.
- `serve` serves the validated preview at `http://127.0.0.1:4173`.
- `publish` is a dry run. `publish --apply` commits and publishes only after a
  fresh successful build and verification. It creates/enables the project
  repository, waits until FAMA is publicly reachable, and only then
  publishes the homepage button. Repository creation requires an authenticated
  GitHub CLI session.

Both repositories now live in the same native WSL workspace:

- `/home/wsl_hyh/web/fama`
- `/home/wsl_hyh/web/sime-chill.github.io`

On Linux/WSL, siteflow runs Bash directly. On Windows it retains the `wsl.exe`
adapter for compatibility, but the WSL directories are the only source of truth.

Copy `siteflow.example.json` to the git-ignored `siteflow.json` and adjust the
local paths. Relative paths are resolved from the configuration file. The
published site never contains this machine-specific configuration. Set
`github_cli` to `gh` or to an absolute path for a portable GitHub CLI.
If WSL can build but cannot reach GitHub, set `personal_git_repo` to the
repository's `//wsl.localhost/...` path and `personal_remote` to its HTTPS URL;
siteflow will push the shared refs through Git for Windows while leaving the
WSL SSH remote unchanged.
