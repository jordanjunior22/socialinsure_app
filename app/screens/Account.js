import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavNoProfile from '../components/NavNoProfile'
import AccountButtons from '../components/AccountButtons'
import BottomMargin from '../components/BottomMargin'

const Account = () => {
  const iconURL = require('../../assets/back.png')
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{padding:10}}>
        <NavNoProfile Title='Account' iconURL={iconURL}/>
        
        <BottomMargin/>
        <View style={{flexDirection:'column', gap:5}}>
          <AccountButtons name='Profile'/>
          <AccountButtons name='Payments'/>
          <AccountButtons name='Badges'/>
          <AccountButtons name='Membership'/>
          <AccountButtons name='Notifications'/>
          <AccountButtons name='Social Insure Community'/>
          <AccountButtons name='Social Insure Support'/>
          <AccountButtons name='App Settings'/>
          <AccountButtons name='About'/>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({})