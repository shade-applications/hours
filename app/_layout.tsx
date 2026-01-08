import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <View className="flex-1 bg-background">
                <StatusBar style="light" />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#09090b' } }}>
                    <Slot />
                </Stack>
            </View>
        </SafeAreaProvider>
    );
}
