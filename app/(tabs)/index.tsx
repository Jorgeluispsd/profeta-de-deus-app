import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView from 'react-native-maps';

const { width } = Dimensions.get('window');

const cards = [
  { id: 1, title: 'Encontro de Mulheres', content: 'Dia 20/05 às 18h', image: require('@/assets/images/culto-mulheres.jpg') },
  { id: 2, title: 'Culto Jovem', content: 'Dia 10/06 às 19h', image: require('@/assets/images/jovens.jpg') },
  { id: 3, title: 'Batismo', content: 'Dia 25/06 às 10h', image: require('@/assets/images/batismo.jpg') },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/pombo.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Igreja Profetas de Deus</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Quem somos: </ThemedText>
        <ThemedText>
        Somos uma Igreja Cristã, que tem como objetivo levar a palavra de Deus a todos os povos e nações.
          {"\n"}
          Iniciamos nosso projeto em 2016, onde viemos ganhando muitas almas para Cristo, e hoje temos um grande número de membros.
          {"\n"}
          Fazemos campanhas de evangelização, onde levamos a palavra de Deus a todos os lugares, e trabalhos sociais, onde ajudamos as pessoas que mais precisam.
        </ThemedText>
      </ThemedView>      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Proximos Eventos: </ThemedText>
        <ThemedText>
          Os proximos eventos a acontecer vão ser:
          {"\n"}
          <ThemedText type="defaultSemiBold">Santa Ceia: </ThemedText>
          Todo primeiro sabado do mês, as 19:00.
          {"\n"}
          <ThemedText type="defaultSemiBold">Culto dos jovens: </ThemedText>
          Dia 10 de Maio de 2025, as 19:00.
          {"\n"}
          <ThemedText type="defaultSemiBold">Culto de Mulheres: </ThemedText>
          Dia 20 de Maio de 2025, as 18:00.
          {"\n"}
        </ThemedText>
        
        
      </ThemedView>

      {/* 🎯 Carrossel de Eventos */}
      <ThemedView style={styles.carouselContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={styles.carouselScroll}
        >
          {cards.map((card) => (
            <View key={card.id} style={styles.card}>
              {/* Imagem do card */}
              <Image
                source={card.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text>{card.content}</Text>
            </View>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Onde fica a igreja */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Onde nos encontramos:</ThemedText>
        <ThemedText>
          Nos encontramos na Rua Marli, 191 - Recanto Silvestre (Fazendinha) - São Paulo - SP.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/*  Mapa */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.412778,
            longitude: -46.884167,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  carouselContainer: {
    marginVertical: 16,
  },
  carouselScroll: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.8,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  cardImage: {
  width: '100%',
  height: 150,
  borderRadius: 8,
  marginBottom: 10,
},
});
