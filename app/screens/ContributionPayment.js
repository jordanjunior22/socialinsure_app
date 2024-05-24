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
import { BACKEND_URL } from '../../config';

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
      paymentId: 'PaidWithBalance'
    }
    const updateParams = {
      amount : amount,
      campaign_id : campaign_id,
    }

    //console.log(amount)
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
      if(amount>0){
        initializePaymentSheet();
      }
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
        setLoading(true);
        try{
          const Contributionresponse = await fetch(`${BACKEND_URL}/contributions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ContributionData),
          });
          if(Contributionresponse.status === 201){
            try{
              const CampaignUpdateResponse = await fetch(`${BACKEND_URL}/campaign/${user_id}/update`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateParams),
              });
              console.log(CampaignUpdateResponse);
              if(CampaignUpdateResponse){
                setLoading(false);
                Alert.alert('Success', 'Your Contribution was recieved');
                navigation.navigate('Contributions');
              }

            }catch(error){
              console.error("error",error);
              Alert.alert(`Error code: ${error.code}`, error.message);
              setLoading(false);
            }

          }
        }catch(error){
          console.error("error",error);
          Alert.alert(`Error code: ${error.code}`, error.message);
          setLoading(false);
        }
        
      }

    }


    const handleMyBalance = async () => {
      setLoading(true);
        if(amount<balance){
          try{
            const Contributionresponse = await fetch(`${BACKEND_URL}/contributions_handlebalance`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ContributionDataHandleBalance),
            });
            if(Contributionresponse.status === 201){
              try{
                const CampaignUpdateResponse = await fetch(`${BACKEND_URL}/campaign/${user_id}/update`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updateParams),
                });
                console.log(CampaignUpdateResponse);
                if(CampaignUpdateResponse){
                  setLoading(false);
                  Alert.alert('Success', 'Your Contribution was recieved');
                  navigation.navigate('Intro');
                }
  
              }catch(error){
                console.error("error",error);
                Alert.alert(`Error code: ${error.code}`, error.message);
                setLoading(false);
              }
  
            }
          }catch(error){
            console.error("error",error);
            Alert.alert(`Error code: ${error.code}`, error.message);
            setLoading(false);
          }
        }else{
          Alert.alert("Payment Failed","You have insufficient funds")
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
        <View style={{marginTop:20}}><AmountInput value={amount} onChangeAmount={handleChangeAmount} editable={true}/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'blue',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <Text style={{color:'blue', textAlign:'center'}}>You won't be charged yet</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
            <ButtonFull name='Credit/Debit Cart' onPress={openPaymentSheet} imageIcon={cardIcon} containerStyle={{justifyContent:''}}/>
            {/* <ButtonFull name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/> */}
            <BlackButton name='Use My Balance' onPress={handleMyBalance}/>
        </View>

    </ScrollView>
    {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )}
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