// scripts/octokit-test.js
// Quick Octokit test: lists open PRs for the repo (uses GITHUB_TOKEN if present)
const { Octokit } = require('@octokit/rest');

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) console.log('Using GITHUB_TOKEN from environment.');
  else console.log('No GITHUB_TOKEN provided — running unauthenticated (may be rate-limited).');

  const octokit = new Octokit({ auth: token || undefined });
  const owner = 'AI-WONDER-LABs';
  const repo = 'AI-WONDERLAND';

  try {
    const res = await octokit.rest.pulls.list({ owner, repo, state: 'open', per_page: 10 });
    console.log(`Found ${res.data.length} open PR(s):`);
    for (const p of res.data) {
      console.log(`#${p.number}: ${p.title} (${p.user && p.user.login})`);
    }
  } catch (err) {
    console.error('Error while calling GitHub API:');
    // Print helpful message and the error
    if (err && err.status) console.error('Status:', err.status);
    console.error(err.message || err);
    if (!token) console.error('\nTip: set GITHUB_TOKEN in the Codespace environment to authenticate and avoid rate limits.');
    process.exitCode = 1;
  }
}

main();
