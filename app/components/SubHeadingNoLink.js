import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubHeadingNoLink = ({heading}) => {
  return (
    <View>
        <Text style={{textTransform: 'uppercase',fontWeight: 'bold',marginTop: 20}}>{heading}</Text>
    </View>
  )
}

export default SubHeadingNoLink

const styles = StyleSheet.create({})