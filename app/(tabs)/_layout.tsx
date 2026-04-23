import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const gold = '#9A7B4F';

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#0056B3',
                tabBarInactiveTintColor: '#6B7A90',
                headerShown: false,
                tabBarButton: HapticTab, // mantemos, mas precisa respeitar props
                tabBarBackground: TabBarBackground,
                tabBarStyle: [
                    { backgroundColor: '#FFFFFF', borderTopColor: '#E1E9F0' },
                    Platform.select({
                        ios: { position: 'absolute' },
                        default: {},
                    }),
                ],
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Bíblia',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="eventos"
                options={{
                    title: 'Eventos',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Ajustes',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
                }}
            />

        </Tabs>
    );
}
