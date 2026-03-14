import React from 'react';
import {
    SafeAreaView,
    useColorScheme,
    useWindowDimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const cards = [
    { id: 1, date: '20 MAI', title: 'Encontro de Mulheres', subtitle: 'Momento Especial', time: '18:00', image: require('@/assets/images/culto-mulheres.jpg') },
    { id: 2, date: '10 JUN', title: 'Culto Jovem', subtitle: 'Venha e traga um amigo', time: '19:00', image: require('@/assets/images/jovens.jpg') },
    { id: 3, date: '25 JUN', title: 'Batismo Sede', subtitle: 'Festa nas águas', time: '10:00', image: require('@/assets/images/batismo.jpg') },
];

export default function HomeScreen() {
    const scheme = useColorScheme();
    const dark = scheme === 'dark' || true;
    const { width, height } = useWindowDimensions();

    const colors = {
        background: '#FFFFFF',
        surface: '#F4F7FA',
        muted: '#6B7A90',
        primary: '#0056B3',
        accent: '#00A8E8',
        white: '#0B132B', // now acts as dark text against white bg
        trueWhite: '#FFFFFF', // added for situations needing actual white
        border: '#E1E9F0',
    };

    return (
        <>
            {/* fundo absoluto cobrindo toda a tela */}
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} /> {/* AJUSTE DE FUNDO */}

            <View style={[styles.root, { backgroundColor: colors.background }]}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} translucent /> {/* AJUSTE DE FUNDO */}
                <ParallaxScrollView
                    headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
                    headerImage={
                        <View style={[styles.headerWrapper, { width, backgroundColor: '#E1E9F0' }]}>
                            <Image
                                source={require('@/assets/images/new-logo-v2.png')}
                                style={styles.headerImage}
                                resizeMode="cover"
                            />
                            <View style={styles.headerBadge}>
                                <Text style={[styles.headerBadgeText, { color: colors.trueWhite }]}>Igreja</Text>
                            </View>
                        </View>
                    }
                >
                    <SafeAreaView style={[styles.safe, { backgroundColor: 'transparent' }]}> {/* AJUSTE DE FUNDO */}
                        <View style={styles.titleRow}>
                            <Text style={[styles.mainTitle, { color: colors.white }]}>Igreja Profetas de Deus</Text>
                            <HelloWave />
                        </View>

                        {/* Quick Actions Menu */}
                        <View style={styles.quickActionsContainer}>
                            <TouchableOpacity style={[styles.quickActionBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/oracao')}>
                                <Text style={styles.quickActionIcon}>🙏</Text>
                                <Text style={[styles.quickActionLabel, { color: colors.white }]}>Oração</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.quickActionBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/campanhas')}>
                                <Text style={styles.quickActionIcon}>🤝</Text>
                                <Text style={[styles.quickActionLabel, { color: colors.white }]}>Projetos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.quickActionBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/aniversariantes')}>
                                <Text style={styles.quickActionIcon}>🎂</Text>
                                <Text style={[styles.quickActionLabel, { color: colors.white }]}>Parabéns</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity style={[styles.cta, { borderColor: colors.primary }]} onPress={() => router.push('/historia')}>
                                <Text style={[styles.ctaText, { color: colors.primary }]}>Saiba mais sobre nós</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rowHeader}>
                            <Text style={[styles.rowTitle, { color: colors.white }]}>Próximos Eventos</Text>
                            <Text style={[styles.rowAction, { color: colors.muted }]}>Ver todos</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.carousel,
                                { paddingHorizontal: (width - Math.round(width * 0.85)) / 2 }
                            ]}
                            snapToInterval={Math.round(width * 0.85) + 16}
                            snapToAlignment="start"
                            decelerationRate="fast"
                            disableIntervalMomentum={true}
                            pagingEnabled={false}
                            scrollEventThrottle={16}
                        >
                            {cards.map((e) => (
                                <TouchableOpacity key={e.id} activeOpacity={0.9} style={[styles.specialEventCard, { width: Math.round(width * 0.85) }]}>
                                    <ImageBackground source={e.image} style={styles.eventImageBg} imageStyle={{ borderRadius: 16 }}>
                                        <View style={styles.imageOverlay} />
                                        
                                        <View style={styles.eventTopInfo}>
                                            <View style={[styles.dateTicket, { backgroundColor: colors.trueWhite }]}>
                                                <Text style={[styles.ticketDay, { color: colors.primary }]}>{e.date.split(' ')[0]}</Text>
                                                <Text style={[styles.ticketMonth, { color: colors.white }]}>{e.date.split(' ')[1]}</Text>
                                            </View>
                                            <View style={[styles.timeTicket, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
                                                <Text style={{ color: colors.trueWhite, fontSize: 13, fontWeight: '600' }}>{e.time}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.eventBottomInfo}>
                                            <Text style={[styles.specialEventTitle, { color: colors.trueWhite }]} numberOfLines={2}>{e.title}</Text>
                                            <Text style={[styles.specialEventSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>{e.subtitle}</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
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
        backgroundColor: '#FFFFFF', // cobre tudo // AJUSTE DE FUNDO
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
        height: '100%',
        width: '100%',
        opacity: 1,
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
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 20,
        gap: 12,
    },
    quickActionBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: 'rgba(0,0,0,0.03)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 2,
    },
    quickActionIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    quickActionLabel: {
        fontSize: 12,
        fontWeight: '700',
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
        // paddingHorizontal is dynamic inline
    },
    specialEventCard: {
        height: 220,
        marginRight: 16,
        borderRadius: 16,
        shadowColor: 'rgba(0,86,179,0.15)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 5,
    },
    eventImageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        padding: 16,
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
    },
    eventTopInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    dateTicket: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    ticketDay: { fontSize: 20, fontWeight: '900', lineHeight: 22 },
    ticketMonth: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', opacity: 0.7 },
    
    timeTicket: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    eventBottomInfo: { marginTop: 'auto' },
    specialEventTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
    specialEventSubtitle: { fontSize: 14, fontWeight: '500' },
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
