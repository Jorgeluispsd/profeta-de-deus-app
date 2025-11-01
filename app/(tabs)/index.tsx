import React from 'react';
import {
    SafeAreaView,
    useColorScheme,
    useWindowDimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const cards = [
    { id: 1, title: 'Encontro de Mulheres', content: '20/05 • 18h', image: require('@/assets/images/culto-mulheres.jpg') },
    { id: 2, title: 'Culto Jovem', content: '10/06 • 19h', image: require('@/assets/images/jovens.jpg') },
    { id: 3, title: 'Batismo', content: '25/06 • 10h', image: require('@/assets/images/batismo.jpg') },
];

export default function HomeScreen() {
    const scheme = useColorScheme();
    const dark = scheme === 'dark' || true;
    const { width, height } = useWindowDimensions();

    const colors = {
        background: '#0E1416',
        surface: '#11181A',
        muted: '#A7B0B3',
        primary: '#9A7B4F',
        accent: '#1E7A8C',
        white: '#F6F7F8',
    };

    return (
        <>
            {/* fundo absoluto cobrindo toda a tela */}
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} /> {/* AJUSTE DE FUNDO */}

            <View style={[styles.root, { backgroundColor: colors.background }]}>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} translucent /> {/* AJUSTE DE FUNDO */}
                <ParallaxScrollView
                    headerBackgroundColor={{ light: '#FFFFFF', dark: colors.background }}
                    headerImage={
                        <View style={[styles.headerWrapper, { width, backgroundColor: '#0F2B2F' }]}>
                            <Image
                                source={require('@/assets/images/pombo.jpg')}
                                style={styles.headerImage}
                                resizeMode="contain"
                            />
                            <View style={styles.headerBadge}>
                                <Text style={[styles.headerBadgeText, { color: colors.white }]}>Igreja</Text>
                            </View>
                        </View>
                    }
                >
                    <SafeAreaView style={[styles.safe, { backgroundColor: 'transparent' }]}> {/* AJUSTE DE FUNDO */}
                        <View style={styles.titleRow}>
                            <Text style={[styles.mainTitle, { color: colors.white }]}>Igreja Profetas de Deus</Text>
                            <HelloWave />
                        </View>

                        <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
                            <View style={styles.sectionHeader}>
                                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Quem somos</Text>
                                <View style={styles.underline} />
                            </View>
                            <Text style={[styles.sectionText, { color: colors.muted }]}>
                                Somos uma Igreja Cristã dedicada a levar a palavra de Deus a todos os povos.
                                {'\n\n'}
                                Fundada em 2016, crescemos em fé e serviço — campanhas evangelísticas e trabalho social
                                são pilares do nosso ministério.
                            </Text>
                            <TouchableOpacity style={[styles.cta, { borderColor: colors.primary }]}>
                                <Text style={[styles.ctaText, { color: colors.primary }]}>Saiba mais</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowHeader}>
                            <Text style={[styles.rowTitle, { color: colors.white }]}>Próximos Eventos</Text>
                            <Text style={[styles.rowAction, { color: colors.muted }]}>Ver todos</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.carousel}
                            snapToInterval={Math.round(width * 0.78) + 16}
                            decelerationRate="fast"
                        >
                            {cards.map((c) => (
                                <View
                                    key={c.id}
                                    style={[
                                        styles.eventCard,
                                        { width: Math.round(width * 0.78), backgroundColor: '#0D1516' },
                                    ]}
                                >
                                    <Image source={c.image} style={styles.eventImage} />
                                    <View style={styles.eventBody}>
                                        <Text style={[styles.eventTitle, { color: colors.white }]}>{c.title}</Text>
                                        <Text style={[styles.eventMeta, { color: colors.muted }]}>{c.content}</Text>
                                        <View style={styles.eventFooter}>
                                            <TouchableOpacity style={[styles.ghostBtn, { borderColor: colors.primary }]}>
                                                <Text style={[styles.ghostText, { color: colors.primary }]}>Detalhes</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
                                                <Text style={[styles.primaryText, { color: colors.surface }]}>Participar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
                            <View style={styles.sectionHeader}>
                                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Onde nos encontrar</Text>
                            </View>
                            <Text style={[styles.sectionText, { color: colors.muted }]}>
                                Rua Marli, 191 — Recanto Silvestre (Fazendinha) — São Paulo - SP.
                            </Text>
                            <View style={{ height: 10 }} />
                            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
                                <Text style={[styles.primaryText, { color: colors.surface }]}>Como chegar</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={[styles.footerText, { color: colors.muted }]}>
                                © {new Date().getFullYear()} Profetas de Deus
                            </Text>
                        </View>
                    </SafeAreaView>
                </ParallaxScrollView>
            </View>
        </>
    );
}

/* estilos responsivos e escuros */
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#0C1618', // cobre tudo // AJUSTE DE FUNDO
    },
    safe: {
        flex: 1,
        paddingBottom: 40,
    },
    headerWrapper: {
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    headerImage: {
        height: 160,
        width: 300,
        opacity: 0.98,
    },
    headerBadge: {
        position: 'absolute',
        top: 18,
        left: 18,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    headerBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    titleRow: {
        marginTop: 8,
        marginHorizontal: 22,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 0.2,
        textAlign: 'center',
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
    sectionHeader: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
    },
    underline: {
        height: 3,
        width: 60,
        borderRadius: 3,
        marginTop: 8,
        backgroundColor: 'rgba(154,123,79,0.12)',
    },
    sectionText: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
    },
    cta: {
        marginTop: 14,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    ctaText: {
        fontWeight: '700',
    },
    rowHeader: {
        marginHorizontal: 16,
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: '800',
    },
    rowAction: {
        fontSize: 13,
    },
    carousel: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    eventCard: {
        marginRight: 12,
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.03)',
    },
    eventImage: {
        width: '100%',
        height: 140,
    },
    eventBody: {
        padding: 12,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '800',
    },
    eventMeta: {
        marginTop: 6,
        fontSize: 13,
    },
    eventFooter: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    ghostBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ghostText: {
        fontWeight: '700',
    },
    primaryBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        fontWeight: '800',
    },
    footer: {
        marginTop: 28,
        alignItems: 'center',
        paddingVertical: 12,
    },
    footerText: {
        fontSize: 12,
    },
});
