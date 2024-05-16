import React, { useState,useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

const { width } = Dimensions.get('window');

const features = [
  {
    title: 'Feature 1',
    description: 'Joining Hands To Help Bereaved Families',
  },
  {
    title: 'Feature 2',
    description: 'Fund healthcare for family & people back home',
  },
  {
    title: 'Feature 3',
    description: 'Better World for Every Child',
  },
  {
    title: 'Feature 4',
    description: 'Become a "Patron Saint", and a Sponsor',
  },
  {
    title: 'Feature 5',
    description: 'Help remarkable people achieve their goals',
  },
  {
    title: 'Feature 6',
    description: 'Help and Hope go hand in hand',
  },
];



const Intro = () => {
  const {setUser} = useContext(UserContext)
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation=useNavigation();
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(contentOffsetX / width);
    setCurrentSlide(slideIndex);
  };
const handleLogin=()=>{
    navigation.navigate('Login');
}
const handleSignUp=()=>{
  navigation.navigate('SignUp');
}

useEffect(() => {
  const checkLoggedInUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser); // Parse JSON string to object
        setUser(parsedUser); 
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        );
      } 
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  checkLoggedInUser();
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.carousel}
      >
        {features.map((feature, index) => (
          <View key={index} style={styles.slide}>
            <Image source={require('../../assets/logonobg.png')} style={styles.logo} />
            <Text style={styles.title}>{feature.title}</Text>
            <Text style={styles.description}>{feature.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots to indicate the current slide */}
      <View style={styles.dotsContainer}>
        {features.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Column layout for buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText1}>Create An Account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18B8A8', // Background color as specified
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Text color is white
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white', // Text color is white
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white', // White active dot
  },
  inactiveDot: {
    backgroundColor: 'gray', // Gray inactive dot
  },
  buttonContainer: {
    flexDirection: 'column', // Buttons stacked vertically
    alignItems: 'stretch',
    padding: 20,
    width: '100%', // Full width
  },
  signUpButton: {
    padding: 10,
    backgroundColor: 'white', // White background for Sign Up
    borderRadius: 5,
    borderColor: 'white', // White border
    borderWidth: 1,
    marginBottom: 10,
    color:'black'
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#18B8A8', // Background color for Login
    borderRadius: 5,
    borderColor: 'white', // White border for Login
    borderWidth: 1,
  },
  buttonText: {
    color: 'white', // White text for both buttons
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText1: {
    color: 'black', // White text for both buttons
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Intro;
