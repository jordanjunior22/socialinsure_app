import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubHeadingNoLink = ({heading}) => {
  return (
    <View>
        <Text style={{marginTop: 20,fontSize:18}}>{heading}</Text>
    </View>
  )
}

export default SubHeadingNoLink

const styles = StyleSheet.create({})