import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import ReadySoundsScreen from './Sound/ReadySoundsScreen';
import FairyTales from './Sound/FairyTales';
import MyRecordingScreen from './MyRecordingScreen';
import Song from './Sound/Song';
import Nature from './Sound/Nature';
import Animals from './Sound/Animals';
import Lullabies from './Sound/Lullabies';
import Training from './Sound/Training';
import Riddles from './Sound/Riddles';
import NewYear from './Sound/NewYear';
import Noise from './Sound/Noise';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ReadySoundsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ReadySoundsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="fairyTales" component={FairyTales} options={{ headerShown: false }} />
      <Stack.Screen name="Song" component={Song} options={{ headerShown: false }} />
      <Stack.Screen name="Nature" component={Nature} options={{ headerShown: false }} />
      <Stack.Screen name="Animals" component={Animals} options={{ headerShown: false }} />
      <Stack.Screen name="Lullabies" component={Lullabies} options={{ headerShown: false }} />
      <Stack.Screen name="Training" component={Training} options={{ headerShown: false }} />
      <Stack.Screen name="Riddles" component={Riddles} options={{ headerShown: false }} />
      <Stack.Screen name="Noise" component={Noise} options={{ headerShown: false }} />
      <Stack.Screen name="NewYaer" component={NewYear} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function AppLog() {
  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Библиотека звуков"
        screenOptions={{
          tabBarActiveTintColor: '#6f9c3d',
          tabBarInactiveTintColor: '#5c5c5c',
          tabBarStyle: { backgroundColor: '#fff', paddingBottom: 15, paddingTop: 10, height: 75},
          headerShown: true,
          tabBarLabelStyle: { fontSize: 12, fontFamily: 'Comfortaa_600SemiBold' },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Comfortaa_600SemiBold',
            fontSize: 18,
            color: '#5c5c5c'
          },
          headerStyle:{
              borderBottomWidth:1,
              borderBottomColor:'#d9d9d9'
          }
        }}
      >
        <Tab.Screen
          name="Библиотека звуков"
          component={ReadySoundsStack}
          options={{
            tabBarLabel: 'Библиотека',
            tabBarIcon: ({ color }) => (
              <Ionicons name="library" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Свои записи"
          component={MyRecordingScreen}
          options={{
            tabBarLabel: 'Свои записи',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="microphone" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Ваш профиль"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
}