import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import SocialBanner from '../components/SocialBanner';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import CustomButton from '../components/Button';
import SponsorGrid from '../components/SponsorGrid';
import BottomMargin from '../components/BottomMargin';
import NavNoProfile from '../components/NavNoProfile';
const SubReqFeatureContainer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; 
  const handleSubsribe = ()=>{
      console.log("Subscribe Pressed")
      navigation.navigate('Verification',{item});
  }
  const iconURL =  require('../../assets/close.png')

  return (
    <ScrollView style={{flex:1,padding:10}}>
      <NavNoProfile Title={item.title} iconURL={iconURL} onPress={()=>{navigation.navigate('AllFeatures')}}/>
      <SocialBanner Title={item.title} Content={item.description}/>
      <SubHeadingNoLink heading='Details'/>
      <Text style={{color:'#AB2525',fontWeight:700}}>{item.description}</Text>
      <Text style={{opacity:0.5}}>{item.details}</Text>
      <Text style={{marginTop:20,color:'blue',fontSize:11,textAlign:'center'}}>In other to become a member of the {item.title} community you must pay a  subscription fee and accept the terms and  conditions of this service.</Text>
      
      <View style={{marginTop:20,flexDirection:'column',alignItems:'center'}}>
        <CustomButton name='Subscibe' containerStyle='' onPress={handleSubsribe}/>
      </View>
      <SponsorGrid/>
      <BottomMargin/>
    </ScrollView>
  )
}

export default SubReqFeatureContainer

const styles = StyleSheet.create({})

//SubReqFeatureNonMembers