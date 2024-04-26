// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import SubReqFeatureContainer from './app/components/SubReqFeatureContainer';

import Campaigns from './app/screens/Campaigns';
import Account from './app/screens/Account';
import Histories from './app/screens/Histories';
import Home from './app/screens/Home'
import ProfileDisplay from './app/screens/profile/ProfileDisplay';
import QuickTopUp from './app/screens/QuickTopUp';
import SuccessFeedback from './app/screens/SuccessFeedback';
import FailedFeedback from './app/screens/FailedFeedback';
import AllFeatures from './app/screens/AllFeatures';
import SubReqFeature from './app/screens/SubReqFeature';
import Verification from './app/screens/Verification';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
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
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {/* Login screen */}
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="ProfileDisplay" component={ProfileDisplay} />
        <Stack.Screen name="QuickTopUp" component={QuickTopUp} />
        <Stack.Screen name="SuccessFeedback" component={SuccessFeedback} />
        <Stack.Screen name="FailedFeedback" component={FailedFeedback} />
        <Stack.Screen name="AllFeatures" component={AllFeatures} />
        <Stack.Screen name="SubReqFeature" component={SubReqFeature} />
        <Stack.Screen name="SubReqFeatureContainer" component={SubReqFeatureContainer} />
        <Stack.Screen name="Verification" component={Verification} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;