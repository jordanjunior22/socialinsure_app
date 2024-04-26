import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const StaticInput = ({amount}) => {

  return (
    <View style={{display:'flex',flexDirection:'row', alignItems:'center',borderWidth:1, borderColor:'#18B8A8',overflow:'hidden'}}>
      <Text style={{padding:10,backgroundColor:'#18B8A8', fontWeight:700, color:'white'}}>Amount $</Text>
      <Text style={styles.input}>{amount}</Text>
    </View>
  )
}

export default StaticInput

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'lightgray',
        width:'100%',
        height:'100%',
        padding:10,
        color:'#18B8A8',
        fontWeight:'700'
    },
})