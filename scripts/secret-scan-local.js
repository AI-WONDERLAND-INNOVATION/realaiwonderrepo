#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Patterns to check (basic, non-exhaustive)
const patterns = [
  { name: 'AWS Access Key ID', re: /AKIA[0-9A-Z]{16}/g },
  { name: 'AWS Secret Access Key', re: /(?<!A-Z0-9)aws_secret_access_key\s*=\s*['\"]?[A-Za-z0-9\/+]{20,40}/gi },
  { name: 'Stripe live key', re: /sk_live_[A-Za-z0-9_\-]{8,}/g },
  { name: 'Slack token', re: /xox[baprs]-[A-Za-z0-9-]+/g },
  { name: 'Google API key', re: /AIza[0-9A-Za-z\-_]{35}/g },
  { name: 'Private key block', re: /-----BEGIN (?:RSA )?PRIVATE KEY-----[\s\S]{10,}-----END (?:RSA )?PRIVATE KEY-----/g },
  { name: 'GitHub token', re: /ghp_[A-Za-z0-9_\-]{36}/g }
];

function getStagedFiles() {
  const out = execSync('git diff --cached --name-only --diff-filter=ACM').toString().trim();
  if (!out) return [];
  return out.split('\n').map(s => s.trim()).filter(Boolean);
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [];
    for (const p of patterns) {
      if (p.re.test(content)) {
        matches.push(p.name);
        // reset lastIndex for global regex
        p.re.lastIndex = 0;
      }
    }
    return matches;
  } catch (err) {
    return [];
  }
}

function run() {
  const staged = getStagedFiles();
  if (!staged.length) {
    process.exit(0);
  }

  const hits = [];
  for (const f of staged) {
    // only check text files under repo
    if (!fs.existsSync(f)) continue;
    const matches = scanFile(f);
    if (matches.length) hits.push({ file: f, matches });
  }

  if (hits.length) {
    console.error('\nERROR: Potential secrets found in staged files:');
    for (const h of hits) {
      console.error(` - ${h.file}: ${h.matches.join(', ')}`);
    }
    console.error('\nIf these are false positives, fix the file or remove it from the commit.');
    process.exit(1);
  }

  process.exit(0);
}

run();
