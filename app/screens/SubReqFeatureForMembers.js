import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import SocialBanner from '../components/SocialBanner';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import SponsorGrid from '../components/SponsorGrid';
import BottomMargin from '../components/BottomMargin';
import NavNoProfile from '../components/NavNoProfile';
import { BACKEND_URL } from '../../config';
import { UserContext } from '../../context/UserContext';

const SubReqFeatureForMembers = () => {
  const {user} = useContext(UserContext)
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; 
  const handleCampaign = ()=>{
    navigation.navigate("Membership")
  }
  const iconURL =  require('../../assets/close.png')
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const userId = user?._id;


  const fetchWellBeingSubscribers = async () => {

    try {
      if(userId && item._id){
        const response = await fetch(`${BACKEND_URL}/well-being-subscribers`);
        if (!response.ok) {
          throw new Error('Failed to fetch well-being subscribers');
        }
        const data = await response.json();
        setTotalMembers(data.totalWellBeingSubscribers);
      }

    } catch (error) {
      //console.error('Error fetching well-being subscribers:', error.message);
    }
  };

  // Function to fetch sum of contributions for a specific feature_id
  const fetchSumContributions = async (featureId) => {
    try {
      if(userId){
        const response = await fetch(`${BACKEND_URL}/sum-contributions/${featureId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sum of contributions');
        }
        const data = await response.json();
        setTotalContributions(data.totalAmount);
        
      }
    } catch (error) {
      //console.error('Error fetching sum of contributions:', error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchWellBeingSubscribers();
    fetchSumContributions(item._id)
  },[])

  // console.log('Total Members : ',totalMembers)
  // console.log('TOtal Contribution : ',totalContributions)

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
      <NavNoProfile Title={item.title} iconURL={iconURL} onPress={()=>{navigation.goBack()}}/>
      <SocialBanner Title={item.title} Content={item.description}/>
      <SubHeadingNoLink heading='Details'/>
      <Text style={{color:'#AB2525',fontWeight:700}}>{item.description}</Text>
      <Text style={{opacity:0.5}}>{item.details}</Text>
  
      <View style={styles.info}>
        <View style={{padding:5,flexDirection:'column',alignItems:'center',borderWidth:1,borderColor:'lightgray'}}>
          <Text style={{fontSize:16,fontWeight:700}}>{totalMembers}</Text>
          <Text style={{color:'gray'}}>MEMBERS</Text>
        </View>
        <View style={{padding:5,flexDirection:'column',alignItems:'center',borderWidth:1,borderColor:'lightgray'}}>
          <Text style={{fontSize:16,fontWeight:700}}>${totalContributions}</Text>
          <Text style={{color:'gray'}}>CONTRIBUTIONS</Text>
        </View>
        <TouchableOpacity onPress={handleCampaign} style={{backgroundColor:'#24FF00',padding:5,flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'lightgray'}}>
          <Text style={{color:'white',fontWeight:700,fontSize:16}}>Membership</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop:20,color:'blue',fontSize:11,textAlign:'center'}}>If you wish to unsubscribe to this service, you must contact support.</Text>
      <SponsorGrid/>
      <BottomMargin/>
    </ScrollView>
    </SafeAreaView>
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