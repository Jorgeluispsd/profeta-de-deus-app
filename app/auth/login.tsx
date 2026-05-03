import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        textDark: '#0B132B',
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
                    headerTitle: '',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    
                    <Animated.View entering={FadeInDown.delay(100).duration(800)} style={styles.header}>
                        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
                            <Text style={styles.emoji}>👋</Text>
                        </View>
                        <Text style={[styles.title, { color: colors.textDark }]}>Bem-vindo de volta!</Text>
                        <Text style={[styles.subtitle, { color: colors.muted }]}>Faça login para acessar seu perfil e ver os próximos eventos.</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInUp.delay(300).duration(800)} style={styles.formContainer}>
                        
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textDark }]}>E-mail</Text>
                            <TextInput 
                                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.textDark }]}
                                placeholder="seu@email.com"
                                placeholderTextColor={colors.muted}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textDark }]}>Senha</Text>
                            <TextInput 
                                style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.textDark }]}
                                placeholder="Sua senha secreta"
                                placeholderTextColor={colors.muted}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity 
                            style={[styles.btnSubmit, isLoading && styles.btnSubmitDisabled]}
                            activeOpacity={0.8}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <LinearGradient
                                colors={['#00A8E8', '#0056B3']}
                                style={styles.gradientBtn}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.btnText}>Entrar</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.muted }]}>Ainda não tem conta? </Text>
                            <TouchableOpacity onPress={() => router.push('/auth/register')}>
                                <Text style={[styles.footerLink, { color: colors.primary }]}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    emoji: {
        fontSize: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    btnSubmit: {
        height: 56,
        borderRadius: 16,
        marginTop: 12,
        overflow: 'hidden',
        shadowColor: '#0056B3',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    btnSubmitDisabled: {
        opacity: 0.7,
    },
    gradientBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        fontSize: 15,
    },
    footerLink: {
        fontSize: 15,
        fontWeight: '800',
    }
});
