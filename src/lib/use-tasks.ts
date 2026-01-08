import { useState, useCallback, useEffect } from 'react';
import { dbActions } from '../lib/db-actions';
import { Task } from '../lib/types';
import { useFocusEffect } from 'expo-router';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshTasks = useCallback(async () => {
        try {
            const data = await dbActions.getTasks();
            setTasks(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    // Refresh when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            refreshTasks();
        }, [refreshTasks])
    );

    return { tasks, loading, refreshTasks };
}
