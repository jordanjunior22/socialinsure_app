import { StyleSheet, Text, View,ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useNavigation } from '@react-navigation/native';
import Hero from '../components/Hero';
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';
import ButtonFull from '../components/ButtonFull'

const QuickTopUp = () => {
  const [amount, setAmount] = useState('');

    const navigation = useNavigation();
    const handleContributions = () => {
        navigation.navigate('Contributions')
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
        <Nav onPress={()=>{navigation.navigate('Home')}} Title='Quick Top Up' iconURL={iconURL}/>
        <Hero balance={100.00} 
              onMyContributions={handleContributions}
              />
        <View style={{marginTop:20}}><AmountInput value={amount} onChangeAmount={handleChangeAmount} editable={true}/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'blue',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <Text style={{color:'blue', textAlign:'center'}}>You won't be charged yet</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
            <ButtonFull name='Credit/Debit Cart' onPress={()=>{navigation.navigate('SuccessFeedback')}} imageIcon={cardIcon} containerStyle={{justifyContent:''}}/>
            <ButtonFull name='PayPal' onPress={()=>{navigation.navigate('FailedFeedback')}} imageIcon={paypalIcon} containerStyle={{justifyContent:''}}/>
        </View>
        
    </ScrollView>
    </SafeAreaView>
  )
}

export default QuickTopUp

const styles = StyleSheet.create({})