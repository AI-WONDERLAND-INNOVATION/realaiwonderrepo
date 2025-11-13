Secret handling and incident response

Short policy and actions for handling secrets found in this repository.

- Do NOT store secrets (API keys, service account JSON, private keys) in the repository. Use environment variables or a secret manager instead.
- If a secret is found in a commit that has been pushed to any remote branch, rotate that secret immediately using the provider console/APIs and then consider purging the secret from history (git-filter-repo or the BFG). Rotation is mandatory.
- If a secret is found only in unpushed local files, remove it from the repo and add an entry to `.gitignore`.
- For emergency rotation steps, contact the cloud provider (GCP/AWS/Stripe) and follow their recommended rotation steps.

Suggested tools and next steps:
- We added a GitHub Action `secret-scan.yml` (gitleaks) to scan PRs and pushes.
- Add local pre-commit scanning with `detect-secrets` or `gitleaks` as a next step to block accidental commits.
- If you want, we can run a history purge and provide the exact commands; confirm before we run a destructive rewrite.

Developer note — pre-commit hook
- This repository includes an optional local pre-commit secret scanner (Husky) to block accidental commits of secrets. If you'd like to enable it locally, run:

```bash
npm install
npx husky install
```

- To temporarily skip the hook for a single commit, use:

```bash
git commit --no-verify -m "..."
```

- To remove the local hook from your machine, remove the `.husky/pre-commit` file and uninstall Husky: `npm uninstall husky`.
