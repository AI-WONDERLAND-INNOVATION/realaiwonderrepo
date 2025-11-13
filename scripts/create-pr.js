const { Octokit } = require('@octokit/rest');

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN not found in environment. Aborting.');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });
  const owner = 'AI-WONDER-LABs';
  const repo = 'AI-WONDERLAND';
  const head = 'feature/octokit-automerge';
  const base = 'main';
  const title = 'Add Octokit CLI and guarded automerge action';
  const body = `Adds a small Octokit CLI, a guarded automerge script, and unit tests. The automerge action only merges when the PR is labeled 'automerge', has at least one approval (not by the author), and all check runs pass. Includes dry-run and confirmation flags for the CLI. See scripts/OCTOKIT-README.md for usage.`;

  try {
    const res = await octokit.rest.pulls.create({ owner, repo, title, head, base, body });
    console.log('PR created:', res.data.html_url);
  } catch (err) {
    console.error('Failed to create PR:', err.status, err.message || err);
    if (err && err.request && err.request.headers) console.error('Request headers include auth? ', !!err.request.headers.authorization);
    process.exitCode = 1;
  }
}

main();
