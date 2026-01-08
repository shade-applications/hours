import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTimerStore } from '../lib/store';
import { dbActions } from '../lib/db-actions';

export function ActiveTimer() {
    const { isRunning, activeTaskName, startTime, stopTimer } = useTimerStore();
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && startTime) {
            setElapsed(Date.now() - startTime);
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime);
            }, 1000);
        } else {
            setElapsed(0);
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const handleStop = async () => {
        // We need to know the log ID to stop it DB side. 
        // In a real app we'd store logId in store too, or fetch active log.
        // Let's fetch active log from DB.
        try {
            const log = await dbActions.getActiveLog();
            if (log) {
                await dbActions.stopTimeLog(log.id);
            }
        } catch (e) {
            console.error("Failed to stop log", e);
        }
        stopTimer();
    };

    const formatTime = (ms: number) => {
        const s = Math.floor(ms / 1000);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return { h, m, sec };
    };

    if (!isRunning) return null;

    const { h, m, sec } = formatTime(elapsed);

    return (
        <View className="bg-card w-full py-8 px-6 border-b border-border items-center justify-center">
            <Text className="text-muted text-xs uppercase tracking-widest font-bold mb-2">
                Current Focus
            </Text>
            <Text className="text-foreground text-2xl font-bold mb-4 text-center">
                {activeTaskName}
            </Text>

            <View className="flex-row items-baseline mb-8">
                <Text className="text-foreground text-6xl font-light font-mono tabular-nums">
                    {h.toString().padStart(2, '0')}
                </Text>
                <Text className="text-muted text-4xl mx-1">:</Text>
                <Text className="text-foreground text-6xl font-light font-mono tabular-nums">
                    {m.toString().padStart(2, '0')}
                </Text>
                <Text className="text-muted text-4xl mx-1">:</Text>
                <Text className="text-foreground text-6xl font-light font-mono tabular-nums">
                    {sec.toString().padStart(2, '0')}
                </Text>
            </View>

            <TouchableOpacity
                onPress={handleStop}
                className="bg-destructive px-8 py-4 rounded-full active:opacity-80"
            >
                <Text className="text-white font-bold text-base">Stop Session</Text>
            </TouchableOpacity>
        </View>
    );
}
