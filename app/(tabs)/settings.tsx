import React, { useState } from 'react';
import {
    SafeAreaView,
    useColorScheme,
    useWindowDimensions,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Switch,
    TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
    const scheme = useColorScheme();
    const dark = scheme === 'dark' || true;
    const { width } = useWindowDimensions();

    const colors = {
        background: '#0E1416',
        surface: '#11181A',
        muted: '#A7B0B3',
        primary: '#9A7B4F',
        accent: '#1E7A8C',
        white: '#F6F7F8',
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(dark);

    // @ts-ignore
    return (
        <>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} />
            <View style={[styles.root, { backgroundColor: colors.background }]}>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} translucent />

                <SafeAreaView style={[styles.safe, { backgroundColor: 'transparent' }]}>
                    <Text style={[styles.mainTitle, { color: colors.white, marginHorizontal: 22 }]}>
                        Configurações
                    </Text>

                    <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Conta</Text>
                        <View style={styles.row}>
                            <Text style={[styles.rowText, { color: colors.white }]}>
                                {isLoggedIn ? 'Logado como Usuário' : 'Não conectado'}
                            </Text>
                            <TouchableOpacity
                                style={[
                                    styles.primaryBtn,
                                    { backgroundColor: colors.primary, paddingHorizontal: 16 },
                                ]}
                                onPress={() => setIsLoggedIn(!isLoggedIn)}
                            >
                                <Text style={[styles.primaryText, { color: colors.surface }]}>
                                    {isLoggedIn ? 'Logout' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Preferências</Text>
                        <View style={styles.row}>
                            <Text style={[styles.rowText, { color: colors.white }]}>Notificações</Text>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={(value) => setNotificationsEnabled(value)}
                                thumbColor={notificationsEnabled ? colors.primary : colors.muted}
                                trackColor={{ false: '#555', true: '#444' }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.rowText, { color: colors.white }]}>Modo Escuro</Text>
                            <Switch
                                value={darkModeEnabled}
                                onValueChange={(value) => setDarkModeEnabled(value)}
                                thumbColor={darkModeEnabled ? colors.primary : colors.muted}
                                trackColor={{ false: '#555', true: '#444' }}
                            />
                        </View>
                    </View>
                    <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Sobre o App</Text>
                        <Text style={[styles.sectionText, { color: colors.muted }]}>
                            Profetas de Deus App, versão 1.0. Leva a palavra de Deus e eventos da igreja diretamente
                            para seu dispositivo.
                        </Text>
                        <TouchableOpacity style={[styles.cta, { borderColor: colors.primary }]}>
                            <Text style={[styles.ctaText, { color: colors.primary }]}>Contato / Suporte</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    safe: {
        flex: 1,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 0.2,
        textAlign: 'left',
        marginTop: 12,
        marginBottom: 18,
    },
    sectionCard: {
        marginHorizontal: 16,
        marginTop: 18,
        padding: 14,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOpacity: 0.45,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 18,
        elevation: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    rowText: {
        fontSize: 15,
        fontWeight: '600',
    },
    primaryBtn: {
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        fontWeight: '800',
    },
    cta: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    ctaText: {
        fontWeight: '700',
    },
});
