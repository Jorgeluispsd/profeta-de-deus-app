import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    useColorScheme,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Switch,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

export default function SettingsScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        accent: '#00A8E8',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const [user, setUser] = useState<User | null>(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleAuthAction = async () => {
        if (user) {
            const { error } = await supabase.auth.signOut();
            if (error) Alert.alert('Erro ao sair', error.message);
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} translucent />

            <SafeAreaView style={styles.safe}>
                <View style={styles.headerArea}>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Ajustes</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Sessão Conta */}
                    <Text style={[styles.sectionHeading, { color: colors.muted }]}>CONTA</Text>
                    <View style={[styles.settingsWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.settingRow}>
                            <Text style={[styles.rowLabel, { color: colors.white }]}>
                                {user ? `Logado como ${user.user_metadata?.nome || user.email}` : 'Não conectado'}
                            </Text>
                            <TouchableOpacity
                                style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
                                onPress={handleAuthAction}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.primaryText}>{user ? 'Sair' : 'Entrar'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sessão Preferências */}
                    <Text style={[styles.sectionHeading, { color: colors.muted }]}>PREFERÊNCIAS</Text>
                    <View style={[styles.settingsWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.settingRow, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                            <Text style={[styles.rowLabel, { color: colors.white }]}>Habilitar Notificações</Text>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                thumbColor={colors.trueWhite}
                                trackColor={{ false: '#D1D9E0', true: colors.primary }}
                                ios_backgroundColor="#D1D9E0"
                            />
                        </View>
                        <View style={styles.settingRow}>
                            <Text style={[styles.rowLabel, { color: colors.white }]}>Tema Escuro</Text>
                            <Text style={[styles.rowSubLabel, { color: colors.muted }]}>Desativado (Modo Light Oficial)</Text>
                        </View>
                    </View>

                    {/* Sessão Sobre */}
                    <Text style={[styles.sectionHeading, { color: colors.muted }]}>SOBRE O APP</Text>
                    <View style={[styles.settingsWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.settingRowBlock}>
                            <Text style={[styles.aboutTitle, { color: colors.white }]}>Igreja Profetas de Deus</Text>
                            <Text style={[styles.aboutText, { color: colors.muted }]}>Versão 1.0.0 — Levando a palavra de Deus e eventos da igreja diretamente para seu dispositivo de maneira imersiva e moderna.</Text>
                            
                            <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 12 }}>
                                <Text style={[styles.linkText, { color: colors.primary }]}>Termos de Serviço e Privacidade</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 16, alignSelf: 'flex-start' }} onPress={() => router.push('/contato')}>
                                <Text style={[styles.supportBtnText, { backgroundColor: '#E1F0FF', color: colors.primary }]}>Entre em contato conosco</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    safe: { flex: 1, paddingTop: 40 },
    
    headerArea: { paddingHorizontal: 20, marginBottom: 16 },
    mainTitle: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
    
    scrollContent: { paddingHorizontal: 16, paddingBottom: 60 },
    
    sectionHeading: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 8,
        marginLeft: 16,
        marginTop: 24,
    },
    settingsWrapper: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        minHeight: 58,
    },
    settingRowBlock: {
        paddingHorizontal: 18,
        paddingVertical: 18,
    },
    rowLabel: { fontSize: 16, fontWeight: '600' },
    rowSubLabel: { fontSize: 13, fontWeight: '500' },
    
    primaryBtn: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
    },
    primaryText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
    
    aboutTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
    aboutText: { fontSize: 14, lineHeight: 20 },
    linkText: { fontSize: 14, fontWeight: '600' },
    supportBtnText: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        fontSize: 13,
        fontWeight: '800',
        overflow: 'hidden',
    },
});
