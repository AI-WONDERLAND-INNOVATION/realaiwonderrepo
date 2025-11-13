const { Octokit } = require('@octokit/rest');

async function runAutomerge(env = process.env) {
  const token = env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN required');

  const owner = env.GITHUB_REPOSITORY ? env.GITHUB_REPOSITORY.split('/')[0] : (env.OCTOKIT_OWNER || 'AI-WONDER-LABs');
  const repo = env.GITHUB_REPOSITORY ? env.GITHUB_REPOSITORY.split('/')[1] : (env.OCTOKIT_REPO || 'AI-WONDERLAND');
  const prNumber = parseInt(env.PR_NUMBER || env.INPUT_PR_NUMBER || '0', 10);

  if (!prNumber) throw new Error('PR number must be provided via PR_NUMBER env var');

  const octokit = new Octokit({ auth: token });

  // Fetch PR
  const { data: pr } = await octokit.rest.pulls.get({ owner, repo, pull_number: prNumber });

  // Check label exists
  const labels = (pr.labels || []).map(l => (typeof l === 'string' ? l : l.name));
  if (!labels.includes('automerge')) {
    return { merged: false, reason: 'missing-label' };
  }

  // Check reviews: require at least one approval (excluding PR author)
  const reviewsRes = await octokit.rest.pulls.listReviews({ owner, repo, pull_number: prNumber });
  const approvals = new Set();
  for (const r of reviewsRes.data) {
    if (r.state === 'APPROVED' && r.user && r.user.login !== pr.user.login) approvals.add(r.user.login);
  }
  if (approvals.size < 1) {
    throw new Error('Not enough approvals to automerge (need >=1 approval from someone other than the author)');
  }

  // Check combined checks status — require success
  const ref = pr.head.sha;
  const checkRuns = await octokit.rest.checks.listForRef({ owner, repo, ref });
  const failing = (checkRuns.data && checkRuns.data.check_runs || []).find(c => c.conclusion !== 'success' && c.conclusion !== null);
  if (failing) throw new Error(`Check '${failing.name}' did not succeed; aborting automerge`);

  // Merge
  const mergeRes = await octokit.rest.pulls.merge({ owner, repo, pull_number: prNumber, merge_method: 'squash' });
  return { merged: true, result: mergeRes.data };
}

if (require.main === module) {
  runAutomerge().then((r) => {
    if (r && r.merged) console.log('Merged:', r.result);
    else if (r && !r.merged) console.log('Automerge skipped:', r.reason);
  }).catch(err => {
    console.error('Automerge failed:', err && err.message ? err.message : err);
    process.exitCode = 1;
  });
}

module.exports = { runAutomerge };
