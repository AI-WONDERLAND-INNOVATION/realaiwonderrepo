const { listPRs, listIssues } = require('./index');

// Mock Octokit
jest.mock('@octokit/rest', () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        pulls: {
          list: jest.fn().mockResolvedValue({ data: [{ number: 123, title: 'Test PR', user: { login: 'alice' } }] })
        },
        issues: {
          listForRepo: jest.fn().mockResolvedValue({ data: [{ number: 7, title: 'Issue 1', user: { login: 'bob' } }] })
        }
      }
    }))
  };
});

describe('octokit module', () => {
  test('listPRs returns array of PRs', async () => {
    const prs = await listPRs({ owner: 'org', repo: 'repo', token: 'token' });
    expect(Array.isArray(prs)).toBe(true);
    expect(prs.length).toBe(1);
    expect(prs[0].number).toBe(123);
  });

  test('listIssues returns array of issues', async () => {
    const issues = await listIssues({ owner: 'org', repo: 'repo', token: 'token' });
    expect(Array.isArray(issues)).toBe(true);
    expect(issues[0].number).toBe(7);
  });
});
