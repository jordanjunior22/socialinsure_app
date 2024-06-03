import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import SocialBanner from '../components/SocialBanner';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import SponsorGrid from '../components/SponsorGrid';
import BottomMargin from '../components/BottomMargin';
import NavNoProfile from '../components/NavNoProfile';

const NoSubReqFeature = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; 
  const handleCampaign = ()=>{
    navigation.navigate('Campaigns');
  }
  const iconURL =  require('../../assets/close.png')

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
      <NavNoProfile Title={item.title} iconURL={iconURL} onPress={()=>{navigation.goBack()}}/>
      <SocialBanner Title={item.title} Content={item.description}/>
      <SubHeadingNoLink heading='DetailS'/>
      <Text style={{color:'#27AE60',fontWeight:700}}>{item.description}</Text>
      <Text style={{opacity:0.5}}>{item.details}</Text>
  
      <View style={styles.info}>
        <TouchableOpacity onPress={handleCampaign} style={{backgroundColor:'#FF5733',padding:10,flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'white',fontWeight:700,fontSize:16}}>Campaigns</Text>
        </TouchableOpacity>
      </View>
      <SponsorGrid/>
      <BottomMargin/>
    </ScrollView>
    </SafeAreaView>
  )
}
//
//
export default NoSubReqFeature

const styles = StyleSheet.create({
  info:{
    flex:1,
    flexDirection:'row',
    marginTop:20,
  }
})