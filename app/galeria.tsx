import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40 - 16) / 2; // container padding (40) + gap (16)

export default function GaleriaScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    // Imagens simuladas usando URLs do Unsplash voltadas para eventos cristãos/igreja
    const photos = [
        { id: 1, uri: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=500&q=80', height: 200 }, // Louvor/Mão levantada
        { id: 2, uri: 'https://images.unsplash.com/photo-1544427920-c49ccfaf8c56?w=500&q=80', height: 260 }, // Igreja cheia
        { id: 3, uri: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=500&q=80', height: 240 }, // Batismo/Água
        { id: 4, uri: 'https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?w=500&q=80', height: 180 }, // Bíblia aberta
        { id: 5, uri: 'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?w=500&q=80', height: 220 }, // Comunhão/Abraço
        { id: 6, uri: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=500&q=80', height: 280 }, // Coral/Grupo
    ];

    // Dividir as fotos em duas colunas para o efeito Masonry (Pinterest)
    const column1 = photos.filter((_, i) => i % 2 === 0);
    const column2 = photos.filter((_, i) => i % 2 !== 0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Galeria',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Momentos Inesquecíveis</Text>
                    <Text style={[styles.subtitle, { color: colors.muted }]}>
                        Recordações dos nossos cultos, retiros, encontros e sacramentos.
                    </Text>
                </View>

                <View style={styles.masonryContainer}>
                    {/* Coluna Esquerda */}
                    <View style={styles.column}>
                        {column1.map((photo) => (
                            <Image 
                                key={photo.id}
                                source={{ uri: photo.uri }}
                                style={[styles.photo, { height: photo.height }]}
                            />
                        ))}
                    </View>

                    {/* Coluna Direita */}
                    <View style={styles.column}>
                        {column2.map((photo) => (
                            <Image 
                                key={photo.id}
                                source={{ uri: photo.uri }}
                                style={[styles.photo, { height: photo.height }]}
                            />
                        ))}
                    </View>
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
    masonryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        width: COLUMN_WIDTH,
        gap: 16,
    },
    photo: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#E1E9F0', // placeholder color while loading
    },
});
