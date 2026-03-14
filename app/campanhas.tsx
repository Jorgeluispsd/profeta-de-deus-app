import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

export default function CampanhasScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const campaigns = [
        { id: 1, title: 'Campanha de Arrecadação de Alimentos', type: 'Ação Social', date: 'Mês de Julho', desc: 'Arrecadação de cestas básicas para o asilo local. Colabore trazendo 1kg de alimento não perecível.', icon: '🥫' },
        { id: 2, title: '21 Dias de Jejum e Oração', type: 'Espiritual', date: '01 a 21 de Agosto', desc: 'Clamor pelas famílias e despertamento espiritual da igreja.', icon: '🙌' },
        { id: 3, title: 'Missão Nordeste', type: 'Missões', date: 'Novembro', desc: 'Arrecadação financeira para nossos missionários no sertão.', icon: '🌍' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Campanhas',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Nossos Projetos</Text>
                    <Text style={[styles.subtitle, { color: colors.muted }]}>
                        Engaje-se nas campanhas do nosso ministério e faça a diferença na vida das pessoas!
                    </Text>
                </View>

                {campaigns.map((camp) => (
                    <View key={camp.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconWrapper, { backgroundColor: colors.trueWhite }]}>
                                <Text style={styles.icon}>{camp.icon}</Text>
                            </View>
                            <View>
                                <Text style={[styles.cardType, { color: colors.primary }]}>{camp.type}</Text>
                                <Text style={[styles.cardDate, { color: colors.muted }]}>{camp.date}</Text>
                            </View>
                        </View>
                        <Text style={[styles.cardTitle, { color: colors.white }]}>{camp.title}</Text>
                        <Text style={[styles.cardDesc, { color: colors.muted }]}>{camp.desc}</Text>
                        
                        <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]}>
                            <Text style={styles.btnText}>Quero Participar</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
        fontSize: 26,
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
        alignItems: 'center',
        marginBottom: 12,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        fontSize: 24,
    },
    cardType: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    cardDate: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 16,
    },
    btn: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
