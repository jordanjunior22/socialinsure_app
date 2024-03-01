// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Campaigns from './app/screens/Campaigns';
import Account from './app/screens/Account';
import Histories from './app/screens/Histories';
import Home from './app/screens/Home'
import ProfileDisplay from './app/screens/profile/ProfileDisplay';
import ProfileEdit from './app/screens/profile/ProfileEdit';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Campaigns" component={Campaigns} />
      <Tab.Screen name="Histories" component={Histories} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="ProfileDisplay" component={ProfileDisplay} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;