import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import NavNoProfile from '../components/NavNoProfile';
import AccountButtons from '../components/AccountButtons';
import BottomMargin from '../components/BottomMargin';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../../firebase'

const Account = () => {
  const navigation = useNavigation();
  const iconURL = require('../../assets/back.png');

  const handleBack = () => {
    navigation.navigate('Home');
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
        console.log('Membership button pressed');
        break;
      case 'Notifications':
        console.log('Notifications button pressed');
        break;
      case 'Social Insure Community':
        console.log('Social Insure Community button pressed');
        break;
      case 'Social Insure Support':
        console.log('Social Insure Support button pressed');
        break;
      case 'App Settings':
        console.log('App Settings button pressed');
        break;
      case 'About':
        console.log('About button pressed');
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
          <AccountButtons name="Payments" onPress={() => handleButtonPress('Payments')} />
          <AccountButtons name="Badges" onPress={() => handleButtonPress('Badges')} />
          <AccountButtons name="Membership" onPress={() => handleButtonPress('Membership')} />
          <AccountButtons name="Notifications" onPress={() => handleButtonPress('Notifications')} />
          <AccountButtons name="Social Insure Community" onPress={() => handleButtonPress('Social Insure Community')} />
          <AccountButtons name="Social Insure Support" onPress={() => handleButtonPress('Social Insure Support')} />
          <AccountButtons name="App Settings" onPress={() => handleButtonPress('App Settings')} />
          <AccountButtons name="About" onPress={() => handleButtonPress('About')} />
          <AccountButtons name="Sign Out" onPress={() => {firebase.auth().signOut()}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
