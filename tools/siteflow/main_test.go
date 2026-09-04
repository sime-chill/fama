package main

import (
	"path/filepath"
	"testing"
)

func TestStripFrontMatter(t *testing.T) {
	input := "---\r\nlayout: home\r\n---\r\n# About\r\nBody\r\n"
	got := stripFrontMatter(input)
	want := "# About\nBody\n"
	if got != want {
		t.Fatalf("stripFrontMatter() = %q, want %q", got, want)
	}
}

func TestLocalTarget(t *testing.T) {
	root := filepath.Join("tmp", "preview")
	page := filepath.Join(root, "fama", "chips", "index.html")
	tests := []struct {
		name string
		raw  string
		want string
		ok   bool
	}{
		{"root relative", "/fama/memory/", filepath.Join(root, "fama", "memory"), true},
		{"page relative", "../sources/", filepath.Join(root, "fama", "sources"), true},
		{"fragment", "#section", "", false},
		{"external", "https://example.com", "", false},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got, ok := localTarget(root, page, tc.raw)
			if ok != tc.ok || got != tc.want {
				t.Fatalf("localTarget() = (%q, %v), want (%q, %v)", got, ok, tc.want, tc.ok)
			}
		})
	}
}
