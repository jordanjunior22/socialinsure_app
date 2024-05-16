import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import NavNoProfile from '../components/NavNoProfile'
import { useNavigation } from '@react-navigation/native';

const PendingMembers = () => {
    const iconUrl = require('../../assets/back.png');
    const navigation = useNavigation();

    const goBack = () =>{
        navigation.goBack();
    }
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
        <NavNoProfile Title='Pending Verification' iconURL={iconUrl} onPress={goBack}/>
        <View style={styles.container}>
        <View style={styles.animationContainer}>
            <LottieView
            source={require('../../assets/lotti/verification.json')}
            autoPlay
            loop
            style={styles.animation}
            />
            <Text style={styles.loadingText}>Please wait while we verify your membership...</Text>
        </View>
        </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  animationContainer: {
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default PendingMembers;
