import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  versiculosPorCapitulo  from '../../functions/versiculos/versiculosPorCapitulo'; // Dados importados separados

const livrosBiblia = Object.keys(versiculosPorCapitulo).map((livro) => ({
  nome: livro,
  capitulos: Object.keys(versiculosPorCapitulo[livro]).length,
}));

export default function TelaBiblia() {
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Livros da Bíblia</Text>
      <ScrollView>
        {livrosBiblia.map((livro) => (
          <View key={livro.nome}>
            <TouchableOpacity
              style={styles.livroContainer}
              onPress={() => handleSelecionarLivro(livro.nome)}
            >
              <Text style={styles.livroTexto}>{livro.nome}</Text>
              <Ionicons
                name={livroExpandido === livro.nome ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>

            {livroExpandido === livro.nome && (
              <>
                <Text style={styles.subtitulo}>Capítulo</Text>
                <View style={styles.capitulosContainer}>
                  {Array.from({ length: livro.capitulos }, (_, i) => i + 1).map((cap) => (
                    <TouchableOpacity
                      key={cap}
                      style={styles.botaoNumero}
                      onPress={() => handleSelecionarCapitulo(livro.nome, cap)}
                    >
                      <Text style={styles.numeroTexto}>{cap}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {capituloAtivo?.livro === livro.nome && (
              <>
                <Text style={styles.subtitulo}>Versículo</Text>
                <View style={styles.versiculosContainer}>
                  {Array.from({ length: obterVersiculosPorCapitulo(livro.nome, capituloAtivo.capitulo) }, (_, i) => i + 1).map((vers) => (
                    <TouchableOpacity
                      key={vers}
                      style={styles.botaoNumero}
                      onPress={() => handleSelecionarVersiculo(vers)}
                    >
                      <Text style={styles.numeroTexto}>{vers}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {versiculoSelecionado !== null && capituloAtivo?.livro === livro.nome && (
              <View style={styles.escrituraBox}>
                <Text style={styles.escrituraTexto}>
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
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 50 },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '600',
    marginLeft: 15,
    marginTop: 10,
  },
  livroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  livroTexto: {
    fontSize: 16,
    color: '#fff',
  },
  capitulosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  versiculosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  botaoNumero: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  numeroTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  escrituraBox: {
    margin: 10,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    borderColor: '#444',
    borderWidth: 1,
  },
  escrituraTexto: {
    color: '#fff',
    fontSize: 16,
  },
});
