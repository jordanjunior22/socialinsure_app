import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavNoProfile from '../components/NavNoProfile';
import ButtonFull from '../components/ButtonFull';

const PaymentSettings = () => {
  const navigation = useNavigation();
  const [cardDetails, setCardDetails] = useState([
    {
      name: 'John Doe',
      number: '4542 4545 5654 4125',
      expiry: '02/27',
      cvc: '142',
    },

  ]);

  const iconURL = require('../../assets/back.png');

  const handleBack = () => {
    navigation.navigate('Account');
  };
  const deleteCard = () =>{
    
  }
  const handleAddCard = () => {
    navigation.navigate('CardDetails');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        <NavNoProfile Title="Payment Settings" iconURL={iconURL} onPress={handleBack} />
        
        {cardDetails.length > 0 ? (
          cardDetails.map((card, index) => (
            <View key={index} style={styles.cardContainer}>
              <View>
                <Text style={styles.cardText}>{card.name}</Text>
                <Text style={styles.cardText}>{card.number}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',gap:10, marginTop: 30 }}>
                  <Text style={styles.cardText}>Expiry: {card.expiry}</Text>
                  <Text style={styles.cardText}>CVC: {card.cvc}</Text>
                </View>
                <TouchableOpacity style={styles.removeCardButton} onPress={deleteCard}>
                  <Text style={{ color: '#AB2525' }}>Remove Card</Text>
                </TouchableOpacity>
              </View>
              <Image source={require('../../assets/logonobg.png')} style={styles.iconimage} />
            </View>
          ))
        ) : (
          <View style={styles.addCardContainer}>
            <Text>ADD CARD FOR AUTOMATIC PAYMENTS</Text>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <ButtonFull name="Add Card" onPress={handleAddCard} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconimage: {
    width: 50,
    height: 80,
    tintColor: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#AB2525',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  cardText: {
    color: 'white',
  },
  removeCardButton: {
    backgroundColor: 'white',
    width: 100,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  addCardContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentSettings;
