import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import Nav from '../components/Nav'
import { useNavigation } from '@react-navigation/native';
import Hero from '../components/Hero';
import AmountInput from '../components/AmountInput';
import CustomButton from '../components/Button';

const QuickTopUp = () => {
    const navigation = useNavigation();
    const handleContributions = () => {
        console.log('Button pressed');
      };
      const onPress = () =>{
        console.log('button press')
      }
    const cardIcon = require('../../assets/creditcard.png')
    const paypalIcon = require('../../assets/paypal.png')
  return (
    <ScrollView style={{flex:1,padding:10}}>
        <Nav onPress={()=>{navigation.navigate('Home')}} Title='Quick Top Up' name="<Back"/>
        <Hero balance={100.00} 
              onMyContributions={handleContributions}
              />
        <View style={{marginTop:20}}><AmountInput/></View>
        <View style={{width:'100%',height:1,backgroundColor:'lightgray',marginTop:20}}></View>
        <Text style={{textAlign:'center',color:'#24FF00',fontWeight:700,marginTop:10}}>Choose Payment Method</Text>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:10}}>
            <CustomButton name='Credit/Debit Cart' onPress={onPress} imageIcon={cardIcon}/>
            <CustomButton name='Credit/Debit Cart' onPress={onPress} imageIcon={paypalIcon}/>
        </View>
    </ScrollView>
  )
}

export default QuickTopUp

const styles = StyleSheet.create({})