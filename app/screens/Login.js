import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase';

const Login = () => {
  const navigation = useNavigation(); // For navigation handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track if login is in progress

  const loginUser = async (email, password) => {
    setIsLoading(true); // Start loading indicator
    try {
      const credentials = await firebase.auth().signInWithEmailAndPassword(email, password);
      if(credentials.user.emailVerified){
        return
      }else{
        Alert.alert("This User is not verified.Please check your email to verify your account.");
      }

    } catch (error) {
      Alert.alert("Login failed", error.message);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => loginUser(email, password)}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <ActivityIndicator color="white" /> // Show activity indicator while loading
        ) : (
          <Text style={styles.buttonText}>Login</Text> // Show "Login" text otherwise
        )}
      </TouchableOpacity>

      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account? Sign up
      </Text>
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
  loginButton: {
    backgroundColor: '#18B8A8', // Call-to-action color
    padding: 10,
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#18B8A8',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default Login;
