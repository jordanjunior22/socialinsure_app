import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'
import React from 'react'
import NavNoProfile from './NavNoProfile'
import { useNavigation, useRoute } from '@react-navigation/native'
import ProgressBar from 'react-native-progress/Bar'
import ButtonFull from './ButtonFull'
import Button from '../components/Button';

const CampaignSponsorDetailsContainer = () => {

  const route=useRoute();
  const {item,isAWellBeingSubscriber} = route.params;
  const progress = item.raised / item.goal;
  //console.log("item here",item)
  //console.log("payment_",item?.paymentId) 
  const navigation = useNavigation();
    const iconURL = require('../../assets/close.png')
    const handleBack = ()=>{
      navigation.goBack()
    }
    const handleContribute = () =>{
      navigation.navigate('ContributionPayment', {item})
    }
  return (
    <SafeAreaView style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
      <View style={{padding:10}}>
        <NavNoProfile Title='Campaign Details' iconURL={iconURL} onPress={()=>handleBack(item)}/>
        <View style={{height:200,width:'100%'}}>
        {typeof item.imageSource === 'string' ? (
            <Image source={{ uri: item.imageSource }} style={{width:'100%', height:'100%'}} />
          ) : ''}
          
        </View>
        <Text style={{fontWeight:700, backgroundColor:'black',color:'white',padding:10,borderBottomRightRadius: 10,borderBottomLeftRadius: 10,}}>{item.title}</Text>
        <Text style={{fontSize:10}}>{item.details}</Text>
      </View>

      <View style={{padding:10}}>
        <ProgressBar progress={progress} width={340} height={6} />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Text>{item.date}</Text>
            <Text>Goal</Text>
            <Text style={{color:'black',fontWeight:700}}>${item.goal}</Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 10,backgroundColor:'darkred',padding:3,borderRadius:5,marginTop:5}}>{item.daysLeft} days left</Text>
            <Text style={{textAlign:'right'}}>Raised</Text>
            <Text style={{textAlign:'right',color:'#27AE60',fontWeight:700}}>${item.raised}</Text>
          </View>
        </View>
        <View style={{flexDirection:'column', alignItems:'center',marginTop:10}}>
        {item.subReq === 'Yes' && isAWellBeingSubscriber && item.paymentId !== ''? (
        <ButtonFull name="Contributed" disabled={true} />
        ) : item.subReq === 'Yes' && !isAWellBeingSubscriber ? (
          <ButtonFull name="Members Only" disabled={true} />
        ) : (
        <ButtonFull name="Contribute" onPress={handleContribute} />
        )}
        </View>
      </View>
    </SafeAreaView>

  )
}

export default CampaignSponsorDetailsContainer

const styles = StyleSheet.create({})