const { Octokit } = require('@octokit/rest');

function getOctokit(token) {
  return new Octokit({ auth: token || undefined });
}

async function listPRs({ owner, repo, state = 'open', per_page = 10, token }) {
  const octokit = getOctokit(token);
  const res = await octokit.rest.pulls.list({ owner, repo, state, per_page });
  return res.data;
}

async function listIssues({ owner, repo, state = 'open', per_page = 10, token }) {
  const octokit = getOctokit(token);
  const res = await octokit.rest.issues.listForRepo({ owner, repo, state, per_page });
  return res.data;
}

async function mergePR({ owner, repo, pull_number, merge_method = 'merge', token }) {
  const octokit = getOctokit(token);
  const res = await octokit.rest.pulls.merge({ owner, repo, pull_number, merge_method });
  return res.data;
}

async function addLabel({ owner, repo, issue_number, labels = [], token }) {
  const octokit = getOctokit(token);
  const res = await octokit.rest.issues.addLabels({ owner, repo, issue_number, labels });
  return res.data;
}

module.exports = {
  listPRs,
  listIssues,
  mergePR,
  addLabel,
};
