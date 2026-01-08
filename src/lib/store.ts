import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TimerState {
    activeTaskId: number | null;
    activeTaskName: string | null;
    startTime: number | null; // Timestamp
    isRunning: boolean;

    startTimer: (taskId: number, taskName: string) => void;
    stopTimer: () => void;
    resumeTimer: () => void;
}

export const useTimerStore = create<TimerState>()(
    persist(
        (set) => ({
            activeTaskId: null,
            activeTaskName: null,
            startTime: null,
            isRunning: false,

            startTimer: (taskId, taskName) => set({
                activeTaskId: taskId,
                activeTaskName: taskName,
                startTime: Date.now(),
                isRunning: true
            }),

            stopTimer: () => set({
                isRunning: false,
                activeTaskId: null,
                activeTaskName: null,
                startTime: null
            }),

            resumeTimer: () => set({ isRunning: true })
        }),
        {
            name: 'hours-timer-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
