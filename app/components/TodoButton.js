import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";


const CustomButton = ({ onPress, buttonText}) => {
  return (
    <LinearGradient
    colors={['#AB2525', '#C9FFFA']} // Your gradient colors
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.gradientBorder}
  >
    <TouchableOpacity onPress={onPress} style={styles.todoButton}>
      <Text>{buttonText}</Text>
      <Image source={require('../../assets/front.png')} style={styles.iconimage} />
    </TouchableOpacity>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    todoButton:{
        padding:10,
        width:100,
        height:100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 20,

       },
       iconimage: {
        width: 20,
        height: 20,

       },
       gradientBorder: {
        borderRadius: 20, // Ensure rounded corners
        padding: 1, // Border thickness
      },
});

export default CustomButton;
