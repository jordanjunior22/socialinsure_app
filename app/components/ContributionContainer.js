import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ContributionContainer = ({title,date,contribution,paymentId}) => {
    const formatDate = (dateString) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true // Include AM/PM
        };
        const formattedDate = new Date(dateString).toLocaleString('en-US', options);
        return formattedDate;
      };
  return (
    <View style={{padding:2,borderBottomWidth:2,borderBottomColor:'#18B8A8'}}>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>CAMPAIGN:</Text>
            <Text style={{color:'black',fontWeight:'bold'}}>{title}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>DATE:</Text>
            <Text style={{color:'black',opacity:0.5,fontSize:10}}>{formatDate(date)}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontWeight:700}}>CONTRIBUTION:</Text>
            <Text style={{color:'white',fontWeight:700,backgroundColor:'#27AE60',paddingLeft:5,paddingRight:5}}>${contribution}</Text>
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