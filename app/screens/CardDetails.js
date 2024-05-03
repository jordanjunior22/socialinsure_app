import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import ButtonFull from '../components/ButtonFull';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavNoProfile from '../components/NavNoProfile';
import { useNavigation } from '@react-navigation/native';

// Function to validate card number using the Luhn Algorithm
const isValidCardNumber = (number) => {
  const cleaned = number.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

// Function to validate the CVV
const isValidCVV = (cvv) => {
  const cleaned = cvv.replace(/\D/g, '');
  return cleaned.length === 3 || cleaned.length === 4;
};

// Function to format the expiry date to MM/YY
const formatExpiryDate = (text) => {
  let cleanedText = text.replace(/[^0-9]/g, '');
  if (cleanedText.length > 2) {
    cleanedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`;
  }
  return cleanedText.slice(0, 5);
};

// Function to validate the expiry date
const isValidExpiryDate = (text) => {
  const [monthStr, yearStr] = text.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(month) || month < 1 || month > 12) {
    return false;
  }

  const currentYear = new Date().getFullYear() % 100;
  if (isNaN(year) || year < currentYear || year > currentYear + 10) {
    return false;
  }

  return true;
};

const CardDetails = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();

  const onSubmit = (data) => {
    if (!data.cardHolderName) {
      Alert.alert('Invalid Card Holder Name', 'Please enter the card holder\'s name.');
      return;
    }

    if (!isValidCardNumber(data.cardNumber)) {
      Alert.alert('Invalid Card Number', 'Please enter a valid credit card number.');
      return;
    }

    if (!isValidExpiryDate(data.expiryDate)) {
      Alert.alert('Invalid Expiry Date', 'Please enter a valid expiry date (MM/YY).');
      return;
    }

    if (!isValidCVV(data.cvv)) {
      Alert.alert('Invalid CVV', 'CVV must be 3 or 4 digits.');
      return;
    }

    Alert.alert('Card Details', `Card Saved: ${JSON.stringify(data)}`);
  };

  const goBack = () => {
    navigation.navigate('PaymentSettings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavNoProfile Title='Add Card' iconURL={require('../../assets/back.png')} onPress={goBack} />
      <Text style={styles.title}>Enter Card Details</Text>

      {/* Card Holder Name */}
      <Controller
        control={control}
        name="cardHolderName"
        rules={{ required: 'Card holder name is required' }}
        render={({ field }) => (
          <TextInput
            style={[styles.input, errors.cardHolderName && styles.error]}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Card Holder Name"
          />
        )}
      />
      {errors.cardHolderName && <Text style={styles.errorText}>{errors.cardHolderName.message}</Text>}

      {/* Card Number */}
      <Controller
        control={control}
        name="cardNumber"
        rules={{ required: 'Card number is required' }}
        render={({ field }) => (
          <TextInput
            style={[styles.input, errors.cardNumber && styles.error]}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Card Number"
            keyboardType="numeric"
            maxLength={16}
          />
        )}
      />
      {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber.message}</Text>}

      {/* Expiry Date (MM/YY) */}
      <Controller
        control={control}
        name="expiryDate"
        rules={{ required: 'Expiry date is required' }}
        render={({ field }) => (
          <TextInput
            style={[styles.input, errors.expiryDate && styles.error]}
            onBlur={field.onBlur}
            onChangeText={(text) => field.onChange(formatExpiryDate(text))}
            value={field.value}
            placeholder="MM/YY"
            keyboardType="numeric"
            maxLength={5}
          />
        )}
      />
      {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate.message}</Text>}

      {/* CVV */}
      <Controller
        control={control}
        name="cvv"
        rules={{ required: 'CVV is required' }}
        render={({ field }) => (
          <TextInput
            style={[styles.input, errors.cvv && styles.error]}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="CVV"
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
          />
        )}
      />
      {errors.cvv && <Text style={styles.errorText}>{errors.cvv.message}</Text>}

      {/* Submit Button */}
      <ButtonFull name="Save Card" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default CardDetails;
