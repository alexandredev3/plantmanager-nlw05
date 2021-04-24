import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // useEffect(() => {
  //   AsyncStorage.clear()
  // }, [])

  if (!fontsLoaded) 
    return <AppLoading />;

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
