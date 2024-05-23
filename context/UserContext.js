import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../config';
// Create a Context for user information
export const UserContext = createContext();

// Context Provider component
export function UserContextProvider({ children}) {
  const [user, setUser] = useState(null);


  // Function to log in
  const login = async (email,navigation) => {
    try {
      console.log("email in front",email)
      const response = await axios.get(`${BACKEND_URL}/user/${email}`);
      const userData = response.data;
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigation.navigate("Main");
    } catch (error) {
      console.log('Login Error at User Context:', error.message);
    }
  };

  // Function to log out
  const logout = async (navigation) => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch (error) {
      console.log('Logout Error:', error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout,setUser }}>
      {children}
    </UserContext.Provider>
  );
}
