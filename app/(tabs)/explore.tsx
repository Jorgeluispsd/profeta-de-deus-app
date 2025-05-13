import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const livrosBiblia = [
  { nome: "Gênesis", capitulos: 50 }, { nome: "Êxodo", capitulos: 40 }, { nome: "Levítico", capitulos: 27 },
  { nome: "Números", capitulos: 36 }, { nome: "Deuteronômio", capitulos: 34 }, { nome: "Josué", capitulos: 24 },
  { nome: "Juízes", capitulos: 21 }, { nome: "Rute", capitulos: 4 }, { nome: "1 Samuel", capitulos: 31 },
  { nome: "2 Samuel", capitulos: 24 }, { nome: "1 Reis", capitulos: 22 }, { nome: "2 Reis", capitulos: 25 },
  { nome: "1 Crônicas", capitulos: 29 }, { nome: "2 Crônicas", capitulos: 36 }, { nome: "Esdras", capitulos: 10 },
  { nome: "Neemias", capitulos: 13 }, { nome: "Ester", capitulos: 10 }, { nome: "Jó", capitulos: 42 },
  { nome: "Salmos", capitulos: 150 }, { nome: "Provérbios", capitulos: 31 }, { nome: "Eclesiastes", capitulos: 12 },
  { nome: "Cantares de Salomão", capitulos: 8 }, { nome: "Isaías", capitulos: 66 }, { nome: "Jeremias", capitulos: 52 },
  { nome: "Lamentações", capitulos: 5 }, { nome: "Ezequiel", capitulos: 48 }, { nome: "Daniel", capitulos: 12 },
  { nome: "Oséias", capitulos: 14 }, { nome: "Joel", capitulos: 3 }, { nome: "Amós", capitulos: 9 },
  { nome: "Obadias", capitulos: 1 }, { nome: "Jonas", capitulos: 4 }, { nome: "Miqueias", capitulos: 7 },
  { nome: "Naum", capitulos: 3 }, { nome: "Habacuque", capitulos: 3 }, { nome: "Sofonias", capitulos: 3 },
  { nome: "Ageu", capitulos: 2 }, { nome: "Zacarias", capitulos: 14 }, { nome: "Malaquias", capitulos: 4 },
  { nome: "Mateus", capitulos: 28 }, { nome: "Marcos", capitulos: 16 }, { nome: "Lucas", capitulos: 24 },
  { nome: "João", capitulos: 21 }, { nome: "Atos", capitulos: 28 }, { nome: "Romanos", capitulos: 16 },
  { nome: "1 Coríntios", capitulos: 16 }, { nome: "2 Coríntios", capitulos: 13 }, { nome: "Gálatas", capitulos: 6 },
  { nome: "Efésios", capitulos: 6 }, { nome: "Filipenses", capitulos: 4 }, { nome: "Colossenses", capitulos: 4 },
  { nome: "1 Tessalonicenses", capitulos: 5 }, { nome: "2 Tessalonicenses", capitulos: 3 },
  { nome: "1 Timóteo", capitulos: 6 }, { nome: "2 Timóteo", capitulos: 4 }, { nome: "Tito", capitulos: 3 },
  { nome: "Filemom", capitulos: 1 }, { nome: "Hebreus", capitulos: 13 }, { nome: "Tiago", capitulos: 5 },
  { nome: "1 Pedro", capitulos: 5 }, { nome: "2 Pedro", capitulos: 3 }, { nome: "1 João", capitulos: 5 },
  { nome: "2 João", capitulos: 1 }, { nome: "3 João", capitulos: 1 }, { nome: "Judas", capitulos: 1 },
  { nome: "Apocalipse", capitulos: 22 },
];

export default function TelaBiblia() {
  const [expandido, setExpandido] = useState<string | null>(null);
  const [capituloSelecionado, setCapituloSelecionado] = useState(1);
  const [versiculoSelecionado, setVersiculoSelecionado] = useState(1);

  const handleExpandir = (livro: string, totalCapitulos: number) => {
    if (expandido === livro) {
      setExpandido(null);
    } else {
      setExpandido(livro);
      setCapituloSelecionado(1);
      setVersiculoSelecionado(1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Livros da Bíblia</Text>
      <ScrollView>
        {livrosBiblia.map((livro) => (
          <View key={livro.nome}>
            <TouchableOpacity
              style={styles.livroContainer}
              onPress={() => handleExpandir(livro.nome, livro.capitulos)}
            >
              <Text style={styles.livroTexto}>{livro.nome}</Text>
              <Ionicons
                name={expandido === livro.nome ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
            {expandido === livro.nome && (
              <View style={styles.pickersContainer}>
                <Text style={styles.label}>Capítulo</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={capituloSelecionado}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setCapituloSelecionado(itemValue);
                      setVersiculoSelecionado(1);
                    }}
                  >
                    {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((cap) => (
                      <Picker.Item key={cap} label={String(cap)} value={cap} />
                    ))}
                  </Picker>
                </View>

                <Text style={styles.label}>Versículo</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={versiculoSelecionado}
                    style={styles.picker}
                    onValueChange={(itemValue) => setVersiculoSelecionado(itemValue)}
                  >
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((vers) => (
                      <Picker.Item key={vers} label={String(vers)} value={vers} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  livroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  livroTexto: {
    fontSize: 16,
  },
  pickersContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    paddingBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  picker: {
   backgroundColor: 'rgba(209, 206, 206, 0.27)', // 👈 opacidade de 50%
  borderWidth: 0,
  elevation: 0,
  color: 'black',
},


});
