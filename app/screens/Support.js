import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavNoProfile from '../components/NavNoProfile';

const Support = () => {
    const iconURL = require('../../assets/back.png');
    const navigation = useNavigation();
    const handleBack = () => {
      navigation.navigate('Account');
    };
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
        <NavNoProfile Title='About' iconURL={iconURL} onPress={handleBack}/>
        <View style={styles.container}>

        <Text style={styles.header}>Support Information</Text>
        <Text style={styles.instruction}>
            If you need assistance, you can reach out to us via email or phone.
        </Text>
        <Text style={styles.email}>Email: socialinsure.org@gmail.com</Text>
        <Text style={styles.phone}>Phone: +1 703-725-8183</Text>
        <Text style={styles.additionalInfo}>
            Our support team will respond as soon as possible.
        </Text>
        </View>
    </SafeAreaView>

  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',    // Centers horizontally
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
