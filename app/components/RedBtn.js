// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Image, View } from 'react-native';

const RedBtn = ({ name, onPress, imageIcon='', containerStyle}) => {
  return (

    <TouchableOpacity style={styles.button} onPress={onPress} >
      
      <View style={[styles.innerContainer, containerStyle]}>
        {imageIcon && <Image source={imageIcon} style={styles.image} />} 
        <Text style={[styles.buttonText,{fontWeight:700}]}>{name}</Text>
      </View>

    </TouchableOpacity>


  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 2,
    width : '90%',
    marginBottom:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image:{
    width:20,
    height:20
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
});

export default RedBtn;
