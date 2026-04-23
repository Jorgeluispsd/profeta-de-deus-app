import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
            return;
        }

        setIsLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
        });
        setIsLoading(false);

        if (error) {
            Alert.alert('Erro no Login', error.message);
        } else {
            router.replace('/(tabs)/settings');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Acessar Conta',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <Text style={{ fontSize: 48, marginBottom: 12 }}>👋</Text>
                        <Text style={[styles.title, { color: colors.white }]}>Bem-vindo de volta!</Text>
                        <Text style={[styles.subtitle, { color: colors.muted }]}>
                            Faça login para acessar seu perfil e ver os próximos eventos.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={[styles.label, { color: colors.white }]}>E-mail</Text>
                        <TextInput 
                            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.white }]}
                            placeholder="seu@email.com"
                            placeholderTextColor={colors.muted}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={[styles.label, { color: colors.white }]}>Senha</Text>
                        <TextInput 
                            style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.white }]}
                            placeholder="Sua senha secreta"
                            placeholderTextColor={colors.muted}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity 
                            style={[styles.btnSubmit, { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 }]}
                            activeOpacity={0.8}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.btnText}>Entrar</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={{ color: colors.muted }}>Ainda não tem conta? </Text>
                            <TouchableOpacity onPress={() => router.push('/auth/register')}>
                                <Text style={{ color: colors.primary, fontWeight: '700' }}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
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
        marginTop: 10,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
    }
});
