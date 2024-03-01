import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, buttonText}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.todoButton}>
      <Text>{buttonText}</Text>
      <Image source={require('../../assets/arrow-right.png')} style={styles.iconimage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    todoButton:{
        borderWidth: 2, borderColor: 'lightgray', borderStyle: 'solid',
        padding:10,
        width:100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'lightgray',
        borderRadius: 20,
       },
       iconimage: {
        width: 30,
        height: 30,
       }
});

export default CustomButton;
