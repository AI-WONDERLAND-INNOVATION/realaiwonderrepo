import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('data/projects.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { projectId, snapshotId } = req.body;
    if (!projectId || !snapshotId) return res.status(400).json({ error: 'Missing fields' });

    // Fetch snapshot
    const snapshot = db.prepare('SELECT * FROM snapshots WHERE id = ? AND projectId = ?')
                       .get(snapshotId, projectId);
    if (!snapshot) return res.status(404).json({ error: 'Snapshot not found' });

    // Restore project content
    const stmt = db.prepare('UPDATE projects SET content = ?, updatedAt = datetime('now') WHERE id = ?');
    stmt.run(snapshot.content, projectId);

    return res.status(200).json({ restored: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to restore project' });
  }
}
