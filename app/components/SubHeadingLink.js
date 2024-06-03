import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SubHeadingLink = ({Title,Cmd, onPress}) => {
  return (
    <View style={styles.socialContainerText}>
    <Text style={{fontSize:18}}>{Title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={{color:'black',opacity:0.5}}>{Cmd}</Text>
    </TouchableOpacity>
  </View>
  )
}

export default SubHeadingLink

const styles = StyleSheet.create({
    socialContainerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
      },
})