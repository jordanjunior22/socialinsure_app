import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SubHeadingLink = ({Title,Cmd, onPress}) => {
  return (
    <View style={styles.socialContainerText}>
    <Text style={{textTransform: 'uppercase',fontWeight: 'bold'}}>{Title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={{color:'#18B8A8',fontWeight:'bold'}}>{Cmd}</Text>
    </TouchableOpacity>
  </View>
  )
}

export default SubHeadingLink

const styles = StyleSheet.create({
    socialContainerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:5,
       
      },
})