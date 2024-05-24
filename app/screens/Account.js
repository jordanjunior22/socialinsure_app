import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect,useState } from 'react';
import NavNoProfile from '../components/NavNoProfile';
import AccountButtons from '../components/AccountButtons';
import BottomMargin from '../components/BottomMargin';
import { useNavigation,CommonActions } from '@react-navigation/native';
import {firebase} from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Account = () => {
  const navigation = useNavigation();
  const iconURL = require('../../assets/back.png');
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  const handleBack = () => {
    navigation.goBack();
  };

  const signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('user');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        })
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleButtonPress = (buttonName) => {
    // Add the logic for handling each button based on its name
    switch (buttonName) {
      case 'Profile':
        navigation.navigate('ProfileDisplay');
        break;
      case 'Payments':
        navigation.navigate('PaymentSettings')
        break;
      case 'Badges':
        console.log('Badges button pressed');
        break;
      case 'Membership':
        navigation.navigate('Membership')
        break;
      case 'Notifications':
        navigation.navigate('Notification')
        break;
      case 'Social Insure Community':
        console.log('Whatsapp API');
        break;
      case 'Social Insure Support':
        navigation.navigate('Support');
        break;
      case 'App Settings':
        console.log('App Settings button pressed');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'Sign Out':
        signOutUser();
        break;
      default:
        console.log('Unknown button pressed');
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        <NavNoProfile Title="Account" iconURL={iconURL} onPress={handleBack} />
        <BottomMargin />
        <View style={{ flexDirection: 'column', gap: 5 }}>
          <AccountButtons name="Profile" onPress={() => handleButtonPress('Profile')} />
          {/* <AccountButtons name="Payments" onPress={() => handleButtonPress('Payments')} /> */}
          <AccountButtons name="Badges" onPress={() => handleButtonPress('Badges')} />
          <AccountButtons name="Membership" onPress={() => handleButtonPress('Membership')} />
          <AccountButtons name="Notifications" onPress={() => handleButtonPress('Notifications')} />
          <AccountButtons name="Social Insure Community" onPress={() => handleButtonPress('Social Insure Community')} />
          <AccountButtons name="Social Insure Support" onPress={() => handleButtonPress('Social Insure Support')} />
          {/* <AccountButtons name="App Settings" onPress={() => handleButtonPress('App Settings')} /> */}
          <AccountButtons name="About" onPress={() => handleButtonPress('About')} />
          <AccountButtons name="Sign Out" onPress={() => handleButtonPress('Sign Out')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
