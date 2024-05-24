import { StyleSheet, Text, View,SafeAreaView,Image,Linking } from 'react-native'
import React from 'react'
import NavNoProfile from './NavNoProfile'
import { useNavigation, useRoute } from '@react-navigation/native'

import ButtonFull from './ButtonFull'


const Sponsored = () => {

  const route=useRoute();
  const {item} = route.params;

  const navigation = useNavigation();
    const iconURL = require('../../assets/close.png')
    const handleBack = (item)=>{
      // if(item.isSponsored){
      //   navigation.navigate('AllFeatures')
      // }
      // else{
      //   navigation.navigate('Campaigns')
      // }
      navigation.goBack();

    }
    const handleLearnMore = (item) => {
        const websiteURL = item.website;
        // Ensure the URL has the correct scheme
        const validURL = websiteURL.startsWith('http://') || websiteURL.startsWith('https://') 
          ? websiteURL 
          : `http://${websiteURL}`;
    
        Linking.openURL(validURL).catch(err => console.error("Couldn't load page", err));
      };

  return (
    <SafeAreaView style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
      <View style={{padding:10}}>
        <NavNoProfile Title='Sponsored Details' iconURL={iconURL} onPress={()=>handleBack(item)}/>
        <View style={{height:200,width:'100%'}}>
          <Image source={item.imageSource} style={{width:'100%', height:'100%'}}/>
        </View>
        <Text style={{fontWeight:700, backgroundColor:'#18B8A8',color:'white',padding:10,borderBottomRightRadius: 10,borderBottomLeftRadius: 10,}}>{item.title}</Text>
        <Text style={{fontSize:10}}>{item.details}</Text>
      </View>

      <View style={{padding:10}}>
        <View style={{flexDirection:'column', alignItems:'center',marginTop:10}}>
            <ButtonFull name='Learn More' onPress={()=>handleLearnMore(item)}/>
        </View>
      </View>
    </SafeAreaView>

  )
}

export default Sponsored;

const styles = StyleSheet.create({})