import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const CustomButton = ({ name, onPress, imageIcon = '', containerStyle, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.innerContainer, containerStyle]}>
        {imageIcon && <Image source={imageIcon} style={styles.image} />}
        <Text style={[styles.buttonText, { fontWeight: 700 }]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5733',
    flexDirection: 'row',
    borderRadius: 2,
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Change color to represent disabled state
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 20,
    height: 20,
  },
  innerContainer: {
    gap: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomButton;
