import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import FeaturedCampaignsContainer from './FeaturedCampaignsContainer';
import SubHeadingLink from './SubHeadingLink';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const SocialFeatures = () => {
  const navigation = useNavigation();
  const [campaign, setCampaign] = useState([]);
  const [contribution, setContribution] = useState([])
  const [features, setFeatures] = useState([])
  const {user} = useContext(UserContext)
  const userId = user?._id;
  const isAWellBeingSubscriber = user?.isAWellBeingSubscriber;

  const onPress = () => {
    navigation.navigate('Campaigns');
  };
  //console.log("isAWellBeingSubscriber",isAWellBeingSubscriber)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const campaignResponse = await axios.get(`${BACKEND_URL}/campaign`);
          setCampaign(campaignResponse.data);

          const contributionResponse = await axios.get(`${BACKEND_URL}/contributions/${userId}`);
          setContribution(contributionResponse.data);

          const featureResponse = await axios.get(`${BACKEND_URL}/features`);
          setFeatures(featureResponse.data); 
          
        }
      } catch (error) {
        console.error("Fetch data error:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1 * 60 * 1000); // 1 minutes
    return () => clearInterval(intervalId);
  }, [userId, contribution.paymentId]);



  const handleCampaignPress = (item) => {
    const currentDate = new Date();
    const endDate = new Date(item.endAt);
    if (endDate < currentDate) {
        alert("This campaign has already ended. You can no longer contribute.");
    }else{
      navigation.navigate('CampaignSponsorDetailsContainer', {item,isAWellBeingSubscriber})
    }
  };

  const handleContributePress = (item) => {
      console.log(' Contribute Button:', item._id);
      const currentDate = new Date();
      const endDate = new Date(item.endAt);
      if (endDate < currentDate) {
          alert("This campaign has already ended. You can no longer contribute.");
      }else{
        navigation.navigate('ContributionPayment', {item})
      }
    
  }
  
  const calculateDaysLeft = (endAt) => {
    const endDate = new Date(endAt);
    const currentDate = new Date();
    if (endDate < currentDate) {
        return 0; 
    }
    const timeDifference = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
};
  const campaignsWithDaysLeft = campaign.map(campaign => {
      const daysLeft = calculateDaysLeft(campaign.endAt);
      return { ...campaign, daysLeft }; // Add 'daysLeft' property to each campaign object
  });

const filteredCampaign = campaignsWithDaysLeft.slice(0, 2).map(campaign => {
  const subReq = features.find(feature => feature._id === campaign.feature_id)?.subReq || false;
  return { ...campaign, subReq }; // Add 'subReq' property to each campaign object
}); 

const filteredCampaignWithPayment = filteredCampaign.map(campaign =>{
  const matchedContribution = contribution.find(contribution => contribution.campaign_id === campaign._id);
  const paymentId = matchedContribution ? contribution?.paymentId : '';
  return { ...campaign, paymentId };
})

//console.log("Campaigns with days left:", campaignsWithDaysLeft);

  const renderFeaturedCampaign = ({ item }) => (
    <FeaturedCampaignsContainer
      id={item?._id}
      imageSource={item?.imageSource}
      title={item?.title}
      onPress={() => handleCampaignPress(item)}
      Goal={item?.goal}
      Raised={item?.raised}
      daysLeft={item?.daysLeft}
      handleContribute={()=>handleContributePress(item)}

      subReq={item?.subReq}
      isAWellBeingSubscriber={isAWellBeingSubscriber}
      paymentId={item?.paymentId}
    />
  );

  return (
    <View style={{paddingBottom:20}}>
      <SubHeadingLink Title='Featured Campaign' Cmd='View All >' onPress={onPress}/>
      <FlatList
        data={filteredCampaignWithPayment}
        renderItem={renderFeaturedCampaign}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 5,marginTop:10}}
      />
    </View>
  );
};

export default SocialFeatures;

const styles = StyleSheet.create({
  socialContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
