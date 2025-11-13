Auto-merge workflow

Usage

- To enable automatic merging for a pull request, add the label `automerge` to the PR.

What this workflow enforces

- Required label: `automerge` (configurable in the workflow file as `REQUIRED_LABEL`).
- Allowed authors: only PRs authored by users in the `ALLOWED_AUTHORS` comma-separated list will be considered (default: `dependabot[bot],dependabot,renovate[bot]`). Update this list in the workflow if you want different authors allowed.
- Allowed base branches: the PR base branch must be listed in `ALLOWED_BASE_BRANCHES` (default: `main`).
- Approval: at least one APPROVED review that applies to the latest commit is required before the workflow will attempt to merge.
- Status checks: the combined status for the latest commit must be `success` (this ensures required checks are passing).
- Merge method: controlled by `MERGE_METHOD` (default: `squash`).

Prerequisites and notes

- Repository must allow the `GITHUB_TOKEN` to perform merges. For repositories with strict branch protection, ensure Actions have write permissions or allow GitHub Actions to bypass branch protections as appropriate.
- The workflow runs as `pull_request_target` so it can access repository secrets and perform merge operations. That is intentional — review security policies if you accept workflows from untrusted forks.

How to customize

- To allow other authors, edit `ALLOWED_AUTHORS` in `.github/workflows/automerge.yml` (comma-separated usernames).
- To permit merging into other branches, edit `ALLOWED_BASE_BRANCHES` (comma-separated branch names or patterns you maintain manually).
- To change the merge method, edit `MERGE_METHOD` (`squash`, `merge`, or `rebase`).

Troubleshooting

- If merges do not happen: check the Actions run logs for messages emitted by the script. The workflow will log why it skipped a PR (missing label, disallowed author/branch, no approval on latest commit, or failing status checks).
- If branch protection requires re-approval after new commits, the workflow enforces approval on the latest commit (so a stale approval will not pass).

Alternatives

- For more complex policies (queues, per-team rules, more granular filters), consider Mergify or GitHub's built-in auto-merge repository settings.

