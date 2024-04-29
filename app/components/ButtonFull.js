// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Image, View } from 'react-native';

const ButtonFull = ({ name, onPress, imageIcon='', containerStyle}) => {
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
    backgroundColor: '#24FF00',
    flexDirection: 'row',
    borderRadius: 2,
    width:'100%',
    marginBottom:10,
    justifyContent: 'center',
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
    gap: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonFull;