import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ButtonFull from '../components/ButtonFull'

const Membership = () => {
    const navigation = useNavigation()
    const goBack = () =>{
        navigation.navigate('Account')
    }
    const handleResubcribe = () =>{
        navigation.navigate('Penalty')
    }
    const iconUrl = require('../../assets/back.png');
    const TotalCampaigns = 30;
    const TotalContributions = 28;
    const MissedContributions = 3;
    const isMemeber = true;
    if(isMemeber && (MissedContributions < 3)){
        return (
            <SafeAreaView style={{flex:1,padding:10}}>
                <NavNoProfile Title='Membership' iconURL={iconUrl} onPress={goBack}/>
                <Text style={{backgroundColor:'#24FF00',color:'white',textAlign:'center'}}>Active</Text>
                <Text>Total Campaigns : {TotalCampaigns}</Text>
                <Text>Total Contributions : {TotalCampaigns}</Text>
                <Text>Needs Contributions :{TotalCampaigns - TotalContributions}</Text>
                <Text>Missed Contributions : {MissedContributions}</Text>
            </SafeAreaView>
          )
    }
    if(!isMemeber){
        return (
            <SafeAreaView style={{flex:1,padding:10}}>
                <NavNoProfile Title='Membership' iconURL={iconUrl} onPress={goBack}/>
                <Text>You are not a member of any subsciption service</Text>
            </SafeAreaView>
          )
    }
    if(isMemeber && (MissedContributions > 2)){
        return (
            <SafeAreaView style={{flex:1,padding:10}}>
                <NavNoProfile Title='Membership' iconURL={iconUrl} onPress={goBack}/>
                <Text style={{backgroundColor:'#AB2525',color:'white',textAlign:'center'}}>In Active</Text>
                <Text>Total Campaigns : {TotalCampaigns}</Text>
                <Text>Total Contributions : {TotalCampaigns}</Text>
                <Text>Needs Contributions :{TotalCampaigns - TotalContributions}</Text>
                <Text>Missed Contributions : {MissedContributions}</Text>

                <Text style={{color:'red'}}>YOU ARE NO BELONG TO SOCIAL WELLBEING YOU HAVE MISSED {MissedContributions} CONTRIBUTIONS.</Text>
                <Text>However in other to become a member you must Resubscribe and pay the penalty fee</Text>
                <ButtonFull name='Re-Subscribe' onPress={handleResubcribe}/>
            </SafeAreaView>
          )
    }

}

export default Membership

const styles = StyleSheet.create({})