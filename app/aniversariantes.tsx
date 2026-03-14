import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

export default function AniversariantesScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    const currentMonth = 'Novembro';
    
    const aniversariantes = [
        { id: 1, nome: 'Pra. Luzia', dia: '02' },
        { id: 2, nome: 'Irmão Carlos Eduardo', dia: '10' },
        { id: 3, nome: 'Matheus Lima', dia: '15' },
        { id: 4, nome: 'Irmã Cida', dia: '22' },
        { id: 5, nome: 'João da Silva', dia: '28' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Aniversariantes',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                
                <View style={styles.header}>
                    <Text style={{ fontSize: 54, marginBottom: 8, textAlign: 'center' }}>🎂</Text>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Parabéns!</Text>
                    <Text style={[styles.subtitle, { color: colors.muted }]}>
                        Celebre a vida dos nossos irmãos que completam mais um ano de vida no mês de {currentMonth}.
                    </Text>
                </View>

                <View style={[styles.listWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {aniversariantes.map((pessoa, index) => (
                        <View 
                            key={pessoa.id} 
                            style={[
                                styles.row, 
                                index !== aniversariantes.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
                            ]}
                        >
                            <View style={styles.rowLeft}>
                                <View style={[styles.avatar, { backgroundColor: colors.trueWhite, borderColor: colors.border }]}>
                                    <Text style={{ fontSize: 16 }}>👤</Text>
                                </View>
                                <Text style={[styles.nome, { color: colors.white }]}>{pessoa.nome}</Text>
                            </View>
                            <View style={[styles.dateBadge, { backgroundColor: colors.primary }]}>
                                <Text style={[styles.dateBadgeText, { color: colors.trueWhite }]}>Dia {pessoa.dia}</Text>
                            </View>
                        </View>
                    ))}
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
    listWrapper: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: '600',
    },
    dateBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dateBadgeText: {
        fontSize: 12,
        fontWeight: '800',
    },
});
