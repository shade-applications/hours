import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Task } from '../lib/types';
import { Play, Square } from 'lucide-react-native';
import { useTimerStore } from '../lib/store';
import { dbActions } from '../lib/db-actions';

interface TaskListProps {
    tasks: Task[];
    onRefresh: () => void;
}

export function TaskList({ tasks, onRefresh }: TaskListProps) {
    const { activeTaskId, startTimer, stopTimer, isRunning } = useTimerStore();

    const handleStart = async (task: Task) => {
        // If something else is running, stop it first?
        // For MVP we just stop local timer state, but we should strictly stop DB log too.
        // The ActiveTimer component handles "Stop", but "Switching" needs logic.
        // Let's assume we stop the *active* one if any.
        if (isRunning && activeTaskId) {
            // We'd need to find the active log. 
            // For speed, let's just trigger global stop and then start.
            // real logic should be robust.
            // We can use dbActions.getActiveLog()
            const log = await dbActions.getActiveLog();
            if (log) await dbActions.stopTimeLog(log.id);
            stopTimer();
        }

        // Start new
        await dbActions.startTimeLog(task.id);
        startTimer(task.id, task.name);
    };

    const renderItem = ({ item }: { item: Task }) => {
        const isActive = activeTaskId === item.id && isRunning;

        return (
            <View className={`p-4 mb-3 rounded-xl border ${isActive ? 'bg-secondary border-primary' : 'bg-card border-border'} flex-row items-center justify-between`}>
                <View className="flex-1">
                    <Text className={`font-bold text-base ${isActive ? 'text-primary' : 'text-foreground'}`}>
                        {item.name}
                    </Text>
                    {item.intent_hours > 0 && (
                        <Text className="text-muted text-xs mt-1">Intent: {item.intent_hours}h</Text>
                    )}
                </View>

                <TouchableOpacity
                    onPress={() => isActive ? null : handleStart(item)}
                    disabled={isActive}
                    className={`h-10 w-10 items-center justify-center rounded-full ${isActive ? 'bg-primary/10' : 'bg-secondary'}`}
                >
                    {isActive ? (
                        // Show playing indicator or nothing (since big timer is at top)
                        <View className="w-3 h-3 bg-primary rounded-sm animate-pulse" />
                    ) : (
                        <Play size={18} color="#fafafa" fill="#fafafa" />
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            ListEmptyComponent={
                <View className="items-center justify-center py-10">
                    <Text className="text-muted text-center">No tasks yet.</Text>
                </View>
            }
        />
    );
}
