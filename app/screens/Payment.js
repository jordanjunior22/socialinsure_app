import { StyleSheet, Text, View,SafeAreaView,Alert,ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';
import NavNoProfile from '../components/NavNoProfile';
import SocialBanner from '../components/SocialBanner';
import StaticInput from '../components/StaticInput';
import BlackButton from '../components/BlackButton';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'

const Payment = () => {
    const route = useRoute();
    const { item, verifMethod, selectedCountry, selectedImage } = route.params;
    const {user} = useContext(UserContext)
    const BACKEND_URL = "http://172.20.10.4:3000/api";
    const SubscriptionFee = item.fees;
    const navigation = useNavigation();
    const feature = item.title;
    const user_id = user._id;
    const country = selectedCountry.label
    const email = user.email;
    const fullName = user.firstName + ' ' + user.lastName;
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const publishableKey ='pk_test_51PGPDcDOkNDlRQgbiw90SlKMERk2TBW2jV4aQoEs0rgDcwNL0f9wN58MHwxyK8dqqJQ73voME0QXox0WTj9gf7rf00sRumEJQN'
    const [paymentID,setPayamentID] = useState('');
    
    const metaData = {
      feature,
      verifMethod,
      country,
      selectedImage,
      user_id,
      fullName,
      email,
      SubscriptionFee
    };
    //console.log(metaData)

    const handleGoBack = () => {
        navigation.navigate('Terms' ,{ item, verifMethod, selectedCountry, selectedImage })
      };


    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${BACKEND_URL}/stripe-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metaData: metaData,
          amount: SubscriptionFee,
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
    }, []);
  
    const openPaymentSheet = async () => {

      const { error } = await presentPaymentSheet();

      if (loading) {
        console.log("Payment sheet is not initialized yet");
        return;
      }

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        setLoading(false);
      } else {
        //Alert.alert('Success', 'Your order is confirmed!');
        try{
          if (selectedImage) {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', {
              uri: selectedImage, 
              name: '_id.jpg', // Example name, can be anything
              type: 'image/jpeg', // Example type, change based on image type
            });
            const response = await axios.post(`${BACKEND_URL}/uploadid`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
              },
            });
            console.log("image response",response.data.url); 
            if (response.data.url) { 
              try{
                const imageUrl = response.data.url;
                const verificationResponse  = await fetch(`${BACKEND_URL}/verification-docs`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    metaData: metaData,
                    payment_id: paymentID,
                    idImageUrl:imageUrl
                }),
                });
                if(verificationResponse.status === 200){
                  setLoading(false);
                  navigation.navigate("SuccessFeedback");
                }else {
                  Alert.alert('API Error', 'No worries this error is from our end contact support.');
                  navigation.navigate("Home");
                  setLoading(false);
                }
              }
              catch(error){
                setLoading(false);
                console.log('Error at saving verification',error)
              }
            }
          }else {
            console.log('error uploading image');
            Alert.alert('API Error', 'No worries this error is from our end contact support.');
            setLoading(false);
          }
        }catch(error){
          console.log("imageupload_error",error)
          setLoading(false);
        }
      }
    };

   

    const handleMyBalance = () =>{
        console.log('handleMyBalance')
      }
    //console.log(paymentID);
    const cardIcon = require('../../assets/creditcard.png')
    const paypalIcon = require('../../assets/paypal.png')
    const iconURL =  require('../../assets/back.png')
  
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
        <View style={{padding:10}}>
        <NavNoProfile Title='Subscription' onPress={handleGoBack} iconURL={iconURL}/>
        <SocialBanner Title={item.title} Content={item.description}/>
        <View style={{marginTop:20}}><StaticInput amount={item.fees}/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'blue',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <Text style={{color:'blue', textAlign:'center'}}>You won't be charged yet</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
            <CustomButton name='Credit/Debit Cart' onPress={openPaymentSheet} disabled={!loading} imageIcon={cardIcon} containerStyle={{justifyContent:''}}/>
            <CustomButton name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/>
            <BlackButton name='Use My Balance' onPress={handleMyBalance}/>
        </View>
        </View>

        {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )}
    </SafeAreaView>
  )
}

export default Payment

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
},
})