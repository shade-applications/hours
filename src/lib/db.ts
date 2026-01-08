import * as SQLite from 'expo-sqlite';

export const dbName = 'hours.db';

export const initDb = async () => {
    const db = await SQLite.openDatabaseAsync(dbName);

    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      intent_hours REAL DEFAULT 0,
      created_at TEXT NOT NULL,
      is_archived INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS time_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER,
      start_time TEXT NOT NULL,
      end_time TEXT,
      is_parallel INTEGER DEFAULT 0,
       -- Foreign key technically, but simplified here
      FOREIGN KEY(task_id) REFERENCES tasks(id)
    );

    CREATE TABLE IF NOT EXISTS reflections (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       date TEXT NOT NULL UNIQUE,
       q_went_well TEXT,
       q_distractions TEXT,
       q_tomorrow TEXT,
       created_at TEXT NOT NULL
    );
  `);

    return db;
}

// Simple helper to get DB instance (non-hook for pure functions)
let _db: SQLite.SQLiteDatabase | null = null;
export const getDb = async () => {
    if (!_db) {
        _db = await SQLite.openDatabaseAsync(dbName);
    }
    return _db;
}
