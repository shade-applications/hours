import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { initDb } from '../src/lib/db';
import { ActiveTimer } from '../src/components/ActiveTimer';
import { AddTask } from '../src/components/AddTask';
import { TaskList } from '../src/components/TaskList';
import { useTasks } from '../src/lib/use-tasks';
import { Link } from 'expo-router';
import { Moon } from 'lucide-react-native';

export default function Index() {
    const { tasks, loading, refreshTasks } = useTasks();

    useEffect(() => {
        initDb().then(() => {
            console.log('Main DB Initialized');
            refreshTasks();
        }).catch(e => console.error('DB Init Error', e));
    }, []);

    return (
        <View className="flex-1 bg-background pt-safe">
            <ActiveTimer />

            <AddTask onAdd={refreshTasks} />

            <TaskList tasks={tasks} onRefresh={refreshTasks} />

            <View className="absolute bottom-8 right-6">
                <Link href="/reflection" asChild>
                    <TouchableOpacity className="bg-secondary p-4 rounded-full border border-border flex-row items-center shadow-lg">
                        <Moon size={24} color="#fafafa" />
                        <Text className="text-foreground ml-2 font-bold">End Day</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}
