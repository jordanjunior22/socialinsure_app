import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ButtonFull from '../components/ButtonFull'
import { UserContext } from '../../context/UserContext';
import { BACKEND_URL } from '../../config'

import axios from 'axios'

const Membership = () => {
    const navigation = useNavigation();
    const {user} = useContext(UserContext)
    const [compaigns, setCampaign] = useState([])
    const [contributions,setContributions] = useState([])
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [filteredContribution,setFilteredContribution] = useState([]);
    const isMemeber = user?.isAWellBeingSubscriber; 
    const userId = user?._id;

    const goBack = () =>{
        navigation.navigate('Account')
    }
    const handleResubcribe = () =>{
        navigation.navigate('Penalty')
    }
    const iconUrl = require('../../assets/back.png');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const campaignResponse = await axios.get(`${BACKEND_URL}/campaign`);
                    setCampaign(campaignResponse.data);
                    const ContributionResponse = await axios.get(`${BACKEND_URL}/contributions/${userId}`);
                    setContributions(ContributionResponse.data);
                    const filtered = campaignResponse.data.filter(campaign => campaign.feature_id === "664c9a60ff37a060cd82674f"); 
                    setFilteredCampaigns(filtered);

                    const foundCampaigns = filtered.filter(campaign => 
                        contributions.some(contribution => contribution.campaign_id === campaign._id)
                    );
                    setFilteredContribution(foundCampaigns);
                }
            } catch(error) {
                console.error(error)
            }
        }
        fetchData();
    }, [userId]);
    
    
    const TotalCampaigns = filteredCampaigns?.length;
    const TotalContributions = filteredContribution?.length;
    const MissedContributions = TotalCampaigns-TotalContributions;
    console.log(MissedContributions);  


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