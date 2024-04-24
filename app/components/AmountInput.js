import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const AmountInput = () => {
  return (
    <View style={{display:'flex',flexDirection:'row', alignItems:'center',borderWidth:1, borderColor:'#18B8A8',overflow:'hidden'}}>
      <Text style={{padding:10,backgroundColor:'#18B8A8', fontWeight:700, color:'white'}}>Amount $</Text>
      <TextInput
      style={styles.input}
        placeholder="500"
        value="" // Set the initial value for the name
      />
    </View>
  )
}

export default AmountInput

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'lightgray',
        width:'100%',
        height:'100%',
        paddingLeft:10,
    },
})