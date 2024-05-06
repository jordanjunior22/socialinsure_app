import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second to fade in
      useNativeDriver: true,
    }).start();

 
    const timeout = setTimeout(() => {
      // navigation.navigate('Intro');
      navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Intro' }],
          })
        );
    }, 3000); 

    return () => clearTimeout(timeout);
  }, [navigation, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('../../assets/logonobg.png')} style={styles.logo} />
      <Text style={styles.text}>Community Support Made Easy</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18B8A8', // Background color as specified
  },
  logo: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White text color
    marginTop: 20,
  },
});

export default Splash;
