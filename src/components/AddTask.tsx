import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Plus } from 'lucide-react-native';
import { dbActions } from '../lib/db-actions';

interface AddTaskProps {
    onAdd: () => void;
}

export function AddTask({ onAdd }: AddTaskProps) {
    const [name, setName] = useState('');
    const [intent, setIntent] = useState('');

    const handleAdd = async () => {
        if (!name.trim()) return;

        await dbActions.addTask(name.trim(), intent ? parseFloat(intent) : 0);
        setName('');
        setIntent('');
        onAdd();
    };

    return (
        <View className="flex-row items-center p-4 gap-3 bg-background border-b border-border">
            <TextInput
                className="flex-1 bg-secondary text-foreground p-3 rounded-lg h-12"
                placeholder="Add a new task..."
                placeholderTextColor="#71717a"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                className="w-16 bg-secondary text-foreground p-3 rounded-lg h-12 text-center"
                placeholder="Hrs"
                placeholderTextColor="#71717a"
                keyboardType="numeric"
                value={intent}
                onChangeText={setIntent}
            />
            <TouchableOpacity
                onPress={handleAdd}
                className="h-12 w-12 bg-primary items-center justify-center rounded-lg"
            >
                <Plus size={24} color="#18181b" />
            </TouchableOpacity>
        </View>
    );
}
