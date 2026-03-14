import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';

export default function EstudosScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const estudos = [
        { id: 1, title: 'Princípios da Fé Cristã', category: 'Iniciantes', time: '4 Lições', desc: 'Aprenda os pilares fundamentais da fé cristã, arrepêndimento e a nova vida em Cristo.' },
        { id: 2, title: 'A Jornada no Deserto', category: 'Devocional', time: '7 Dias', desc: 'Série devocional de uma semana sobre como lidar com as provações da vida cristã.' },
        { id: 3, title: 'Livro de João Profundo', category: 'Teologia', time: '12 Lições', desc: 'Mergulhe nas raízes teológicas e messiânicas do Evangelho segundo João.' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Estudos Bíblicos',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Trilhas e Estudos</Text>
                    <Text style={[styles.subtitle, { color: colors.muted }]}>
                        Aprofunde seu conhecimento na Palavra de Deus com nossos materiais preparados pelos pastores.
                    </Text>
                </View>

                {estudos.map((estudo) => (
                    <TouchableOpacity activeOpacity={0.8} key={estudo.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                                <Text style={[styles.badgeText, { color: colors.trueWhite }]}>{estudo.category}</Text>
                            </View>
                            <Text style={[styles.time, { color: colors.muted }]}>⏱ {estudo.time}</Text>
                        </View>
                        <Text style={[styles.cardTitle, { color: colors.white }]}>{estudo.title}</Text>
                        <Text style={[styles.cardDesc, { color: colors.muted }]}>{estudo.desc}</Text>
                        
                        <View style={styles.btnRow}>
                            <Text style={[styles.startText, { color: colors.primary }]}>Começar estudo agora</Text>
                            <Text style={{ color: colors.primary, fontSize: 18 }}>→</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    time: {
        fontSize: 13,
        fontWeight: '600',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 16,
    },
    btnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#E1E9F0',
        paddingTop: 16,
    },
    startText: {
        fontSize: 15,
        fontWeight: '700',
    },
});
