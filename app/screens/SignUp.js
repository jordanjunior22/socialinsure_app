import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase';
import { BACKEND_URL } from '../../config';

const SignUp = () => {
  const navigation = useNavigation(); // For navigation handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const registerUser = async (email, password, firstName, lastName, phoneNumber, imageUrl, isAWellBeingSubscriber, isVerified, balance, isBlackListed,emailVerified) => {
    setIsLoading(true); // Set loading state to true
    try {
      console.log('Starting user registration'); // Debugging
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      if (user) {
        console.log('Firebase registration successful'); // Debugging
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            isAWellBeingSubscriber,
            isVerified,
            balance,
            isBlackListed,
            emailVerified
          }),
        });
  
        if (response.ok) {
          console.log('Backend registration successful'); // Debugging
          Alert.alert('Verification Email Sent', 'Please check your email to verify your account.');
          setIsLoading(false); // Set loading state to false
          navigation.navigate('Login');
          
          await user.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://social-insure-d86ce.firebaseapp.com',
          });
    
        } else {
          const error = await response.json();
          console.error('Backend error:', error); // Debugging
          Alert.alert('Error', error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error:', error); // Debugging
      Alert.alert('Error', error.message);
      setIsLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? ( // Conditionally render activity indicator
        <ActivityIndicator size="large" color="#18B8A8" /> // Customize as needed
      ) : (
        <>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => registerUser(email, password, firstName, lastName)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('Login')}
          >
            Already have an account? Login
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#18B8A8',
    padding: 10,
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#18B8A8',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default SignUp;
