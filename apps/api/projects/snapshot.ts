import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('data/projects.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ error: 'Missing projectId' });

    // Fetch project content
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Insert into snapshots
    const stmt = db.prepare(`
      INSERT INTO snapshots (projectId, content, createdAt)
      VALUES (?, ?, datetime('now'))
    `);
    const info = stmt.run(projectId, project.content);

    return res.status(201).json({ snapshotId: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create snapshot' });
  }
}
