import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, ImageBackground, TouchableOpacity, useColorScheme, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

export default function EventsScreen() {
    const scheme = useColorScheme();
    const { width } = useWindowDimensions();

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

    const recurringServices = [
        { id: 1, title: 'Culto da Família', day: 'Dom', times: ['08:00','15:00','18:00'], highlight: 'Escola Dominical Kids', address: 'R. Marli, 191 - São Paulo' },
        { id: 2, title: 'Culto de Libertação', day: 'Qua', times: ['08:00','15:00','18:00'], highlight: 'Campanha de Milagres', address: 'R. Marli, 191 - São Paulo' },
    ];

    const specialEvents = [
        { id: 1, date: '09 MAR', title: 'Culto da Família Especial', subtitle: 'Avivamento com Pr Thony', time: '20:00', image: require('../../assets/images/card1.png') },
        { id: 2, date: '16 MAR', title: 'Culto da Cura Divina', subtitle: 'Ministração Pra Luzia', time: '19:30', image: require('../../assets/images/card2.png') },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                
                {/* Header Banner Substituto */}
                <View style={styles.headerArea}>
                    <Text style={[styles.greeting, { color: colors.muted }]}>Fique por dentro</Text>
                    <Text style={[styles.mainTitle, { color: colors.white }]}>Agenda e Eventos</Text>

                    {/* Secondary Action Row for Gallery and Baptism */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/galeria')}>
                            <Text style={styles.actionBtnIcon}>📸</Text>
                            <Text style={[styles.actionBtnText, { color: colors.primary }]}>Fotos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/batismo')}>
                            <Text style={styles.actionBtnIcon}>💧</Text>
                            <Text style={[styles.actionBtnText, { color: colors.primary }]}>Batismo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Caixa de Busca Clean */}
                <View style={[styles.searchWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={{ marginRight: 10, fontSize: 16 }}>🔍</Text>
                    <TextInput
                        placeholder="Buscar por culto ou retiro..."
                        placeholderTextColor={colors.muted}
                        style={[styles.searchBox, { color: colors.white }]}
                    />
                </View>

                {/* Categoria 1 - Cultos Fixos */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Cultos Semanais</Text>
                </View>
                
                <View style={styles.servicesContainer}>
                    {recurringServices.map((c) => (
                        <View key={c.id} style={[styles.serviceCardVertical, { backgroundColor: colors.trueWhite, borderColor: colors.border }]}>
                            <View style={styles.serviceHeader}>
                                <View style={[styles.dayBadge, { backgroundColor: '#EBF4FA' }]}>
                                    <Text style={[styles.dayBadgeText, { color: colors.primary }]}>{c.day}</Text>
                                </View>
                                <View style={styles.serviceTitles}>
                                    <Text style={[styles.serviceName, { color: colors.white }]}>{c.title}</Text>
                                    <Text style={[styles.serviceHighlight, { color: colors.accent }]}>⭐ {c.highlight}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.divider} />
                            
                            <View style={styles.serviceDetails}>
                                <View style={styles.timeCluster}>
                                    <Text style={[styles.detailIcon, { color: colors.muted }]}>⏰</Text>
                                    <View style={styles.timePills}>
                                        {c.times.map((t, idx) => (
                                            <View key={idx} style={[styles.timeBadge, { backgroundColor: colors.surface }]}>
                                                <Text style={[styles.timeBadgeText, { color: colors.primary }]}>{t}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                <View style={styles.locationCluster}>
                                    <Text style={[styles.detailIcon, { color: colors.muted }]}>📍</Text>
                                    <Text style={[styles.addressText, { color: colors.muted }]} numberOfLines={1}>{c.address}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Categoria 2 - Eventos Especiais */}
                <View style={[styles.sectionHeaderRow, { marginTop: 30 }]}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Eventos Especiais</Text>
                    <TouchableOpacity>
                        <Text style={[styles.seeAllText, { color: colors.muted }]}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 20 }}
                    snapToInterval={Math.round(width * 0.85) + 16}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    disableIntervalMomentum={true}
                    pagingEnabled={false}
                    scrollEventThrottle={16}
                >
                    {specialEvents.map((e) => (
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
                
                {/* Espaçamento final */}
                <View style={{ height: 60 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 20, paddingTop: 60 },
    headerArea: {
        marginBottom: 20,
    },
    greeting: { fontSize: 15, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    mainTitle: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    actionBtnIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '800',
    },
    
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 30,
        shadowColor: 'rgba(0,86,179,0.06)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
    },
    searchBox: { flex: 1, fontSize: 16, fontWeight: '500' },
    
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: { fontSize: 20, fontWeight: '800' },
    seeAllText: { fontSize: 14, fontWeight: '600' },
    
    servicesContainer: { gap: 16 },
    serviceCardVertical: {
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 3,
    },
    serviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    dayBadge: {
        width: 52,
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    dayBadgeText: { fontSize: 16, fontWeight: '800', textTransform: 'uppercase' },
    serviceTitles: { flex: 1 },
    serviceName: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
    serviceHighlight: { fontSize: 13, fontWeight: '700' },
    
    divider: { height: 1, backgroundColor: '#EFF3F8', marginBottom: 14 },
    
    serviceDetails: { gap: 10 },
    timeCluster: { flexDirection: 'row', alignItems: 'center' },
    locationCluster: { flexDirection: 'row', alignItems: 'center' },
    detailIcon: { fontSize: 14, marginRight: 8, opacity: 0.8 },
    
    timePills: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    timeBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
    timeBadgeText: { fontSize: 13, fontWeight: '700' },
    addressText: { fontSize: 14, fontWeight: '500', flex: 1 },
    
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
});
