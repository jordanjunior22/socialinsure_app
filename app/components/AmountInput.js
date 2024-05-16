import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const AmountInput = ({ amount, onChangeAmount, editable }) => {

  const handleAmountChange = (text) => {
    // Filter out non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, '');
    // Call the parent onChangeAmount function with the cleaned text
    onChangeAmount(cleanedText);
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#18B8A8', overflow: 'hidden' }}>
      <Text style={{ padding: 10, backgroundColor: '#18B8A8', fontWeight: 700, color: 'white' }}>Amount $</Text>
      <TextInput
        style={styles.input}
        placeholder="500"
        value={amount}
        onChangeText={handleAmountChange} // Use the handleAmountChange function
        editable={editable}
        keyboardType="numeric" // Set keyboardType to numeric for better input experience on mobile devices
      />
    </View>
  )
}

export default AmountInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
  },
});
