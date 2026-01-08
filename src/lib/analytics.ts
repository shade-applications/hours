import { getDb } from './db';
import { startOfDay, endOfDay } from 'date-fns';

export const analytics = {
    getDailyStats: async () => {
        const db = await getDb();
        const today = new Date();
        const start = startOfDay(today).toISOString();
        const end = endOfDay(today).toISOString();

        // Sum duration of all logs that started today
        // For logs still running (end_time null), we calculate up to Now? 
        // Or we strictly say "tracked time" implies completed blocks?
        // Let's count running time too for "Today's effort"

        // We get all logs intersecting today? simpler: started today.
        const logs = await db.getAllAsync<{ start_time: string, end_time: string | null }>(
            'SELECT start_time, end_time FROM time_logs WHERE start_time BETWEEN ? AND ?',
            [start, end]
        );

        let totalMs = 0;
        const now = Date.now();

        logs.forEach(log => {
            const s = new Date(log.start_time).getTime();
            const e = log.end_time ? new Date(log.end_time).getTime() : now;
            totalMs += (e - s);
        });

        return {
            totalMs,
            count: logs.length
        };
    }
}
