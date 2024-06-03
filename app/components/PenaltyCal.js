import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const PenaltyCal = ({item}) => {
  return (
    <View style={{}}>
        <View style={{flexDirection:'row',borderWidth:1,borderColor:'lightgray',backgroundColor:'#18B8A8'}}>
          <View style={{height:50,flex:1}}>
            <Image source={{uri:item?.imageSource}} style={{height:50,flex:1}}/> 
          </View>
          <View style={{flex:2,justifyContent:'center'}}>
            <Text style={{fontSize:12,color:'white'}}>{item?.title}</Text>
            <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>${item?.fees}</Text>
          </View>
        </View>
    </View>
  )
}

export default PenaltyCal

const styles = StyleSheet.create({})