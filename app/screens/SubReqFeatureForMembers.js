import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import SocialBanner from '../components/SocialBanner';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import SponsorGrid from '../components/SponsorGrid';
import BottomMargin from '../components/BottomMargin';
import NavNoProfile from '../components/NavNoProfile';
import CustomButton from '../components/Button';

const SubReqFeatureForMembers = () => {
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
  
      <View style={styles.info}>
        <View style={{padding:5,flexDirection:'column',alignItems:'center',borderWidth:1,borderColor:'lightgray'}}>
          <Text style={{fontSize:16,fontWeight:700}}>{item.members}</Text>
          <Text style={{color:'gray'}}>MEMBERS</Text>
        </View>
        <View style={{padding:5,flexDirection:'column',alignItems:'center',borderWidth:1,borderColor:'lightgray'}}>
          <Text style={{fontSize:16,fontWeight:700}}>${item.contributions}</Text>
          <Text style={{color:'gray'}}>CONTRIBUTIONS</Text>
        </View>
        <TouchableOpacity style={{backgroundColor:'#24FF00',padding:5,flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'lightgray'}}>
          <Text style={{color:'white',fontWeight:700,fontSize:16}}>Campaigns</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop:20,color:'blue',fontSize:11,textAlign:'center'}}>If you wish to unsubscribe to this service, you must contact support.</Text>
      <SponsorGrid/>
      <BottomMargin/>
    </ScrollView>
  )
}
//
//
export default SubReqFeatureForMembers

const styles = StyleSheet.create({
  info:{
    flex:1,
    flexDirection:'row',
    gap:10,
    marginTop:20
  }
})