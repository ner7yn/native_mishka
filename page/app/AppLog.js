import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen';

function ReadySoundsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Готовые звуки!</Text>
    </View>
  );
}

function MyRecordingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Свои записи!</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();

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
          component={ReadySoundsScreen}
          options={{
            tabBarLabel: 'Библиотека',
            tabBarIcon: ({ color }) => (
              <Ionicons name="library" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Свои записи"
          component={MyRecordingsScreen}
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