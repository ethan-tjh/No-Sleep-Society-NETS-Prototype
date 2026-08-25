import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from "./Navigation.js";
import {WalletProvider} from "./context/WalletContext.js";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold} from '@expo-google-fonts/inter';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
      <SafeAreaProvider>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content"/>
        <WalletProvider>
          <Navigation />
        </WalletProvider>
      </SafeAreaProvider>
  )
};
export default App;