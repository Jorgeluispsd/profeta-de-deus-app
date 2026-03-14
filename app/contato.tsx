import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';

export default function ContatoScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
        whatsapp: '#25D366',
    };

    const handlePress = (type: string) => {
        Alert.alert('Funcionalidade', `Esta ação abriria o aplicativo de ${type}. (Em breve no app)`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Fale Conosco',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 54, marginBottom: 8, textAlign: 'center' }}>📲</Text>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Entre em Contato</Text>
                    <Text style={[styles.subtitle, { color: colors.muted }]}>
                        Nossa secretaria e corpo pastoral estão sempre à disposição para te ajudar no que for preciso.
                    </Text>
                </View>

                <View style={styles.methodsContainer}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={[styles.methodCard, { backgroundColor: colors.whatsapp }]}
                        onPress={() => handlePress('WhatsApp')}
                    >
                        <Text style={styles.methodIcon}>💬</Text>
                        <View style={styles.methodInfo}>
                            <Text style={[styles.methodTitle, { color: colors.trueWhite }]}>WhatsApp Secretaria</Text>
                            <Text style={[styles.methodDesc, { color: colors.trueWhite, opacity: 0.9 }]}>Respostas em até 24h</Text>
                        </View>
                        <Text style={{ color: colors.trueWhite, fontSize: 24 }}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={[styles.methodCard, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
                        onPress={() => handlePress('Telefone')}
                    >
                        <Text style={styles.methodIcon}>📞</Text>
                        <View style={styles.methodInfo}>
                            <Text style={[styles.methodTitle, { color: colors.white }]}>Ligar para Igreja</Text>
                            <Text style={[styles.methodDesc, { color: colors.muted }]}>Horário Comercial</Text>
                        </View>
                        <Text style={{ color: colors.primary, fontSize: 24 }}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={[styles.methodCard, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
                        onPress={() => handlePress('E-mail')}
                    >
                        <Text style={styles.methodIcon}>✉️</Text>
                        <View style={styles.methodInfo}>
                            <Text style={[styles.methodTitle, { color: colors.white }]}>Enviar um E-mail</Text>
                            <Text style={[styles.methodDesc, { color: colors.muted }]}>contato@profetasdedeus.com</Text>
                        </View>
                        <Text style={{ color: colors.primary, fontSize: 24 }}>→</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addressBox}>
                    <Text style={[styles.addressTitle, { color: colors.white }]}>📍 Nosso Endereço</Text>
                    <Text style={[styles.addressText, { color: colors.muted }]}>
                        Rua Marli, 191{'\n'}
                        Fase 1 - Recanto Silvestre (Fazendinha){'\n'}
                        São Paulo - SP
                    </Text>
                    <TouchableOpacity style={[styles.mapBtn, { backgroundColor: colors.primary }]} onPress={() => handlePress('Google Maps')}>
                        <Text style={[styles.mapBtnText, { color: colors.trueWhite }]}>Abrir no Mapa</Text>
                    </TouchableOpacity>
                </View>

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
        marginBottom: 30,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    methodsContainer: {
        gap: 16,
        marginBottom: 32,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
    },
    methodIcon: {
        fontSize: 28,
        marginRight: 16,
    },
    methodInfo: {
        flex: 1,
    },
    methodTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    methodDesc: {
        fontSize: 14,
        fontWeight: '500',
    },
    addressBox: {
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#F7FAFC',
        borderWidth: 1,
        borderColor: '#E1E9F0',
        alignItems: 'center',
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10,
    },
    addressText: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    mapBtn: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    mapBtnText: {
        fontSize: 15,
        fontWeight: '800',
    },
});
