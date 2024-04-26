import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Checkbox = ({ isChecked, onToggle, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={styles.checkbox}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 14,
    height: 14,
    backgroundColor: '#AB2525',
  },
  label: {
    marginLeft: 8,
    color:'#AB2525'
  },
});

export default Checkbox;
