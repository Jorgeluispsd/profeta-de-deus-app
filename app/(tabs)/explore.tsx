import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import versiculosPorCapitulo from '../../functions/versiculos/versiculosPorCapitulo'; // Dados importados

const livrosBiblia = Object.keys(versiculosPorCapitulo).map((livro) => ({
    nome: livro,
    capitulos: Object.keys(versiculosPorCapitulo[livro]).length,
}));

export default function TelaBiblia() {
    const scheme = useColorScheme();
    const dark = scheme === 'dark' || true;

    const colors = {
        background: '#0E1416',
        surface: '#11181A',
        muted: '#A7B0B3',
        primary: '#9A7B4F', // dourado
        accent: '#1E7A8C',
        white: '#F6F7F8',
    };

    const [livroExpandido, setLivroExpandido] = useState<string | null>(null);
    const [capituloAtivo, setCapituloAtivo] = useState<{ livro: string; capitulo: number } | null>(null);
    const [versiculoSelecionado, setVersiculoSelecionado] = useState<number | null>(null);

    const handleSelecionarLivro = (nome: string) => {
        setLivroExpandido(livroExpandido === nome ? null : nome);
        setCapituloAtivo(null);
        setVersiculoSelecionado(null);
    };

    const handleSelecionarCapitulo = (livro: string, capitulo: number) => {
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
            <Text style={[styles.titulo, { color: colors.primary }]}>Livros da Bíblia</Text>
            <ScrollView>
                {livrosBiblia.map((livro) => (
                    <View key={livro.nome}>
                        <TouchableOpacity
                            style={[styles.livroContainer, { backgroundColor: colors.surface }]}
                            onPress={() => handleSelecionarLivro(livro.nome)}
                        >
                            <Text style={[styles.livroTexto, { color: colors.primary }]}>{livro.nome}</Text>
                            <Text style={{ color: colors.primary }}>
                                {livroExpandido === livro.nome ? '▲' : '▼'}
                            </Text>
                        </TouchableOpacity>

                        {livroExpandido === livro.nome && (
                            <>
                                <Text style={[styles.subtitulo, { color: colors.primary }]}>Capítulos</Text>
                                <View style={styles.capitulosContainer}>
                                    {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((cap) => (
                                        <TouchableOpacity
                                            key={cap}
                                            style={[
                                                styles.botaoNumero,
                                                {
                                                    backgroundColor:
                                                        capituloAtivo?.capitulo === cap ? colors.primary : colors.surface,
                                                    borderColor: colors.primary,
                                                },
                                            ]}
                                            onPress={() => handleSelecionarCapitulo(livro.nome, cap)}
                                        >
                                            <Text
                                                style={[
                                                    styles.numeroTexto,
                                                    {
                                                        color:
                                                            capituloAtivo?.capitulo === cap ? colors.surface : colors.primary,
                                                    },
                                                ]}
                                            >
                                                {cap}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}

                        {capituloAtivo?.livro === livro.nome && (
                            <>
                                <Text style={[styles.subtitulo, { color: colors.primary }]}>Versículos</Text>
                                <View style={styles.capitulosContainer}>
                                    {Array.from(
                                        { length: obterVersiculosPorCapitulo(livro.nome, capituloAtivo.capitulo) },
                                        (_, i) => i + 1
                                    ).map((vers) => (
                                        <TouchableOpacity
                                            key={vers}
                                            style={[
                                                styles.botaoNumero,
                                                {
                                                    backgroundColor:
                                                        versiculoSelecionado === vers ? colors.primary : colors.surface,
                                                    borderColor: colors.primary,
                                                },
                                            ]}
                                            onPress={() => handleSelecionarVersiculo(vers)}
                                        >
                                            <Text
                                                style={[
                                                    styles.numeroTexto,
                                                    { color: versiculoSelecionado === vers ? colors.surface : colors.primary },
                                                ]}
                                            >
                                                {vers}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}

                        {versiculoSelecionado !== null && capituloAtivo?.livro === livro.nome && (
                            <View style={[styles.escrituraBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
                                <Text style={[styles.escrituraTexto, { color: colors.white }]}>
                                    Esta é uma mensagem de teste para o versículo {versiculoSelecionado} de {capituloAtivo.livro} {capituloAtivo.capitulo}.
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50 },
    titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    subtitulo: { fontSize: 16, fontWeight: '600', marginLeft: 15, marginTop: 10 },
    livroContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        borderRadius: 12,
        marginVertical: 4,
    },
    livroTexto: { fontSize: 16, fontWeight: '600' },
    capitulosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    botaoNumero: {
        width: 40,
        height: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
    },
    numeroTexto: {
        fontWeight: 'bold',
    },
    escrituraBox: {
        margin: 10,
        padding: 15,
        borderRadius: 12,
    },
    escrituraTexto: { fontSize: 16 },
});
