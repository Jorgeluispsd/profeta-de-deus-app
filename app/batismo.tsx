import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function BatismoScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const [eventoBatismo, setEventoBatismo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBatismo = async () => {
            const { data, error } = await supabase
                .from('eventos')
                .select('*')
                .eq('tipo', 'batismo')
                .gte('data_evento', new Date().toISOString()) // apenas batismos futuros
                .order('data_evento', { ascending: true })
                .limit(1)
                .single();
            
            if (data) {
                setEventoBatismo(data);
            }
            setIsLoading(false);
        };
        fetchBatismo();
    }, []);

    const formatDataBatismo = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Batismo',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                
                <Image 
                    source={require('../assets/images/batismo.jpg')}
                    style={styles.heroImg}
                />

                <View style={styles.header}>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Nascer de Novo</Text>
                    <Text style={[styles.subtitle, { color: colors.muted }]}>
                        "Quem crer e for batizado será salvo." - Marcos 16:16
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={[styles.sectionTitle, { color: colors.white }]}>O que é o batismo?</Text>
                    <Text style={[styles.paragraph, { color: colors.muted }]}>
                        O batismo nas águas é uma ordenança de Jesus Cristo e um passo fundamental de obediência 
                        para todo aquele que decide segui-Lo. Ele representa publicamente a nossa morte para o 
                        pecado e a nossa ressurreição para uma nova vida com Deus.
                    </Text>

                    <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoIcon}>🗓</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.infoLabel, { color: colors.muted }]}>Próximas Águas</Text>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={colors.primary} style={{ alignSelf: 'flex-start', marginTop: 4 }} />
                                ) : eventoBatismo ? (
                                    <>
                                        <Text style={[styles.infoValue, { color: colors.white }]}>{formatDataBatismo(eventoBatismo.data_evento)}</Text>
                                        <Text style={[styles.infoDesc, { color: colors.muted, marginTop: 4 }]}>{eventoBatismo.titulo}</Text>
                                    </>
                                ) : (
                                    <Text style={[styles.infoValue, { color: colors.muted, fontSize: 14 }]}>Nenhuma data agendada</Text>
                                )}
                            </View>
                        </View>
                        <View style={[styles.divider, { backgroundColor: colors.border }]} />
                        <View style={styles.infoRow}>
                            <Text style={styles.infoIcon}>📍</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.infoLabel, { color: colors.muted }]}>Local</Text>
                                <Text style={[styles.infoValue, { color: colors.white }]}>Associação Recanto Silvestre</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.white }]}>Como me preparar?</Text>
                    <View style={styles.stepsList}>
                        <View style={styles.stepItem}>
                            <View style={[styles.stepCircle, { backgroundColor: colors.primary }]}>
                                <Text style={[styles.stepNumber, { color: colors.trueWhite }]}>1</Text>
                            </View>
                            <Text style={[styles.stepText, { color: colors.muted }]}>Aceitar Jesus como seu único Senhor e Salvador genuinamente.</Text>
                        </View>
                        <View style={styles.stepItem}>
                            <View style={[styles.stepCircle, { backgroundColor: colors.primary }]}>
                                <Text style={[styles.stepNumber, { color: colors.trueWhite }]}>2</Text>
                            </View>
                            <Text style={[styles.stepText, { color: colors.muted }]}>Participar do curso de preparação para novos convertidos (4 aulas).</Text>
                        </View>
                        <View style={styles.stepItem}>
                            <View style={[styles.stepCircle, { backgroundColor: colors.primary }]}>
                                <Text style={[styles.stepNumber, { color: colors.trueWhite }]}>3</Text>
                            </View>
                            <Text style={[styles.stepText, { color: colors.muted }]}>Preencher sua ficha de cadastro com a secretaria da igreja.</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: colors.primary }]} onPress={() => router.push('/contato')}>
                        <Text style={[styles.btnText, { color: colors.trueWhite }]}>Falar com a Secretaria</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    heroImg: {
        width: '100%',
        height: 220,
        marginBottom: 20,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    infoCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
        marginBottom: 32,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    infoLabel: {
        fontSize: 13,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    infoDesc: {
        fontSize: 13,
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    stepsList: {
        marginBottom: 32,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        marginTop: 2,
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: '800',
    },
    stepText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
    },
    btnPrimary: {
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
        fontSize: 16,
        fontWeight: '800',
    },
});
