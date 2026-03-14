import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

export default function HistoriaScreen() {
    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        white: '#0B132B',
        trueWhite: '#FFFFFF',
        border: '#E1E9F0',
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen 
                options={{ 
                    headerTitle: 'Nossa História',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <Image 
                    source={require('../assets/images/new-logo-v2.png')} 
                    style={styles.heroImage}
                    resizeMode="contain"
                />
                
                <View style={styles.content}>
                    <Text style={[styles.title, { color: colors.white }]}>Quem Somos</Text>
                    <Text style={[styles.paragraph, { color: colors.muted }]}>
                        A Igreja Profetas de Deus nasceu no coração de Deus no ano de 2016 com a 
                        missão de levar amor, salvação e esperança para as famílias. Localizada em São Paulo, 
                        nosso objetivo é viver genuinamente os ensinamentos de Cristo.
                    </Text>

                    <View style={styles.divider} />

                    <Text style={[styles.title, { color: colors.white }]}>Nossos Pastores</Text>
                    <View style={[styles.pastorCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.pastorAvatar}>
                            <Text style={{ fontSize: 24 }}>👨🏽‍💼</Text>
                        </View>
                        <View style={styles.pastorInfo}>
                            <Text style={[styles.pastorRole, { color: colors.primary }]}>Pastor Presidente</Text>
                            <Text style={[styles.pastorName, { color: colors.white }]}>Pr. Marcio</Text>
                            <Text style={[styles.pastorBio, { color: colors.muted }]}>
                                Fundador do ministério, dedicado ao ensino da Palavra e formação de líderes há mais de 20 anos.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.pastorCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.pastorAvatar}>
                            <Text style={{ fontSize: 24 }}>👩🏽‍💼</Text>
                        </View>
                        <View style={styles.pastorInfo}>
                            <Text style={[styles.pastorRole, { color: colors.primary }]}>Pastora</Text>
                            <Text style={[styles.pastorName, { color: colors.white }]}>Pra. Luzia</Text>
                            <Text style={[styles.pastorBio, { color: colors.muted }]}>
                                Líder do Ministério de Mulheres e do ministério infantil, atuando na restauração de lares.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={[styles.title, { color: colors.white }]}>Nossa Missão</Text>
                    <Text style={[styles.paragraph, { color: colors.muted }]}>
                        "Ide por todo o mundo e pregai o evangelho a toda criatura." (Marcos 16:15).
                        Nossa missão contínua é alcançar almas e batizá-las em nome do Pai, Filho e Espírito Santo.
                    </Text>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    heroImage: {
        width: '100%',
        height: 120,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginTop: 10,
    },
    content: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 12,
        marginTop: 10,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#E1E9F0',
        marginVertical: 24,
    },
    pastorCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
    },
    pastorAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#E1E9F0',
    },
    pastorInfo: {
        flex: 1,
    },
    pastorRole: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    pastorName: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
    pastorBio: {
        fontSize: 14,
        lineHeight: 20,
    },
});
