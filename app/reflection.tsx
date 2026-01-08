import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { analytics } from '../src/lib/analytics';
import { getDb } from '../src/lib/db';

export default function Reflection() {
    const router = useRouter();
    const [stats, setStats] = useState({ totalMs: 0 });

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");

    useEffect(() => {
        analytics.getDailyStats().then(setStats);
    }, []);

    const handleSubmit = async () => {
        const db = await getDb();
        await db.runAsync(
            'INSERT INTO reflections (date, q_went_well, q_distractions, q_tomorrow, created_at) VALUES (?, ?, ?, ?, ?)',
            [new Date().toISOString().split('T')[0], q1, q2, q3, new Date().toISOString()]
        );
        router.back();
    };

    const formatHours = (ms: number) => (ms / (1000 * 60 * 60)).toFixed(1);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View className="flex-row items-center mb-6">
                    <Link href="/" asChild>
                        <TouchableOpacity className="mr-4">
                            <ArrowLeft size={24} color="#fafafa" />
                        </TouchableOpacity>
                    </Link>
                    <Text className="text-foreground text-xl font-bold">Reflection</Text>
                </View>

                <View className="flex-row gap-4 mb-8">
                    <View className="flex-1 bg-card p-4 rounded-xl border border-border">
                        <Text className="text-muted text-xs uppercase tracking-wider mb-1">Tracked</Text>
                        <Text className="text-foreground text-2xl font-bold">
                            {formatHours(stats.totalMs)} <Text className="text-sm font-normal text-muted">hrs</Text>
                        </Text>
                    </View>
                    {/* Unclassified gap calculation requires more complex logic (comparing sequential log gaps), skipped for step 1 MVP simplicity */}
                    <View className="flex-1 bg-card p-4 rounded-xl border border-border">
                        <Text className="text-muted text-xs uppercase tracking-wider mb-1">Unclassified</Text>
                        <Text className="text-foreground text-2xl font-bold">
                            --
                        </Text>
                    </View>
                </View>

                <View className="gap-6">
                    <View>
                        <Text className="text-foreground font-medium mb-3">What went well today?</Text>
                        <TextInput
                            className="bg-secondary text-foreground p-4 rounded-xl min-h-[100px] text-base"
                            multiline
                            textAlignVertical="top"
                            placeholder="Focus..."
                            placeholderTextColor="#52525b"
                            value={q1}
                            onChangeText={setQ1}
                        />
                    </View>
                    <View>
                        <Text className="text-foreground font-medium mb-3">What distracted you?</Text>
                        <TextInput
                            className="bg-secondary text-foreground p-4 rounded-xl min-h-[100px] text-base"
                            multiline
                            textAlignVertical="top"
                            placeholder="Social Media..."
                            placeholderTextColor="#52525b"
                            value={q2}
                            onChangeText={setQ2}
                        />
                    </View>
                    <View>
                        <Text className="text-foreground font-medium mb-3">What would you change tomorrow?</Text>
                        <TextInput
                            className="bg-secondary text-foreground p-4 rounded-xl min-h-[100px] text-base"
                            multiline
                            textAlignVertical="top"
                            placeholder="Better planning..."
                            placeholderTextColor="#52525b"
                            value={q3}
                            onChangeText={setQ3}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-primary p-4 rounded-xl flex-row items-center justify-center mt-4"
                    >
                        <Check size={20} color="#18181b" />
                        <Text className="text-background font-bold ml-2 text-base">Complete day</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
