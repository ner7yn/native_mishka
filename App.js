import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import LoadingPage from './page/LoadingPage';
import TitlePage from './page/TitlePage';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (error) {
    return <Text>Error loading fonts</Text>;
  }

  return fontsLoaded ? <TitlePage /> : <LoadingPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});