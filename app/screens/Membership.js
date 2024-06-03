import { StyleSheet, Text, View,ScrollView,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ButtonFull from '../components/ButtonFull'
import { UserContext } from '../../context/UserContext';
import { BACKEND_URL } from '../../config'
import CampaignGrid from '../components/CampainGrid'
import axios from 'axios'
import SubHeadingNoLink from '../components/SubHeadingNoLink'

const Membership = () => {
    const navigation = useNavigation();
    const {user} = useContext(UserContext)
    const [Uncontributed,setUncontributed] =useState([])
    const [compaigns, setCampaign] = useState([])
    const [contributions,setContributions] = useState([])
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [filteredContribution,setFilteredContribution] = useState([]);
    const [missedContribution,setMissedContribution] = useState(3);
    const isAWellBeingSubscriber = user?.isAWellBeingSubscriber;  
    const userId = user?._id;
    const [totalCampaigns, setTotalCampaigns] = useState(0);
    const [totalContributions, setTotalContributions] = useState(0);
    const [needsContributions, setNeedsContributions] = useState(0);
    const [loading,setLoading] = useState(true);

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

                    // const MissedContributionResponse = await axios.get(`${BACKEND_URL}/missedContributions/${userId}`)
                    // setMissedContribution(MissedContributionResponse.data);

                    if(campaignResponse.data){
                        const filtered = campaignResponse.data.filter(campaign => campaign.feature_id === "664c9a60ff37a060cd82674f"); 
                        setFilteredCampaigns(filtered);
    
                        const foundCampaigns = filtered.filter(campaign => 
                            contributions.some(contribution => contribution.campaign_id === campaign._id)
                        );
                        setFilteredContribution(foundCampaigns) 
    
                        const NotfoundCampaigns = filtered.filter(campaign => 
                            !contributions.some(contribution => contribution.campaign_id === campaign._id)
                        );
                        setUncontributed(NotfoundCampaigns)

                        const totalCampaignsCount = filtered.length;
                        const totalContributionsCount = foundCampaigns.length;
                        const needsContributionsCount = totalCampaignsCount - totalContributionsCount;
                        // Update state with calculated values
                        setTotalCampaigns(totalCampaignsCount);
                        setTotalContributions(totalContributionsCount);
                        setNeedsContributions(needsContributionsCount);
                    }
                    

                }
            } catch(error) {
                console.error("error at membership",error)  
            }finally {
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            }
        }
        const postMissedContribution = async () => {
            try {
                const currentDate = new Date();
                const missedCampaigns = filteredCampaigns.filter(campaign => {
                    const campaignEndDate = new Date(campaign.endAt);
                    return campaignEndDate < currentDate && !contributions.some(contribution => contribution.campaign_id === campaign._id);
                });
    
                for (const campaign of missedCampaigns) { 
                    await axios.post(`${BACKEND_URL}/missedContribution`, { 
                        user_id: userId,
                        campaign_id: campaign._id
                    });
                }
            } catch(error) {
                console.error("error posting missed contribution", error);
            }
        };
        fetchData();
        postMissedContribution();
        // const intervalId = setInterval(() => {
        //     fetchData();
        //     postMissedContribution();
        // }, 3 * 1000);
        // return () => clearInterval(intervalId);
    }, [userId, totalCampaigns, totalContributions, needsContributions]); 


    console.log("Total Campaigns ",totalCampaigns);  
    //console.log("Total Contributed ",totalContributions);   
    //console.log("Needs Contribution",needsContributions);
    const calculateDaysLeft = (endAt) => {
        const endDate = new Date(endAt);
        const currentDate = new Date();
        if (endDate < currentDate) {
            return 0; 
        }
        const timeDifference = endDate.getTime() - currentDate.getTime();
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    };
      const campaignsWithDaysLeft = Uncontributed.map(campaign => {
          const daysLeft = calculateDaysLeft(campaign.endAt);
          return { ...campaign, daysLeft }; // Add 'daysLeft' property to each campaign object
      });

const campaignPress = (item) => {
    const currentDate = new Date();
    const endDate = new Date(item.endAt);

    if (endDate < currentDate) {
        alert("This campaign has already ended. You can no longer contribute.");
    } else {
        console.log('Campaign Press:', item._id);
        navigation.navigate('CampaignSponsorDetailsContainer', { item, isAWellBeingSubscriber });
    }
};

