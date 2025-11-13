jest.mock('@octokit/rest', () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        pulls: {
          get: jest.fn().mockResolvedValue({ data: {
            number: 42,
            user: { login: 'author' },
            labels: [{ name: 'automerge' }],
            head: { sha: 'abcdef' }
          } }),
          listReviews: jest.fn().mockResolvedValue({ data: [{ state: 'APPROVED', user: { login: 'reviewer1' } }] }),
          merge: jest.fn().mockResolvedValue({ data: { merged: true } })
        },
        checks: {
          listForRef: jest.fn().mockResolvedValue({ data: { check_runs: [{ name: 'build', conclusion: 'success' }] } })
        }
      }
    }))
  };
});

const { runAutomerge } = require('./automerge-action');

describe('automerge-action', () => {
  test('merges when label present, approval exists, and checks succeed', async () => {
    const env = { GITHUB_TOKEN: 'token', GITHUB_REPOSITORY: 'AI-WONDER-LABs/AI-WONDERLAND', PR_NUMBER: '42' };
    const res = await runAutomerge(env);
    expect(res).toBeDefined();
    expect(res.merged).toBe(true);
    expect(res.result).toEqual({ merged: true });
  });

  test('skips when automerge label missing', async () => {
    // adjust mock to return no labels
    const { Octokit } = require('@octokit/rest');
    Octokit.mockImplementation(() => ({
      rest: {
        pulls: {
          get: jest.fn().mockResolvedValue({ data: { labels: [] } }),
          listReviews: jest.fn().mockResolvedValue({ data: [] }),
          merge: jest.fn()
        },
        checks: {
          listForRef: jest.fn().mockResolvedValue({ data: { check_runs: [] } })
        }
      }
    }));

    const env = { GITHUB_TOKEN: 'token', GITHUB_REPOSITORY: 'AI-WONDER-LABs/AI-WONDERLAND', PR_NUMBER: '43' };
    const res = await runAutomerge(env);
    expect(res).toBeDefined();
    expect(res.merged).toBe(false);
    expect(res.reason).toBe('missing-label');
  });
});
