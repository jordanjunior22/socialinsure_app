import { StyleSheet, Text, View,ScrollView, SafeAreaView,ActivityIndicator,Alert } from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import Nav from '../components/Nav'
import { useNavigation,CommonActions } from '@react-navigation/native';
import Hero from '../components/Hero';
import AmountInput from '../components/AmountInput';
import ButtonFull from '../components/ButtonFull'
import { UserContext } from '../../context/UserContext';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { BACKEND_URL } from '../../config';

const QuickTopUp = () => {
  const [amount, setAmount] = useState(0);
  const {user} = useContext(UserContext)
  const [paymentID,setPayamentID] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const balance = amount;
  const [loading, setLoading] = useState(false); 

  console.log(amount)
  const user_id = user._id;
  const email = user.email;
  const fullName = user.firstName + ' ' + user.lastName;
  const navigation = useNavigation();
  const details ='Quick Top Up'

    const metaData ={
      details,
      amount,
      user_id,
      email,
      fullName,
    }
    const updateParams = {
      balance: amount
    };
    //console.log(updateParams);
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${BACKEND_URL}/top-up-payment`, {
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
        setLoading(true);
      }
    };


  
    const openPaymentSheet = async () => {

      const { error } = await presentPaymentSheet();
      setLoading(false);
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        console.log(error);
      }else{
        try{
          const response = await fetch(`${BACKEND_URL}/user/${user._id}/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateParams),
          });
          
          if(response.status === 200){
            //Alert.alert('Success', 'You have successfully Top-Up Your account');
            navigation.navigate('SuccessFeedback');
            setLoading(true);
          }else{
            Alert.alert('Balance Error','An error occured updating your balance. Contact Support');
            setLoading(true);
          }
  
        }catch (error) {
          console.error('Error updating user:', error);
        }

      }

    }
    useEffect(() => {
        if(amount){
          initializePaymentSheet();
        }
    }, [amount]);

    const handleContributions = () => {
        navigation.navigate('Contributions')
      };
    const handleChangeAmount = (text) => {
        setAmount(text)
      };
    const cardIcon = require('../../assets/creditcard.png')
    const paypalIcon = require('../../assets/paypal.png')
    const iconURL =  require('../../assets/close.png')
    //console.log(loading);


  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
        <Nav onPress={()=>{navigation.navigate('Home')}} Title='Quick Top Up' iconURL={iconURL}/>
        <Hero balance={100.00} 
              onMyContributions={handleContributions}
              />
        <View style={{marginTop:20}}><AmountInput value={amount} onChangeAmount={handleChangeAmount} editable={true}/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'blue',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <Text style={{color:'blue', textAlign:'center'}}>You won't be charged yet</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
        <ButtonFull 
          name='Credit/Debit Cart'
          onPress={openPaymentSheet} 
          imageIcon={cardIcon} 
          containerStyle={{justifyContent:''}}
          disabled={!loading}
          
        />           
        {/* <ButtonFull name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/> */}
        </View>
        
    </ScrollView>

    </SafeAreaView>
  )
}

export default QuickTopUp

const styles = StyleSheet.create({})