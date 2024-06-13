import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import SocialBanner from '../components/SocialBanner';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import CustomButton from '../components/Button';
import SponsorGrid from '../components/SponsorGrid';
import BottomMargin from '../components/BottomMargin';
import ButtonFull from '../components/ButtonFull';
import NavNoProfile from '../components/NavNoProfile';

const RemovedMembers = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const handleSubsribe = ()=>{
      console.log("Subscribe Pressed")
      navigation.navigate('Membership',{item});
  }

  const iconURL =  require('../../assets/close.png')

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
      <NavNoProfile Title={item.title} iconURL={iconURL} onPress={()=>{navigation.goBack()}}/>
      <View style={{flexDirection:'column',alignItems:'center'}}>
        <Text style={{marginTop:20,fontSize:11,textAlign:'center'}}>You are no longer a member of the {item.title} community you must pay a penalty fee to become a member again.</Text>
        <ButtonFull name='Learn More' onPress={handleSubsribe}/>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default RemovedMembers

const styles = StyleSheet.create({})

//SubReqFeatureNonMembers