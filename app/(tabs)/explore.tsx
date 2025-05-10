import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const livrosBiblia = [
  "Gênesis", "Êxodo", "Levítico", "Números",
  "Deuteronômio", "Josué", "Juízes", "Rute",
  "1 Samuel", "2 Samuel", "1 Reis", "2 Reis",
  "1 Crônicas", "2 Crônicas", "Esdras", "Neemias",
  "Ester", "Jó", "Salmos", "Provérbios", "Eclesiastes",
  "Cantares de Salomão", "Isaías", "Jeremias", "Lamentações",
  "Ezequiel", "Daniel", "Oséias", "Joel",
  "Amós", "Obadias", "Jonas", "Miqueias",
  "Naum", "Habacuque", "Sofonias", "Ageu",
  "Zacarias", "Malaquias"
];

export default function TelaBiblia() {
  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [expandido, setExpandido] = useState<string | null>(null);

  const livros = ordemAlfabetica
    ? [...livrosBiblia].sort()
    : livrosBiblia;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.cancelar}>Cancelar</Text>
        <Text style={styles.titulo}>Livros</Text>
        <Text style={styles.historico}>Histórico</Text>
      </View>

      {/* Lista de livros */}
      <FlatList
        data={livros}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => setExpandido(expandido === item ? null : item)}>
              <Text style={styles.livro}>{item}</Text>
            </TouchableOpacity>
            <View style={styles.icones}>
              <TouchableOpacity>
                <Ionicons name="volume-high-outline" size={20} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setExpandido(expandido === item ? null : item)}>
                <Ionicons name={expandido === item ? "chevron-up" : "chevron-down"} size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Rodapé com troca de ordem */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.botao, !ordemAlfabetica && styles.selecionado]}
          onPress={() => setOrdemAlfabetica(false)}
        >
          <Text>Tradicional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, ordemAlfabetica && styles.selecionado]}
          onPress={() => setOrdemAlfabetica(true)}
        >
          <Text>Em ordem alfabética</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10
  },
  cancelar: { fontSize: 16, color: 'black' },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  historico: { fontSize: 16, color: 'black' },
  itemContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 0.5, borderColor: '#ccc'
  },
  livro: { fontSize: 16 },
  icones: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-around',
    padding: 10, borderTopWidth: 1, borderColor: '#eee'
  },
  botao: {
    padding: 10, borderRadius: 10, backgroundColor: '#f0f0f0'
  },
  selecionado: {
    backgroundColor: '#d0d0d0'
  }
});


