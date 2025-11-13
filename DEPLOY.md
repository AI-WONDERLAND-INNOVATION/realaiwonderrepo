Deployment checklist — Vercel
=============================

This document explains how to deploy this repository to Vercel and includes verification steps I ran to ensure the frontend builds locally.

1) What Vercel should build
- We use a single static build from the `frontend-builder` app. The repository includes `vercel.json` configured to run `@vercel/static-build` using `frontend-builder/package.json` and `distDir: build`.

2) Vercel project settings (recommended)
- Link the GitHub repository and set the Production Branch to `main` (or whichever branch you want to deploy).
- In the Build & Output Settings, the default configuration from `vercel.json` is sufficient. Vercel will:
  - run `npm install` inside `frontend-builder`
  - run `npm run build` (which executes `react-scripts build`) and produce the `build/` directory

3) Environment variables
- Do NOT store secrets in the repo. Add any runtime secrets to the Vercel project Settings > Environment Variables:
  - `FRONTEND_URL` — your production URL (optional)
  - `STRIPE_SECRET_KEY` — if your site needs Stripe for payments (use live keys in production)
  - Any API keys used by the frontend

4) Local verification I ran
- `cd frontend-builder && npm install && npm run build` — completed successfully and produced `frontend-builder/build` with production artifacts. The local build compiled with a small number of ESLint warnings (unused vars, spacing) but no build errors.

5) If Vercel reports an error about a missing export like `FiPalette` from `react-icons/fi`:
- Confirm the branch Vercel is building (Vercel may be building a different branch or a fork with the problem).
- If the reported file path (for example `app/builder/page.tsx`) is not in this repository, check the Vercel build log to see the commit SHA and branch and fetch that branch locally to inspect and patch the import.

6) Post-deploy checks
- Visit the deployed URL and run a smoke test of key pages (home, guides, sponsors) and interactive flows.
- Check Vercel build logs for any warnings that should be addressed.

7) If you want, I can:
- Patch the repo to fix lint warnings in `frontend-builder/src/pages/*` (non-functional cleanup).
- Run a deeper scan across all remote branches for accidental secrets.
- Help configure Vercel environment variables and a deploy preview workflow.
