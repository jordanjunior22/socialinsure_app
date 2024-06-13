import { StyleSheet, Text, View,ScrollView, SafeAreaView,ActivityIndicator,Alert } from 'react-native'
import React, {useContext, useEffect, useState } from 'react'

import Nav from '../components/Nav'
import { useNavigation, useRoute } from '@react-navigation/native';
import StaticInput from '../components/StaticInput'
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';
import SocialBanner from '../components/SocialBanner'
import BlackButton from '../components/BlackButton';
import ButtonFull from '../components/ButtonFull';
import { UserContext } from '../../context/UserContext';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { BACKEND_URL } from '../../config';
import uuid from 'react-native-uuid';


const ContributionPayment = () => {
    const {user} = useContext(UserContext)
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const route=useRoute();
    const {item} = route.params;
    const navigation = useNavigation();
    const title = item.title
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const user_id = user._id;
    const email = user.email;
    const campaign_id = item._id;
    const fullName = user.firstName + ' ' + user.lastName;
    const [paymentID,setPayamentID] = useState('');
    const balance = user?.balance;
    const fees_per_person = item.fees;
    const uuidString = uuid.v4();
    console.log("item at checkout",item)
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
    const ContributionData = {
      campaign_id: campaign_id,
      campaign_title: title,
      user_id : user_id,
      fullName : fullName,
      amount : amount,
      email : email,
      paymentId: paymentID
    }
    const ContributionDataHandleBalance = {
      campaign_id: campaign_id,
      campaign_title: title,
      user_id : user_id,
      fullName : fullName,
      amount : amount,
      email : email,
      paymentId: `PWB_${uuidString.substr(0, 26)}`
    }
    const updateParams = {
      amount : amount,
      campaign_id : campaign_id,
    }

    //console.log(amount)
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${BACKEND_URL}/constribution-stripe-payment`, {
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

    useEffect(() => {
      if(item.feature_id === '664c9a60ff37a060cd82674f' ){
        setAmount(fees_per_person);
      }
      if(amount){
        initializePaymentSheet();
      }
    }, [amount,fees_per_person,item.feature_id]);
  
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
      setLoading(false);
      if (error) {
        Alert.alert('Error', error);
        console.error("error occured",error)
      }else{
        try{
          const Contributionresponse = await fetch(`${BACKEND_URL}/contributions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ContributionData),
          });
          if(Contributionresponse.status === 201){
            setLoading(true);
            //Alert.alert('Success', 'Your Contribution was recieved');
            navigation.navigate('SuccessFeedback');

            }
        }catch(error){
          console.error("error",error);
          Alert.alert(`Error code: ${error.code}`, error.message);
          setLoading(true);
        }
        
      }

    }


    const handleMyBalance = async () => {
      setLoading(false);
        if(amount>0 && amount<=balance){
          try{
            const Contributionresponse = await fetch(`${BACKEND_URL}/contributions_handlebalance`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ContributionDataHandleBalance),
            });
            if(Contributionresponse.status === 201){
              setLoading(true);
              //Alert.alert('Success', 'Your Contribution was recieved');
              navigation.navigate('SuccessFeedback');
            }
          }catch(error){
            console.error("error",error);
            Alert.alert(`Error code: ${error.code}`, error.message);
            setLoading(true);
          }
        }else if(amount<=0){
            Alert.alert("Payment Failed","You have not input an amount")
            setLoading(true);
        }else{
          Alert.alert("Payment Failed","You have insufficient funds")
          setLoading(true);
        }
        
    };



    const cardIcon = require('../../assets/creditcard.png')
    const paypalIcon = require('../../assets/paypal.png')
    const iconURL =  require('../../assets/close.png')
    
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
        <Nav onPress={()=>{navigation.navigate('Home')}} Title='Contribute' iconURL={iconURL}/>
        <SocialBanner Title={item.title} />
        <View style={{marginTop:20}}>
          {item.feature_id === '664c9a60ff37a060cd82674f' ? (
              <StaticInput amount={fees_per_person}/> 
          ) : (
              <AmountInput value={amount} onChangeAmount={handleChangeAmount} editable={true} />
          )}
        </View>
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
            <BlackButton name='Use My Balance' onPress={handleMyBalance}/>
        </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default ContributionPayment


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
},
})