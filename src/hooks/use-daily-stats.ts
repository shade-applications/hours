import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"
import { startOfDay, endOfDay } from "date-fns"

export function useDailyStats() {
    return useLiveQuery(async () => {
        const today = new Date()
        const start = startOfDay(today)
        const end = endOfDay(today)

        const logs = await db.logs
            .where("startTime")
            .between(start, end, true, true)
            .toArray()

        let totalTrackedMs = 0
        let lastEndTime: number | null = null
        let unclassifiedMs = 0

        // Sort logs by start time
        logs.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

        if (logs.length > 0) {
            // Calculate tracked time
            logs.forEach(log => {
                const logEnd = log.endTime ? log.endTime.getTime() : Date.now()
                const duration = logEnd - log.startTime.getTime()
                totalTrackedMs += duration

                // Gap calculation
                if (lastEndTime !== null) {
                    const gap = log.startTime.getTime() - lastEndTime
                    if (gap > 60 * 1000) { // Should be more than 1 minute to count?
                        unclassifiedMs += gap
                    }
                } else {
                    // First log: Is there unclassified time BEFORE the first log?
                    // Maybe we count from "First Log Start" as the day start for user flexibility.
                    // The "Day" technically starts at 00:00 but we don't count sleep as unclassified usually.
                    // So unclassified is mostly GAPS between tasks.
                }
                lastEndTime = logEnd
            })

            // Unclassified after last task?
            // If last task finished hours ago, that's unclassified.
            if (lastEndTime) {
                const now = Date.now()
                const gap = now - lastEndTime
                if (gap > 60 * 1000) {
                    unclassifiedMs += gap
                }
            }
        }

        return {
            totalTrackedMs,
            unclassifiedMs,
            logsCount: logs.length
        }
    }, [])
}
