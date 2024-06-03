import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'

const AccountButtons = ({onPress,name}) => {
  return (
    <TouchableOpacity style={{borderRadius:5,padding:10,flexDirection:'row',justifyContent:'space-between', alignContent:'center',backgroundColor:'#18B8A8'}} onPress={onPress}>
      <Text style={{color:'white',fontWeight:'700'}}>{name}</Text>
      <Image source={require('../../assets/front.png')} style={styles.iconimage} />
    </TouchableOpacity>
  )
}

export default AccountButtons

const styles = StyleSheet.create({
    iconimage: {
        width: 20,
        height: 20,
        tintColor:'white'
       },
})