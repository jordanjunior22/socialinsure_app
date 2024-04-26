// In App.js in a new project
import * as React from 'react';
import { View, Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import Campaigns from './app/screens/Campaigns';
import Account from './app/screens/Account';
import Contributions from './app/screens/Contributions';
import Home from './app/screens/Home'
import ProfileDisplay from './app/screens/profile/ProfileDisplay';
import QuickTopUp from './app/screens/QuickTopUp';
import SuccessFeedback from './app/screens/SuccessFeedback';
import FailedFeedback from './app/screens/FailedFeedback';
import AllFeatures from './app/screens/AllFeatures';
import SubReqFeatureNonMembers from './app/screens/SubReqFeatureNonMembers';
import Verification from './app/screens/Verification';
import UploadId from './app/screens/UploadId';
import Terms from './app/screens/Terms';
import Payment from './app/screens/Payment';
import SubReqFeatureForMembers from './app/screens/SubReqFeatureForMembers';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        paddingVertical: 10, // Apply padding to the entire tab bar
      },
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let iconPath;

        if (route.name === 'Home') {
          iconPath = require('./assets/homeIcon.png');
        } else if (route.name === 'Campaigns') {
          iconPath = require('./assets/campaignsIcon.png');
        } else if (route.name === 'Contributions') {
          iconPath = require('./assets/contributions.png');
        } else if (route.name === 'Account') {
          iconPath = require('./assets/account.png');
        }

        return (
          <Image
            source={iconPath}
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? '#AB2525' : 'black',

            }}
          />
        );
      },
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#AB2525' : 'gray' }}>{route.name}</Text>
      ),
    })}
  >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Campaigns" component={Campaigns} />
      <Tab.Screen name="Contributions" component={Contributions} />
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
        <Stack.Screen name="SubReqFeatureNonMembers" component={SubReqFeatureNonMembers} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="UploadId" component={UploadId} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="SubReqFeatureForMembers" component={SubReqFeatureForMembers} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
//SubReqFeatureForMembers
export default App;