import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../context/UserContext'
import SubHeadingNoLink from '../components/SubHeadingNoLink'
import PenaltyCal from '../components/PenaltyCal'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import StaticInput from '../components/StaticInput'

const Penalty = () => {
    const {user} = useContext(UserContext);
    const [foundCampaigns,setFoundCampaigns]= useState([])
    const [compaigns, setCampaign] = useState([])
    const navigation =useNavigation();
    const iconUrl = require('../../assets/back.png');
    const userId = user._id;
    const [missedContribution,setMissedContribution] = useState([]);
    const PenaltyFees = 50;

    const goBack = () =>{
      navigation.navigate('Account')
    }

    useEffect(()=>{
      const fetchData = async () => {
      if(userId){
        try{
          const campaignResponse = await axios.get(`${BACKEND_URL}/campaign`);
          setCampaign(campaignResponse.data);

          const MissedContributionResponse = await axios.get(`${BACKEND_URL}/missedContributions/${userId}`)
          setMissedContribution(MissedContributionResponse.data);

          const missedCampaignIds  = MissedContributionResponse.data.map(contribution => contribution.campaign_id);
          
          const missedCampaigns = campaignResponse.data.filter(campaign => missedCampaignIds.includes(campaign._id));
          setFoundCampaigns(missedCampaigns);
        }catch(error){
          console.log('Missed Contribution API error at penalty: ',error)
        }
      }
    }
    fetchData();
    },[userId])
    const total = foundCampaigns.reduce((accumulator, campaign) => accumulator + campaign.fees, 0) + PenaltyFees;

    console.log(foundCampaigns);
    return (
      <SafeAreaView style={{flex:1,padding:10}}>
        <NavNoProfile Title='Re-Subcription'  iconURL={iconUrl} onPress={goBack}/>
        <Text style={{backgroundColor:'#AB2525',color:'white',textAlign:'center',fontSize:18,borderRadius:10}}>Fees To Be Paid</Text>
        <SubHeadingNoLink heading='Missed Campaigns'/>
        <Text style={{marginBottom:10}}>You will have to pay all the campaign you have missed and the penalty fee</Text>
        {foundCampaigns.map((campaign,index) => (
            <PenaltyCal key={index} item={campaign}/>
        ))}
        <Text style={{backgroundColor:'#18B8A8',color:'white',fontSize:25}}>Penalty Fees <Text style={{fontWeight:'bold'}}>${PenaltyFees}</Text> </Text>
        <StaticInput amount={total}/>
      </SafeAreaView>
    )
}

export default Penalty

const styles = StyleSheet.create({})