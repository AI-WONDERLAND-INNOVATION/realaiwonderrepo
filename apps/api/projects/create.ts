import type { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';
import { Project } from '../../../types/project';

const db = new Database('data/projects.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, name, content } = req.body as Project;

    if (!userId || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(`
      INSERT INTO projects (userId, name, content, createdAt, updatedAt)
      VALUES (?, ?, ?, datetime('now'), datetime('now'))
    `);
    const info = stmt.run(userId, name, JSON.stringify(content || {}));

    return res.status(201).json({ id: info.lastInsertRowid, userId, name, content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create project' });
  }
}
