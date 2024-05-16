import { View, Text } from 'react-native'
import React from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function About() {
    const iconURL = require('../../assets/back.png');
    const navigation = useNavigation();
    const handleBack = () => {
      navigation.navigate('Account');
    };
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
        <NavNoProfile Title='About' iconURL={iconURL} onPress={handleBack}/>
        <Text>Social Insure is a community funded platform for loved ones, ensuring they have needed support they deserve
            in a most timely and efficient manner.
        </Text>
    </SafeAreaView>
  )
}