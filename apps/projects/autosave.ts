import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('data/projects.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { projectId, content } = req.body;
    if (!projectId || !content) return res.status(400).json({ error: 'Missing projectId or content' });

    const stmt = db.prepare(`
      UPDATE projects
      SET content = ?, updatedAt = datetime('now')
      WHERE id = ?
    `);
    const info = stmt.run(JSON.stringify(content), projectId);

    return res.status(200).json({ updated: info.changes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to autosave project' });
  }
}
