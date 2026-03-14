import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { router } from 'expo-router';
import versiculosPorCapitulo from '../../functions/versiculos/versiculosPorCapitulo'; // Dados importados

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const livrosBiblia = Object.keys(versiculosPorCapitulo).map((livro) => ({
    nome: livro,
    capitulos: Object.keys(versiculosPorCapitulo[livro]).length,
}));

export default function TelaBiblia() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3', // azul
        accent: '#00A8E8',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const [livroExpandido, setLivroExpandido] = useState<string | null>(null);
    const [capituloAtivo, setCapituloAtivo] = useState<{ livro: string; capitulo: number } | null>(null);
    const [versiculoSelecionado, setVersiculoSelecionado] = useState<number | null>(null);

    const handleSelecionarLivro = (nome: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setLivroExpandido(livroExpandido === nome ? null : nome);
        setCapituloAtivo(null);
        setVersiculoSelecionado(null);
    };

    const handleSelecionarCapitulo = (livro: string, capitulo: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCapituloAtivo({ livro, capitulo });
        setVersiculoSelecionado(null);
    };

    const handleSelecionarVersiculo = (versiculo: number) => {
        setVersiculoSelecionado(versiculo);
    };

    const obterVersiculosPorCapitulo = (livro: string, capitulo: number): number => {
        return versiculosPorCapitulo[livro]?.[capitulo] ?? 0;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerArea}>
                <Text style={[styles.mainTitle, { color: colors.white }]}>Bíblia Sagrada</Text>
                <Text style={[styles.subText, { color: colors.muted }]}>Selecione um livro para começar a leitura</Text>

                <TouchableOpacity style={[styles.studiesBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/estudos')}>
                    <Text style={{ fontSize: 18, marginRight: 8 }}>📚</Text>
                    <Text style={[styles.studiesBtnText, { color: colors.primary }]}>Estudos e Trilhas</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={[styles.listWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {livrosBiblia.map((livro, index) => (
                        <View key={livro.nome}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[
                                    styles.livroRow,
                                    index !== livrosBiblia.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
                                ]}
                                onPress={() => handleSelecionarLivro(livro.nome)}
                            >
                                <Text style={[styles.livroTexto, { color: colors.white }]}>{livro.nome}</Text>
                                <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>
                                    {livroExpandido === livro.nome ? '˄' : '˅'}
                                </Text>
                            </TouchableOpacity>

                            {livroExpandido === livro.nome && (
                                <View style={[styles.expandedContent, { backgroundColor: colors.trueWhite }]}>
                                    <Text style={[styles.sectionHeading, { color: colors.muted }]}>ESCOLHA O CAPÍTULO</Text>
                                    <View style={styles.capitulosGrid}>
                                        {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((cap) => {
                                            const isActive = capituloAtivo?.capitulo === cap;
                                            return (
                                                <TouchableOpacity
                                                    key={cap}
                                                    style={[
                                                        styles.botaoNumero,
                                                        {
                                                            backgroundColor: isActive ? colors.primary : colors.surface,
                                                            borderColor: isActive ? colors.primary : colors.border,
                                                        },
                                                    ]}
                                                    onPress={() => handleSelecionarCapitulo(livro.nome, cap)}
                                                >
                                                    <Text style={[styles.numeroTexto, { color: isActive ? colors.trueWhite : colors.primary }]}>
                                                        {cap}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}

                            {capituloAtivo?.livro === livro.nome && (
                                <View style={[styles.expandedContent, { backgroundColor: colors.trueWhite, borderTopWidth: 1, borderTopColor: colors.surface }]}>
                                    <Text style={[styles.sectionHeading, { color: colors.muted }]}>CAPÍTULO {capituloAtivo.capitulo} - VERSÍCULOS</Text>
                                    <View style={styles.capitulosGrid}>
                                        {Array.from(
                                            { length: obterVersiculosPorCapitulo(livro.nome, capituloAtivo.capitulo) },
                                            (_, i) => i + 1
                                        ).map((vers) => {
                                            const isActive = versiculoSelecionado === vers;
                                            return (
                                                <TouchableOpacity
                                                    key={vers}
                                                    style={[
                                                        styles.botaoNumero,
                                                        styles.botaoVersiculo,
                                                        {
                                                            backgroundColor: isActive ? colors.primary : colors.surface,
                                                            borderColor: isActive ? colors.primary : 'transparent',
                                                        },
                                                    ]}
                                                    onPress={() => handleSelecionarVersiculo(vers)}
                                                >
                                                    <Text style={[styles.numeroTexto, { color: isActive ? colors.trueWhite : colors.primary }]}>
                                                        {vers}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>

                                    {versiculoSelecionado !== null && (
                                        <View style={[styles.escrituraBox, { backgroundColor: '#F0F7FF', borderColor: '#CDE2FA', borderWidth: 1 }]}>
                                            <Text style={[styles.escrituraBadge, { color: colors.primary }]}>
                                                {livro.nome} {capituloAtivo.capitulo}:{versiculoSelecionado}
                                            </Text>
                                            <Text style={[styles.escrituraTexto, { color: colors.white }]}>
                                                Esta é uma mensagem de leitura simulada para o versículo selecionado diretamente do banco de dados (a ser integrado).
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60 },
    headerArea: { paddingHorizontal: 20, marginBottom: 20 },
    mainTitle: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5, marginBottom: 4 },
    subText: { fontSize: 15, fontWeight: '500', marginBottom: 16 },
    studiesBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
    },
    studiesBtnText: {
        fontSize: 14,
        fontWeight: '800',
    },
    
    scrollContent: { paddingHorizontal: 16, paddingBottom: 60 },
    
    listWrapper: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    livroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    livroTexto: { fontSize: 17, fontWeight: '600' },
    
    expandedContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    sectionHeading: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    capitulosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    botaoNumero: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22, // circular "organic" buttons
        borderWidth: 1,
    },
    botaoVersiculo: {
        width: 38,
        height: 38,
        borderRadius: 12, // different squircle shape for verses
    },
    numeroTexto: {
        fontWeight: '700',
        fontSize: 15,
    },
    
    escrituraBox: {
        marginTop: 20,
        padding: 16,
        borderRadius: 14,
    },
    escrituraBadge: {
        fontSize: 13,
        fontWeight: '800',
        marginBottom: 8,
    },
    escrituraTexto: { 
        fontSize: 16,
        lineHeight: 24,
    },
});
