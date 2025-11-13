#!/usr/bin/env node
// Commander-based CLI for octokit utilities
const { Command } = require('commander');
const { listPRs, listIssues, mergePR, addLabel } = require('./octokit');

const program = new Command();
program.name('octokit-cli').description('Small CLI for GitHub repo inspection and actions');

const defaultOwner = process.env.OCTOKIT_OWNER || 'AI-WONDER-LABs';
const defaultRepo = process.env.OCTOKIT_REPO || 'AI-WONDERLAND';
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;

program
  .command('pr:list')
  .description('List pull requests')
  .option('--state <state>', 'PR state: open|closed|all', 'open')
  .option('--limit <n>', 'Number of PRs to list', '10')
  .option('--owner <owner>', 'Repository owner', defaultOwner)
  .option('--repo <repo>', 'Repository name', defaultRepo)
  .action(async (opts) => {
    const per_page = parseInt(opts.limit, 10) || 10;
    const prs = await listPRs({ owner: opts.owner, repo: opts.repo, state: opts.state, per_page, token });
    console.log(`Found ${prs.length} PR(s) (${opts.state}):`);
    prs.forEach(p => console.log(`#${p.number} - ${p.title} (${p.user && p.user.login})`));
  });

program
  .command('issues:list')
  .description('List issues for a repository')
  .option('--state <state>', 'Issue state: open|closed|all', 'open')
  .option('--limit <n>', 'Number of issues to list', '10')
  .option('--owner <owner>', 'Repository owner', defaultOwner)
  .option('--repo <repo>', 'Repository name', defaultRepo)
  .action(async (opts) => {
    const per_page = parseInt(opts.limit, 10) || 10;
    const issues = await listIssues({ owner: opts.owner, repo: opts.repo, state: opts.state, per_page, token });
    console.log(`Found ${issues.length} issue(s) (${opts.state}):`);
    issues.forEach(i => console.log(`#${i.number} - ${i.title} (${i.user && i.user.login})`));
  });

program
  .command('pr:merge')
  .description('Merge a pull request')
  .requiredOption('--number <n>', 'PR number')
  .option('--method <m>', 'merge method: merge|squash|rebase', 'merge')
  .option('--dry-run', 'Do not actually perform the merge; show what would be done')
  .option('--yes', 'Skip confirmation prompt')
  .option('--owner <owner>', 'Repository owner', defaultOwner)
  .option('--repo <repo>', 'Repository name', defaultRepo)
  .action(async (opts) => {
    const number = parseInt(opts.number, 10);
    if (opts.dryRun) {
      console.log(`[DRY RUN] Would merge PR #${number} in ${opts.owner}/${opts.repo} using method=${opts.method}`);
      return;
    }

    if (!opts.yes) {
      // ask for confirmation
      const readline = require('readline');
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const answer = await new Promise((resolve) => rl.question(`Merge PR #${number} in ${opts.owner}/${opts.repo}? (y/N) `, (ans) => { rl.close(); resolve(ans); }));
      if (!/^y(es)?$/i.test(answer)) {
        console.log('Aborted by user.');
        return;
      }
    }
    const res = await mergePR({ owner: opts.owner, repo: opts.repo, pull_number: number, merge_method: opts.method, token });
    console.log('Merge result:', res);
  });

program
  .command('issue:label')
  .description('Add labels to an issue/PR')
  .requiredOption('--number <n>', 'Issue/PR number')
  .requiredOption('--labels <labels>', 'Comma-separated labels')
  .option('--owner <owner>', 'Repository owner', defaultOwner)
  .option('--repo <repo>', 'Repository name', defaultRepo)
  .action(async (opts) => {
    const number = parseInt(opts.number, 10);
    const labels = opts.labels.split(',').map(s => s.trim()).filter(Boolean);
    const res = await addLabel({ owner: opts.owner, repo: opts.repo, issue_number: number, labels, token });
    console.log('Added labels:', res);
  });

program.parseAsync(process.argv).catch(err => {
  console.error('Error:', err && err.message ? err.message : err);
  if (!token) console.error('\nTip: set GITHUB_TOKEN in the environment to authenticate.');
  process.exitCode = 1;
});
