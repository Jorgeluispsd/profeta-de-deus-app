import { Image, Platform, StyleSheet, } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView from 'react-native-maps';

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
        <ThemedText type="subtitle">Step 1: Tente isto</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools bora testar.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Onde nos encontramos:</ThemedText>
        <ThemedText>
          Nos encontramos na Rua Marli, 191 - Recanto Silvestre (Fazendinha) - São Paulo - SP.
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
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Teste</ThemedText>
        <ThemedText>
          Um simples teste de uso
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 5: Teste1</ThemedText>
        <ThemedText>
          Um simples teste de uso do tamanho do texto
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 6: Mudança3</ThemedText>
        <ThemedText>
          Um simples teste de uso do tamanho da tela
        </ThemedText>
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
    height: '50%',
  },
});
