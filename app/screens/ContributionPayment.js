import { StyleSheet, Text, View,ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useNavigation, useRoute } from '@react-navigation/native';
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';
import SocialBanner from '../components/SocialBanner'
import BlackButton from '../components/BlackButton';
import ButtonFull from '../components/ButtonFull';

const ContributionPayment = () => {
  const [amount, setAmount] = useState('');
    const route=useRoute();
    const {item} = route.params;

    const navigation = useNavigation();
    const handleMyBalance = () => {
        console.log('Handle Balance arithmetics');
      };
      const handleChangeAmount = (text) => {
        setAmount(text)
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
            <ButtonFull name='Credit/Debit Cart' onPress={()=>{navigation.navigate('SuccessFeedback')}} imageIcon={cardIcon} containerStyle={{justifyContent:''}}/>
            <ButtonFull name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/>
            <BlackButton name='Use My Balance' onPress={handleMyBalance}/>
        </View>
        
    </ScrollView>
    </SafeAreaView>
  )
}

export default ContributionPayment

const styles = StyleSheet.create({})