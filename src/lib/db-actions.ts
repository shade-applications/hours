import { getDb } from './db';
import { type Task } from './types'; // We need to define types

export const dbActions = {
    addTask: async (name: string, intentHours: number) => {
        const db = await getDb();
        const result = await db.runAsync(
            'INSERT INTO tasks (name, intent_hours, created_at) VALUES (?, ?, ?)',
            [name, intentHours, new Date().toISOString()]
        );
        return result.lastInsertRowId;
    },

    getTasks: async () => {
        const db = await getDb();
        // Get all non-archived tasks ordered by recency
        const tasks = await db.getAllAsync(
            'SELECT * FROM tasks WHERE is_archived = 0 ORDER BY id DESC'
        );
        return tasks as any[];
    },

    startTimeLog: async (taskId: number) => {
        const db = await getDb();
        const result = await db.runAsync(
            'INSERT INTO time_logs (task_id, start_time) VALUES (?, ?)',
            [taskId, new Date().toISOString()]
        );
        return result.lastInsertRowId;
    },

    stopTimeLog: async (logId: number) => {
        const db = await getDb();
        await db.runAsync(
            'UPDATE time_logs SET end_time = ? WHERE id = ?',
            [new Date().toISOString(), logId]
        );
    },

    getActiveLog: async () => {
        const db = await getDb();
        const log = await db.getFirstAsync(
            'SELECT * FROM time_logs WHERE end_time IS NULL ORDER BY id DESC LIMIT 1'
        );
        return log as any;
    }
};