const handleContribute = (item) => {
    console.log(' Contribute Button:', item._id);
    const currentDate = new Date();
    const endDate = new Date(item.endAt);

    if (endDate < currentDate) {
        alert("This campaign has already ended. You can no longer contribute.");
    }else{
        navigation.navigate('ContributionPayment', {item})
    }
};

    if(isAWellBeingSubscriber && (missedContribution < 3)){    
        return (
            <SafeAreaView style={{flex:1,padding:10}}>
                <NavNoProfile Title='Membership' iconURL={iconUrl} onPress={goBack}/>
                <Text style={{backgroundColor:'#27AE60',color:'white',textAlign:'center',fontSize:18,borderRadius:10}}>Active</Text>
                <View style={styles.top}>
                    <View style={styles.box}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Total Campaigns</Text>
                        <Text style={{fontSize:30,color:'white'}}>{totalCampaigns}</Text>
                    </View>
                    <View style={styles.box2}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Total Contributions</Text>
                        <Text style={{fontSize:30,color:'white'}}>{totalContributions}</Text> 
                    </View>    
                </View>
                <View style={styles.missed}>
                    <Text style={{fontWeight:'bold',color:'white'}}>Missed Contributions</Text>
                    <Text style={{textAlign:'center',color:'white'}}>Once you have missed up to three contributions, you will no longer be a social well-being meber and will have to pay a penalty fee in other to join back.</Text>
                    <Text style={{fontSize:30,color:'white'}}>{missedContribution}</Text> 
                </View>
                <SubHeadingNoLink heading='Needs Contributions'/>

                <ScrollView style={{marginTop:5}}>
                    {campaignsWithDaysLeft.map((campaign, index) => {
                    // Group campaigns in pairs for grid-style display
                    if (index % 2 === 0) {
                        const item1 = campaignsWithDaysLeft[index];
                        const item2 = campaignsWithDaysLeft[index + 1]; // Ensure there's a second item

                        return (
                        <CampaignGrid
                            key={index}
                            item1={item1}
                            item2={item2}
                            onPress1={() => handleContribute(item1)}
                            onPress2={() => handleContribute(item2)}
                            gridStyles={styles.FeatureGridStyle}
                            handleCampaignPress1={() =>campaignPress(item1)}
                            handleCampaignPress2={() =>campaignPress(item2)}
                            subReq1={item1?.subReq}
                            subReq2={item2?.subReq}
                            isAWellBeingSubscriber={isAWellBeingSubscriber}
                            paymentId1={item1?.paymentId}
                            paymentId2={item2?.paymentId}
                        />
                        );
                    }
                    return null; // If there is no second item, skip
                    })}
                </ScrollView>
                {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )}
            </SafeAreaView>
          )
    }
    if(!isAWellBeingSubscriber){ 
        return (
            <SafeAreaView style={{flex:1,padding:10}}>
                <NavNoProfile Title='Membership' iconURL={iconUrl} onPress={goBack}/>
                <Text>You are not a member of any subsciption service</Text>
            </SafeAreaView>
          )
    }
    if(isAWellBeingSubscriber && (missedContribution > 2)){
        return (
            <SafeAreaView style={{flex:1,padding:10}}>
                <NavNoProfile Title='Membership' iconURL={iconUrl} onPress={goBack}/>
                <Text style={{backgroundColor:'#AB2525',color:'white',textAlign:'center',fontSize:18,borderRadius:10}}>In Active</Text>
                <View style={styles.top}>
                    <View style={styles.box}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Total Campaigns</Text>
                        <Text style={{fontSize:30,color:'white'}}>{totalCampaigns}</Text>
                    </View>
                    <View style={styles.box2}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Total Contributions</Text>
                        <Text style={{fontSize:30,color:'white'}}>{totalContributions}</Text> 
                    </View>    
                </View>
                <View style={styles.missed}>
                    <Text style={{fontWeight:'bold',color:'white'}}>Missed Contributions</Text>
                    <Text style={{textAlign:'center',color:'white'}}>Once you have missed up to three contributions, you will no longer be a social well-being meber and will have to pay a penalty fee in other to join back.</Text>
                    <Text style={{fontSize:30,color:'white'}}>{missedContribution}</Text> 
                </View>

                <Text style={{color:'red'}}>YOU ARE NO BELONG TO SOCIAL WELLBEING YOU HAVE MISSED {missedContribution} CONTRIBUTIONS.</Text>
                <Text>However in other to become a member you must Resubscribe and pay the penalty fee</Text>
                <ButtonFull name='Re-Subscribe' onPress={handleResubcribe}/>
            </SafeAreaView>
          )
    }

}

export default Membership
//#27AE60
const styles = StyleSheet.create({
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        gap:5,
    },
    box:{
        borderRadius:10,
        alignItems:'center',
        padding:10,
        flex:1,
        backgroundColor: 'black',
    },
    box2:{
        borderRadius:10,
        alignItems:'center',
        padding:10,
        flex:1,
        backgroundColor: '#18B8A8',
    },
    missed:{
        borderWidth:1,
        borderColor:'lightgray',
        borderRadius:10,
        alignItems:'center',
        padding:10,
        marginTop:5,
        backgroundColor:'darkred'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white', // Semi-transparent black overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    FeatureGridStyle:{
        flex:1,
    }
})