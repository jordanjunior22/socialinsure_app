import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
// Import your Lottie animation JSON file
import successAnimation from '../../assets/lotti/success.json';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/Button';

const SuccessFeedback = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LottieView
        source={successAnimation}
        autoPlay
        loop={false} // Only play once for a success animation
        style={styles.animation}
      />
      <Text style={styles.successText}>Your transaction is successful!</Text>
      <CustomButton name='Proceed To Home' onPress={()=>{navigation.navigate('Home')}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
  animation: {
    width: 150,
    height: 150,
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    color: '#34C759', // Dark text color
  },
});

export default SuccessFeedback;
