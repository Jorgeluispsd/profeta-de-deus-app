import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, useColorScheme } from 'react-native';

export default function HomeScreen() {
    const scheme = useColorScheme();
    const dark = scheme === 'dark' || true;

    const colors = {
        background: '#0E1416',
        surface: '#11181A',
        muted: '#A7B0B3',
        primary: '#9A7B4F', // dourado
        accent: '#1E7A8C',
        white: '#F6F7F8',
    };

    const cards = [
        { id: 1, title: 'Culto da Família', day: 'Domingo', times: ['8hrs','15hrs','18hrs'], highlight: '✓ Escola Dominical', address: 'R. Marli, 191 - Fazendinha' },
        { id: 2, title: 'Culto da Libertação', day: 'Quarta', times: ['8hrs','15hrs','18hrs'], highlight: '✓ Escola Dominical', address: 'R. Marli, 191 - Fazendinha' },
    ];

    const events = [
        { id: 1, date: '09 MAR', title: 'Culto da Família - 20hrs', subtitle: '+Pr Thony e Pra Luzia', address: 'R. Marli, 191 - Fazendinha', image: require('../../assets/images/card1.png') },
        { id: 2, date: '16 MAR', title: 'Culto da Cura', subtitle: '+Pr Thony', address: 'R. Marli, 191 - Fazendinha', image: require('../../assets/images/card2.png') },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView style={styles.content}>
                <Text style={[styles.greeting, { color: colors.muted }]}>Olá, Jorge!</Text>
                <Text style={[styles.title, { color: colors.white }]}>Profetas de Deus</Text>

                <TextInput
                    placeholder="Pesquisar tópico"
                    placeholderTextColor={colors.muted}
                    style={[styles.searchBox, { backgroundColor: colors.surface, color: colors.white, borderColor: colors.muted }]}
                />

                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Cultos</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceRow}>
                    {cards.map((c) => (
                        <View key={c.id} style={[styles.serviceCard, { backgroundColor: colors.surface, borderColor: 'rgba(255,255,255,0.08)' }]}>
                            <Text style={[styles.dayLabel, { backgroundColor: colors.accent }]}>{c.day}</Text>
                            <Text style={[styles.serviceTitle, { color: colors.white }]}>{c.title}</Text>
                            <View style={styles.timeRow}>
                                {c.times.map((t, idx) => <Text key={idx} style={[styles.time, { backgroundColor: colors.background, color: colors.white, borderWidth: 1, borderColor: colors.primary }]}>{t}</Text>)}
                            </View>
                            <Text style={[styles.highlight, { color: colors.primary }]}>{c.highlight}</Text>
                            <Text style={[styles.address, { color: colors.muted }]}>{c.address}</Text>
                        </View>
                    ))}
                </ScrollView>

                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Próximos eventos</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {events.map((e) => (
                        <View key={e.id} style={[styles.eventCard, { backgroundColor: colors.surface, borderColor: 'rgba(255,255,255,0.08)' }]}>
                            <View style={styles.eventImageWrapper}>
                                <View style={[styles.dateBox, { backgroundColor: colors.accent }]}>
                                    <Text style={[styles.date, { color: colors.white }]}>{e.date}</Text>
                                </View>
                                <Image source={e.image} style={styles.eventImage} />
                            </View>
                            <Text style={[styles.eventTitle, { color: colors.white }]}>{e.title}</Text>
                            <Text style={[styles.eventSubtitle, { color: colors.muted }]}>{e.subtitle}</Text>
                            <Text style={[styles.address, { color: colors.muted }]}>{e.address}</Text>
                        </View>
                    ))}
                </ScrollView>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20, paddingTop: 50 },
    greeting: { fontSize: 14 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    searchBox: {
        padding: 10,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 12 },
    serviceRow: { flexDirection: 'row', gap: 10 },
    serviceCard: {
        borderRadius: 14,
        padding: 15,
        width: 180,
        marginRight: 12,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 8,
    },
    dayLabel: { color: '#fff', padding: 4, borderRadius: 4, alignSelf: 'flex-start', fontSize: 12, fontWeight: '700' },
    serviceTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
    timeRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
    time: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, fontSize: 12 },
    highlight: { marginVertical: 6, fontSize: 12, fontWeight: '700' },
    address: { fontSize: 12 },
    eventCard: {
        borderRadius: 14,
        width: 200,
        marginRight: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 8,
    },
    eventImageWrapper: { position: 'relative' },
    dateBox: { position: 'absolute', top: 8, left: 8, padding: 6, borderRadius: 8, zIndex: 1 },
    date: { fontSize: 12, textAlign: 'center', fontWeight: '700' },
    eventImage: { width: '100%', height: 100, borderRadius: 8 },
    eventTitle: { marginTop: 8, fontSize: 14, fontWeight: '600' },
    eventSubtitle: { fontSize: 12 },
});
