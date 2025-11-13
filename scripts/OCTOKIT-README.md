Octokit CLI utility

This repository includes a small, modular Octokit utility and CLI to inspect and act on GitHub resources.

Files added
- `scripts/octokit/index.js` - core reusable functions (list PRs, list issues, merge PRs, add labels).
- `scripts/octokit-cli.js` - a tiny CLI wrapper for quick tasks.
- `scripts/octokit-test.js` - a simple script used earlier to test listing PRs.

Quick usage

1) Provide a token in the environment (recommended):

```bash
export GITHUB_TOKEN=ghp_XXXXXXXXXXXX
```

2) List open PRs (default owner/repo are `AI-WONDER-LABs/AI-WONDERLAND`):

```bash
npm run octokit:pr-list -- --state=open --limit=10
# or directly
node scripts/octokit-cli.js pr:list --state=open --limit=10
```

3) List issues:

```bash
node scripts/octokit-cli.js issues:list --state=closed --limit=5
```

4) Merge a PR (be careful — this performs an action):

```bash
node scripts/octokit-cli.js pr:merge --number=123 --method=squash
```

5) Add labels to an issue/PR:

```bash
node scripts/octokit-cli.js issue:label --number=123 --labels=automerge,verified
```

Security and best practices
- Never hardcode tokens. Use `GITHUB_TOKEN` (Codespaces/CIs) or a short-lived personal access token in secure storage.
- Prefer running CLI commands interactively with a token scoped minimally for the actions you need.
- For automated workflows, use repository secrets and GitHub Actions OIDC/GitHub App tokens where possible.

Modularization notes
- `scripts/octokit/index.js` is intentionally tiny and can be required from server-only code (for example `backend-node/`) and re-used in scripts or small services.

Extending the tool
- Add more wrapper functions to `scripts/octokit/index.js` as needed (reviews, comments, checks, PR status updates).
- Replace `parseArgs` in `octokit-cli.js` with `commander` or `yargs` if you want a richer CLI experience (this adds a dependency).

If you want, I can:
- Install and wire the CLI into `backend-node` instead.
- Add unit tests for the module functions (mocking Octokit).
- Create a GitHub Action that uses this module to perform controlled automerge actions behind safeguards.
