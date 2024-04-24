import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const SocialFeaturesContainer = ({ imageSource, title, description, onPress }) => {
  return (
    <View >
      <TouchableOpacity style = {styles.socialContainer} onPress={onPress}>
        
        <View style={{width: '100%',  flexDirection:'row',justifyContent:'center', alignItems:'center', overflow: 'hidden',borderRadius:20,}}>
          <Image source={imageSource} style={styles.iconimage} />
        </View>

        <View style={{padding:5}}>
          <Text style={{textAlign:'center',fontWeight:'bold',color:'white'}}>{title}</Text>
          <Text style={{opacity:0.7,fontSize:10, textAlign:'center',color:'white'}}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  socialContainer : {
    backgroundColor : '#18B8A8',
    width:120,
    borderRadius:20,
  },
  iconimage : {
    width:'100%',
    height:110,
  },
})

export default SocialFeaturesContainer;