import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ContributionContainer = ({title,date,contribution,paymentId}) => {
  return (
    <View style={{padding:2,borderBottomWidth:1,borderBottomColor:'#AB2525'}}>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>CAMPAIGN:</Text>
            <Text style={{color:'#18B8A8',fontWeight:700}}>{title}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>DATE:</Text>
            <Text style={{color:'#18B8A8'}}>{date}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>CONTRIBUTION:</Text>
            <Text style={{color:'blue',fontWeight:700}}>${contribution}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>PAYMENT ID:</Text>
            <Text style={{color:'black',fontSize:10}}>{paymentId}</Text>
        </View>
    </View>
  )
}

export default ContributionContainer

const styles = StyleSheet.create({})