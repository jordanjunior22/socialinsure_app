import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';
import NavNoProfile from '../components/NavNoProfile';
import SocialBanner from '../components/SocialBanner';
import StaticInput from '../components/StaticInput';
import BlackButton from '../components/BlackButton';

const Payment = () => {
    const route = useRoute();
    const { item, verifMethod, selectedCountry, selectedImage } = route.params;

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.navigate('Terms' ,{ item, verifMethod, selectedCountry, selectedImage })
      };

    const handleMyBalance = () =>{
        console.log('handleMyBalance')
      }

    const cardIcon = require('../../assets/creditcard.png')
    const paypalIcon = require('../../assets/paypal.png')
    const iconURL =  require('../../assets/back.png')
    
  return (
    <ScrollView style={{flex:1,padding:10}}>

        <NavNoProfile Title='Subscription' onPress={handleGoBack} iconURL={iconURL}/>
        <SocialBanner Title={item.title} Content={item.description}/>
        <View style={{marginTop:20}}><StaticInput amount={item.fees}/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'blue',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <Text style={{color:'blue', textAlign:'center'}}>You won't be charged yet</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
            <CustomButton name='Credit/Debit Cart' onPress={()=>{navigation.navigate('SuccessFeedback')}} imageIcon={cardIcon} containerStyle={{justifyContent:''}}/>
            <CustomButton name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/>
            <BlackButton name='Use My Balance' onPress={handleMyBalance}/>
        </View>
        
    </ScrollView>
  )
}

export default Payment

const styles = StyleSheet.create({})