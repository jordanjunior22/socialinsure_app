import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'
import React from 'react'
import NavNoProfile from './NavNoProfile'
import { useNavigation, useRoute } from '@react-navigation/native'
import ProgressBar from 'react-native-progress/Bar'
import ButtonFull from './ButtonFull'
const CampaignSponsorDetailsContainer = () => {

  const route=useRoute();
  const {item} = route.params;
  const progress = item.raised / item.goal;

  const navigation = useNavigation();
    const iconURL = require('../../assets/close.png')
    const handleBack = (item)=>{
      if(item.isSponsored){
        navigation.navigate('AllFeatures')
      }
      else{
        navigation.navigate('Campaigns')
      }

    }
    const handleContribute = (item) =>{
      console.log(`handel contribute of ID ${item.id}`)
      navigation.navigate('ContributionPayment', {item})
    }
  return (
    <SafeAreaView style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
      <View style={{padding:10}}>
        <NavNoProfile Title='Campaign Details' iconURL={iconURL} onPress={()=>handleBack(item)}/>
        <View style={{height:200,width:'100%'}}>
          <Image source={item.imageSource} style={{width:'100%', height:'100%'}}/>
        </View>
        <Text style={{fontWeight:700, backgroundColor:'#18B8A8',color:'white',padding:10,borderBottomRightRadius: 10,borderBottomLeftRadius: 10,}}>{item.title}</Text>
        <Text style={{fontSize:10}}>{item.details}</Text>
      </View>

      <View style={{padding:10}}>
        <ProgressBar progress={progress} width={340} height={6} />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Text>{item.date}</Text>
            <Text>Goal</Text>
            <Text style={{color:'#AB2525',fontWeight:700}}>${item.goal}</Text>
          </View>
          <View>
            <Text style={{textAlign:'right',color:'blue',fontWeight:700}}>{item.daysLeft} days left</Text>
            <Text style={{textAlign:'right'}}>Raised</Text>
            <Text style={{textAlign:'right',color:'#24FF00',fontWeight:700}}>${item.raised}</Text>
          </View>
        </View>
        <View style={{flexDirection:'column', alignItems:'center',marginTop:10}}>
        <ButtonFull name='Contribute' onPress={()=>{handleContribute(item)}}/>
        </View>
      </View>
    </SafeAreaView>

  )
}

export default CampaignSponsorDetailsContainer

const styles = StyleSheet.create({})