import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack, router } from 'expo-router';

export default function OracaoScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const [nome, setNome] = useState('');
    const [pedido, setPedido] = useState('');

    const handleSubmit = () => {
        if (!nome.trim() || !pedido.trim()) {
            Alert.alert('Atenção', 'Por favor, preencha seu nome e o seu pedido de oração.');
            return;
        }
        
        // Simulação de envio
        Alert.alert(
            'Pedido Enviado!', 
            'Estaremos orando por você e por sua família! Deus abençoe.',
            [{ text: 'Amém', onPress: () => router.back() }]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Pedido de Oração',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    
                    <View style={styles.header}>
                        <Text style={{ fontSize: 48, marginBottom: 12 }}>🙏</Text>
                        <Text style={[styles.title, { color: colors.white }]}>Como podemos orar por você?</Text>
                        <Text style={[styles.subtitle, { color: colors.muted }]}>
                            Deixe seu pedido. Nossa equipe pastoral e intercessores estarão clamando ao Senhor pela sua vida!
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={[styles.label, { color: colors.white }]}>Seu Nome</Text>
                        <TextInput 
                            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.white }]}
                            placeholder="Ex: João da Silva"
                            placeholderTextColor={colors.muted}
                            value={nome}
                            onChangeText={setNome}
                        />

                        <Text style={[styles.label, { color: colors.white }]}>Seu Pedido</Text>
                        <TextInput 
                            style={[styles.inputArea, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.white }]}
                            placeholder="Descreva aqui o seu pedido de oração. Deus está no controle de tudo..."
                            placeholderTextColor={colors.muted}
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            value={pedido}
                            onChangeText={setPedido}
                        />

                        <TouchableOpacity 
                            style={[styles.btnSubmit, { backgroundColor: colors.primary }]}
                            activeOpacity={0.8}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.btnText}>Enviar Pedido de Oração</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    form: {
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 54,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 20,
    },
    inputArea: {
        height: 150,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        marginBottom: 30,
    },
    btnSubmit: {
        height: 56,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0056B3',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});
