import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const Penalty = () => {
    const navigation =useNavigation();
    const iconUrl = require('../../assets/back.png');
    const goBack = () =>{
        navigation.navigate('Account')
    }
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
      <NavNoProfile Title='Re-Subcription'  iconURL={iconUrl} onPress={goBack}/>
      <Text style={{textAlign:'center',backgroundColor:'#AB2525',color:'white'}}>Fees To Be Paid</Text>
    </SafeAreaView>
  )
}

export default Penalty

const styles = StyleSheet.create({})