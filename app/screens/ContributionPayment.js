import { StyleSheet, Text, View,ScrollView, SafeAreaView,ActivityIndicator,Alert } from 'react-native'
import React, {useContext, useEffect, useState } from 'react'

import Nav from '../components/Nav'
import { useNavigation, useRoute } from '@react-navigation/native';
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';
import SocialBanner from '../components/SocialBanner'
import BlackButton from '../components/BlackButton';
import ButtonFull from '../components/ButtonFull';
import { UserContext } from '../../context/UserContext';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const ContributionPayment = () => {
    const {user} = useContext(UserContext)
    const [amount, setAmount] = useState(1);
    const [loading, setLoading] = useState(false);
    const route=useRoute();
    const {item} = route.params;
    const BACKEND_URL = "http://172.20.10.4:3000/api";
    const navigation = useNavigation();
    const title = item.title
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const user_id = user._id;
    const email = user.email;
    const fullName = user.firstName + ' ' + user.lastName;
    const [paymentID,setPayamentID] = useState('');

    const handleChangeAmount = (text) => {
      setAmount(text)
    };

    const metaData ={
      title,
      amount,
      user_id,
      email,
      fullName,
    }
    console.log(amount)
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${BACKEND_URL}/stripe-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metaData: metaData,
          amount: Number(amount),
          currency: 'usd', 
      }),
      });
      const { paymentIntent, ephemeralKey, customer,publishableKey,paymentIntentID} = await response.json();
      setPayamentID(paymentIntentID);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
        paymentIntentID,
      };
    }

    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Social Insure",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });

      
      if (!error) {
        setLoading(false);
        
      }
    };

    useEffect(() => {
      initializePaymentSheet();
    }, [amount]);

  
    const openPaymentSheet = async () => {

      const { error } = await presentPaymentSheet();

      if (loading) {
        console.log("Payment sheet is not initialized yet");
        return;
      }
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        setLoading(false);
      }else{
        setLoading(false);
        Alert.alert('Success', 'Your order is confirmed!');
      }

    }


    const handleMyBalance = () => {
        console.log('Handle Balance arithmetics');
    };



    const cardIcon = require('../../assets/creditcard.png')
    const paypalIcon = require('../../assets/paypal.png')
    const iconURL =  require('../../assets/close.png')
    
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
        <Nav onPress={()=>{navigation.navigate('Home')}} Title='Contribute' iconURL={iconURL}/>
        <SocialBanner Title={item.title} />
        <View style={{marginTop:20}}><AmountInput value={amount} onChangeAmount={handleChangeAmount} editable={true}/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'blue',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <Text style={{color:'blue', textAlign:'center'}}>You won't be charged yet</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
            <ButtonFull name='Credit/Debit Cart' onPress={openPaymentSheet} imageIcon={cardIcon} containerStyle={{justifyContent:''}}/>
            <ButtonFull name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/>
            <BlackButton name='Use My Balance' onPress={handleMyBalance}/>
        </View>
        {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )}
    </ScrollView>
    </SafeAreaView>
  )
}

export default ContributionPayment

const styles = StyleSheet.create({})