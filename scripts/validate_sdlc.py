#!/usr/bin/env python3
"""Validador estrutural offline e sem dependências externas do AI-driven SDLC."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ("buddy", "discover", "plan", "build", "review", "initiative-review", "status", "report")
AGENTS = ("engineering-manager", "discovery", "engineer", "reviewer")
REQUIRED = (
    "AGENTS.md", "CLAUDE.md", "harness/START.md",
    "harness/policies/autonomy.md", "harness/policies/communication.md",
    "harness/policies/engineering-standards.md", "harness/policies/model-routing.md",
    "harness/policies/budgets.md", "harness/policies/verification.md",
    "harness/workflows/discovery.md", "harness/workflows/initiative-review.md",
    "templates/workflow/spec.md", "templates/workflow/plan.md",
    "templates/workflow/result.md", "templates/operations/issue.md",
    ".claude-plugin/plugin.json", ".claude-plugin/marketplace.json",
)
def frontmatter(path):
    data = path.read_text(encoding="utf-8")
    if not data.startswith("---\n") or "\n---\n" not in data[4:]:
        return {}, ["invalid frontmatter: " + str(path)]
    block = data.split("\n---\n", 1)[0][4:]
    pairs = {}
    for line in block.splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            pairs[key.strip()] = value.strip()
    return pairs, []

def validate(root=ROOT):
    errors = []
    for name in REQUIRED:
        if not (root / name).is_file():
            errors.append("missing: " + name)
    manifest = root / ".claude-plugin/plugin.json"
    market = root / ".claude-plugin/marketplace.json"
    if manifest.is_file() and market.is_file():
        try:
            m, catalog = json.loads(manifest.read_text(encoding="utf-8")), json.loads(market.read_text(encoding="utf-8"))
            if m.get("name") != "ai-driven-sdlc":
                errors.append("plugin name mismatch")
            if not any(p.get("name") == m.get("name") and p.get("source") == "./" for p in catalog.get("plugins", [])):
                errors.append("marketplace entry mismatches root plugin")
        except (ValueError, TypeError) as exc:
            errors.append("invalid manifest/marketplace JSON: " + str(exc))
    for name in SKILLS:
        path = root / "skills" / name / "SKILL.md"
        if not path.is_file():
            errors.append("missing skill: " + name)
            continue
        fm, issues = frontmatter(path); errors += issues
        if fm.get("name") != name or not fm.get("description"):
            errors.append("skill metadata incorrect: " + name)
        if name == "discover" and fm.get("context") == "fork":
            errors.append("interactive Discovery must not fork")
    for name in AGENTS:
        path = root / "agents" / (name + ".md")
        if not path.is_file():
            errors.append("missing agent: " + name)
            continue
        fm, issues = frontmatter(path); errors += issues
        if not fm.get("description") or not fm.get("name"):
            errors.append("agent metadata incorrect: " + name)
    for path, tokens in {
        "harness/policies/autonomy.md": ("recomend", "autoriz"),
        "harness/policies/communication.md": ("TL;DR", "BLOQUEADO"),
        "harness/workflows/initiative-review.md": ("somente leitura",),
        "templates/workflow/result.md": ("Evidências", "classes"),
    }.items():
        target = root / path
        if target.is_file():
            content = target.read_text(encoding="utf-8").lower()
            for token in tokens:
                if token.lower() not in content:
                    errors.append("missing contract token " + token + " in " + path)
    return errors

if __name__ == "__main__":
    issues = validate()
    if issues:
        for issue in issues: print("ERROR:", issue)
        sys.exit(1)
    print("OK: plugin, skills, agents and core contracts structurally valid")
