const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'sponsors.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sponsors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    amount INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = {
  addSponsor: ({ name, email, amount }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO sponsors (name, email, amount) VALUES (?, ?, ?)',
        [name, email, amount],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  },
  getSponsors: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM sponsors ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
};
