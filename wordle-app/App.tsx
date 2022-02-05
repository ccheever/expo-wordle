import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import Game from './game';

export default function App() {
  let [fontsLoaded] = useFonts({
    ClearSansRegular: require('./assets/fonts/clear-sans/ClearSans-Regular.ttf'),
    ClearSansMedium: require('./assets/fonts/clear-sans/ClearSans-Medium.ttf'),
    ClearSansMediumItalic: require('./assets/fonts/clear-sans/ClearSans-MediumItalic.ttf'),
    ClearSansThin: require('./assets/fonts/clear-sans/ClearSans-Thin.ttf'),
    ClearSansLight: require('./assets/fonts/clear-sans/ClearSans-Light.ttf'),
    ClearSansItalic: require('./assets/fonts/clear-sans/ClearSans-Italic.ttf'),
    ClearSansBold: require('./assets/fonts/clear-sans/ClearSans-Bold.ttf'),
    ClearSansBoldItalic: require('./assets/fonts/clear-sans/ClearSans-BoldItalic.ttf'),
  });

  return fontsLoaded ? (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* 
        <Text
          style={{
            fontFamily: "ClearSansRegular",
            fontSize: 16,
          }}
        >
          Clear Sans Regular
        </Text>

        <Text
          style={{
            fontFamily: "ClearSansMedium",
            fontSize: 16,
          }}
        >
          Clear Sans Medium
        </Text>
        <Text
          style={{
            fontFamily: "ClearSansBold",
            fontSize: 16,
          }}
        >
          Clear Sans Bold
        </Text>

         */}
        <StatusBar barStyle={'dark-content'}/>
        <Game />
      </View>
    </SafeAreaProvider>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
