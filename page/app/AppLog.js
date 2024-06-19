import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

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

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Профиль!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function AppLog() {
  return (
    <Provider>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#6f9c3d',
            tabBarInactiveTintColor: '#5c5c5c',
            tabBarStyle: { backgroundColor: '#fff',paddingBottom:15,paddingTop:10,height:75 },
            headerShown: false,
            tabBarLabelStyle: { fontSize: 12, fontFamily: 'Comfortaa_600SemiBold' }
          }}
        >
          <Tab.Screen
            name="ReadySounds"
            component={ReadySoundsScreen}
            options={{
              tabBarLabel: 'Готовые звуки',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="music" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="MyRecordings"
            component={MyRecordingsScreen}
            options={{
              tabBarLabel: 'Свои записи',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="microphone" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
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