import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
    activeTaskId: number | null;
    startTime: number | null; // Timestamp
    isRunning: boolean;

    startTimer: (taskId: number | null) => void;
    stopTimer: () => void;
    resetTimer: () => void;
}

export const useTimerStore = create<TimerState>()(
    persist(
        (set) => ({
            activeTaskId: null,
            startTime: null,
            isRunning: false,

            startTimer: (taskId) => set({
                activeTaskId: taskId,
                startTime: Date.now(),
                isRunning: true
            }),

            stopTimer: () => set({
                isRunning: false,
                // We keep activeTaskId/startTime until explicitly reset or stored?
                // Usually stop implies we are done with this session.
                // But the detailed logic will be handled by the component interacting with DB.
                // This store primarily tracks "what is currently happening" for UI.
                activeTaskId: null,
                startTime: null
            }),

            resetTimer: () => set({
                activeTaskId: null,
                startTime: null,
                isRunning: false
            }),
        }),
        {
            name: 'hours-timer-storage', // name of the item in the storage (must be unique)
        }
    )
);
