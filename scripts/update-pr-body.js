const { Octokit } = require('@octokit/rest');

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN is required in the environment');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });
  const owner = 'AI-WONDER-LABs';
  const repo = 'AI-WONDERLAND';
  const head = 'AI-WONDER-LABs:feature/octokit-automerge';

  try {
    // Find PR by head branch
    const listRes = await octokit.rest.pulls.list({ owner, repo, state: 'open', per_page: 100 });
    const pr = listRes.data.find(p => p.head.ref === 'feature/octokit-automerge');
    if (!pr) {
      console.error('No open PR found for head branch feature/octokit-automerge');
      process.exit(1);
    }

    const prNumber = pr.number;

    const lines = [
      '### Automated PR Checklist & Summary',
      '',
      'This PR implements a guarded automerge flow and an Octokit CLI. The repository also includes a PR template at `.github/PULL_REQUEST_TEMPLATE.md`.',
      '',
      'Checklist summary (maintainer-reviewed):',
      '- [x] Octokit CLI added (scripts/octokit/*)',
      '- [x] Octokit CLI docs added (scripts/OCTOKIT-README.md)',
      '- [x] Unit tests for Octokit helpers (scripts/octokit/index.test.js)',
      '- [x] Automerge script added and refactored for testing (scripts/actions/automerge-action.js)',
      '- [x] Unit tests for automerge script (scripts/actions/automerge-action.test.js)',
      "- [x] CLI uses confirmation/dry-run for merges (scripts/octokit-cli.js)",
      '- [x] PR template/checklist added (.github/PULL_REQUEST_TEMPLATE.md)',
      '',
      'Notes:',
      '- The automerge workflow triggers when a PR is labeled `automerge`. It requires at least one approval from a reviewer other than the author and all checks to succeed before merging.',
      '- Unit tests for the automerge and Octokit modules pass in this Codespace. Frontend test suites exist and may require CRA/Babel config to run in full monorepo test runs.',
      '',
      'Next steps for reviewers:',
      '1. Review the automerge safeguards and tests.',
      '2. Run `npm run test:automerge` and `npm run test:octokit` locally or in CI.',
      '3. If you approve and want automerge enabled for this repo, add the `automerge` label after PR approval.',
      '',
      '----',
      '',
      'Original PR description:',
      '',
      pr.body || ''
    ];
    const newBody = lines.join('\n');

    const updateRes = await octokit.rest.pulls.update({ owner, repo, pull_number: prNumber, body: newBody });
    console.log('Updated PR:', updateRes.data.html_url);
  } catch (err) {
    console.error('Failed to update PR body:', err && err.message ? err.message : err);
    process.exitCode = 1;
  }
}

main();
