import { db } from "@/lib/db"
import { useTimerStore } from "@/lib/store"

export const timerActions = {
    start: async (taskId: number | null) => {
        // Stop any currently running timer logic is handled by "stop active first" check or we do it here.
        // Ideally we assume the caller checks or we force stop.
        // Let's force stop previous if any.
        // Actually store actions should be clean.

        // We can't easily access the store getState inside a pure function without importing the generic store 
        // but useTimerStore.getState() works in Zustand!

        const { isRunning, stopTimer, startTimer } = useTimerStore.getState()

        if (isRunning) {
            await timerActions.stop()
        }

        // Create new Log
        await db.logs.add({
            taskId: taskId || null,
            startTime: new Date(),
            endTime: null,
            isParallel: false,
            accuracyWeight: 1.0
        })

        startTimer(taskId)
    },

    stop: async () => {
        const { stopTimer } = useTimerStore.getState()

        // Find open log
        // We assume there's only one really.
        const openLogs = await db.logs.filter(l => l.endTime === null).toArray()

        // Close all (safety)
        const now = new Date()
        for (const log of openLogs) {
            await db.logs.update(log.id, { endTime: now })
        }

        stopTimer()
    }
}
