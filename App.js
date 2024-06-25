import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Comfortaa_300Light, Comfortaa_400Regular, Comfortaa_500Medium, Comfortaa_600SemiBold, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './page/LoadingPage';
import TitlePage from './page/TitlePage';
import EmailPage from './page/EmailPage';
import ConfirmationPage from './page/ConfirmationPage';
import Confidentiality from './page/documents/Confidentiality';
import User from './page/documents/User';
import AppLog from './page/app/AppLog';
import AboutUs from './page/app/Profile/AboutUs';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });

  if (error) {
    return <Text>Error loading fonts</Text>;
  }

  if (!fontsLoaded) {
    return <LoadingPage />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen name="Title" component={TitlePage} options={{ headerShown: false }} />
        <Stack.Screen name="Email" component={EmailPage} options={{ headerShown: false }} />
        <Stack.Screen name="Confirm" component={ConfirmationPage} options={{ headerShown: false }} />
        <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
        <Stack.Screen name="Confidentiality" component={Confidentiality} options={{ headerShown: false }} />
        <Stack.Screen name="AppLog" component={AppLog} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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