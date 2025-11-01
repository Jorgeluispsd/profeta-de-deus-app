import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.greeting}>Olá, Jorge!</Text>
        <Text style={styles.title}>Profetas de Deus</Text>

        <TextInput
          placeholder="Pesquisar tópico"
          style={styles.searchBox}
        />

        <Text style={styles.sectionTitle}>Cultos</Text>
        <View style={styles.serviceRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceRow}>
            <View style={styles.serviceCard}>
              <Text style={styles.dayLabel}>Domingo</Text>
              <Text style={styles.serviceTitle}>Culto da Família</Text>
              <View style={styles.timeRow}>
                <Text style={styles.time}>8hrs</Text>
                <Text style={styles.time}>15hrs</Text>
                <Text style={styles.time}>18hrs</Text>
              </View>
              <Text style={styles.highlight}>✓ Escola Dominical</Text>
              <Text style={styles.address}>R. Marli, 191 - Fazendinha</Text>
            </View>

            <View style={styles.serviceCard}>
              <Text style={styles.dayLabel}>Quarta</Text>
              <Text style={styles.serviceTitle}>Culto da Libertação</Text>
              <View style={styles.timeRow}>
                <Text style={styles.time}>8hrs</Text>
                <Text style={styles.time}>15hrs</Text>
                <Text style={styles.time}>18hrs</Text>
              </View>
              <Text style={styles.highlight}>✓ Escola Dominical</Text>
              <Text style={styles.address}>R. Marli, 191 - Fazendinha</Text>
            </View>
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Próximos eventos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.eventCard}>
            <View style={styles.eventImageWrapper}>
              <View style={styles.dateBox}>
                <Text style={styles.date}>09 MAR</Text>
              </View>
              <Image source={require('../../assets/images/card1.png')} style={styles.eventImage} />
            </View>
            <Text style={styles.eventTitle}>Culto da Família - <Text style={{ fontWeight: 'bold' }}>20hrs</Text></Text>
            <Text style={styles.eventSubtitle}>+Pr Thony e Pra Luzia</Text>
            <Text style={styles.address}>R. Marli, 191 - Fazendinha</Text>
          </View>

          <View style={styles.eventCard}>
            <View style={styles.eventImageWrapper}>
              <View style={styles.dateBox}>
                <Text style={styles.date}>16 MAR</Text>
              </View>
              <Image source={require('../../assets/images/card2.png')} style={styles.eventImage} />
            </View>
            <Text style={styles.eventTitle}>Culto da Cura</Text>
            <Text style={styles.eventSubtitle}>+Pr Thony</Text>
            <Text style={styles.address}>R. Marli, 191 - Fazendinha</Text>
          </View>
        </ScrollView>

      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  greeting: { fontSize: 14, color: '#555' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  searchBox: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  serviceRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  serviceCard: {
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 12,
    padding: 15,
    width: 180,
    marginRight: 10
  },
  dayLabel: { backgroundColor: '#3f51b5', color: '#fff', padding: 4, borderRadius: 4, alignSelf: 'flex-start' },
  serviceTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  timeRow: { flexDirection: 'row', gap: 8 },
  time: { backgroundColor: '#eee', padding: 4, borderRadius: 6 },
  highlight: { color: '#3f51b5', marginVertical: 6 },
  address: { fontSize: 12, color: '#777' },
  eventCard: {
    backgroundColor: '#ffff',
    borderWidth: 1, // Largura da borda
    borderColor: '#555', // Cinza escuro
    borderRadius: 12,
    marginTop: 20,
    marginRight: 10,
    width: 200,
    padding: 10,
  },
  dateBox: {
    position: 'absolute',
    backgroundColor: '#dbeafe',
    padding: 6,
    borderRadius: 8,
    top: 8,
    left: 8,
    zIndex: 1,
  },
  date: { fontSize: 12, textAlign: 'center' },
  eventImage: { width: '100%', height: 100, borderRadius: 8, zIndex: 0, },
  eventTitle: { marginTop: 8, fontSize: 14 },
  eventSubtitle: { fontSize: 12, color: '#555' },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  eventImageWrapper: {
  position: 'relative',
},

});