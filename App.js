import * as React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect} from 'react'; 
import Notification from './app/screens/Notification'
import Campaigns from './app/screens/Campaigns';
import Account from './app/screens/Account';
import Contributions from './app/screens/Contributions';
import Home from './app/screens/Home'
import ProfileDisplay from './app/screens/profile/ProfileDisplay';
import QuickTopUp from './app/screens/QuickTopUp';
import SuccessFeedback from './app/screens/SuccessFeedback';
import FailedFeedback from './app/screens/FailedFeedback';
import AllFeatures from './app/screens/AllFeatures';
import SubReqFeatureForNonMembers from './app/screens/SubReqFeatureNonMembers';
import Verification from './app/screens/Verification';
import UploadId from './app/screens/UploadId';
import Terms from './app/screens/Terms';
import Payment from './app/screens/Payment';
import SubReqFeatureForMembers from './app/screens/SubReqFeatureForMembers';
import NoSubReqFeature from './app/screens/NoSubReqFeature';
import CampaignSponsorDetailsContainer from './app/components/CampaignSponsorDetailsContainer';
import ContributionPayment from './app/screens/ContributionPayment';
import AllSponsored from './app/screens/AllSponsored';
import PaymentSettings from './app/screens/PaymentSettings';
import CardDetails from './app/screens/CardDetails';
import Intro from './app/screens/Intro';
import Splash from './app/screens/Splash';
import Login from './app/screens/Login';
import { firebase } from './firebase';
import SignUp from './app/screens/SignUp';
import Membership from './app/screens/Membership'
import Penalty from './app/screens/Penalty'
import { UserContextProvider } from './context/UserContext';
import Support from './app/screens/Support'
import About from './app/screens/About'
import Sponsored from './app/components/Sponsored'
import { StripeProvider } from '@stripe/stripe-react-native';
import PendingMembers from './app/screens/PendingMembers';
import RemovedMembers from './app/screens/RemovedMembers'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
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
                tintColor: focused ? '#18B8A8' : 'black',

              }}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color: focused ? '#18B8A8' : 'gray' }}>{route.name}</Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Campaigns" component={Campaigns} />
      <Tab.Screen name="Contributions" component={Contributions}/>
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};
import { useStripe } from '@stripe/stripe-react-native';
import { Linking } from 'react-native';


function App() {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = React.useCallback(
    async (url) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  
  return (
    <StripeProvider
    publishableKey="pk_test_51PGPDcDOkNDlRQgbiw90SlKMERk2TBW2jV4aQoEs0rgDcwNL0f9wN58MHwxyK8dqqJQ73voME0QXox0WTj9gf7rf00sRumEJQN"
    urlScheme="socialinsure" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
  >
    
      <NavigationContainer>
      <UserContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={MainTabNavigator}/>
            <Stack.Screen name="ProfileDisplay" component={ProfileDisplay} />
            <Stack.Screen name="QuickTopUp" component={QuickTopUp} />
            <Stack.Screen name="SuccessFeedback" component={SuccessFeedback} />
            <Stack.Screen name="FailedFeedback" component={FailedFeedback} />
            <Stack.Screen name="AllFeatures" component={AllFeatures} />
            <Stack.Screen name="SubReqFeatureForNonMembers" component={SubReqFeatureForNonMembers} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="UploadId" component={UploadId} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="SubReqFeatureForMembers" component={SubReqFeatureForMembers} />
            <Stack.Screen name="NoSubReqFeature" component={NoSubReqFeature} />
            <Stack.Screen name="CampaignSponsorDetailsContainer" component={CampaignSponsorDetailsContainer} />
            <Stack.Screen name="ContributionPayment" component={ContributionPayment} />
            <Stack.Screen name="AllSponsored" component={AllSponsored} />
            <Stack.Screen name="PaymentSettings" component={PaymentSettings} />
            <Stack.Screen name="CardDetails" component={CardDetails} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Membership" component={Membership} />
            <Stack.Screen name="Penalty" component={Penalty} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Sponsored" component={Sponsored} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PendingMembers" component={PendingMembers} />
            <Stack.Screen name="RemovedMembers" component={RemovedMembers} />
      </Stack.Navigator>
      </UserContextProvider>
    </NavigationContainer>

    </StripeProvider>
  );
}
//RemovedMembers
//<Stack.Screen name="NoNetwork" component={NoNetwork} />

export default App;
