import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import FeaturedCampaignsContainer from './FeaturedCampaignsContainer';
import FeaturedCampaignsContainerGrid from './FeaturedCampainsContainerGrid';
import SubHeadingLink from './SubHeadingLink';
import { useNavigation } from '@react-navigation/native';
const SocialFeatures = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Campaigns');
  };

  const handleCampaignPress = (item) => {
    navigation.navigate('CampaignSponsorDetailsContainer', {item})
  };
  const handleContributePress = (item) => {
    console.log('contribute Button for ID :',item.id);
    navigation.navigate('ContributionPayment', {item})
  }
  const campaignData = [
    {
      id: '1',
      imageSource: require('../../assets/ted.jpg'),
      title: 'Solidarity For John Deo',
      goal: 10000,
      raised: 4500,
      daysLeft: 15,
      description:'let use all kljas oiwuer oiuwer ipuiewo iuoweroiw owiuer oiouwre',
      featureType: 'Social Wellbeing',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023'
    },
    {
      id: '2',
      imageSource: require('../../assets/pah.jpg'),
      title: 'Health Contribution',
      goal: 10000,
      raised: 8000,
      daysLeft: 15,
      description:'let use all kljas oiwuer oiuwer ipuiewo iuoweroiw owiuer oiouwre',
      featureType: 'Social Health',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023'
    },
  ];

  const renderFeaturedCampaign = ({ item }) => (
    <FeaturedCampaignsContainer
      id={item.id}
      imageSource={item.imageSource}
      title={item.title}
      onPress={() => handleCampaignPress(item)}
      Goal={item.goal}
      Raised={item.raised}
      daysLeft={item.daysLeft}
      handleContribute={()=>handleContributePress(item)}
    />
  );

  return (
    <View style={{paddingBottom:50}}>
      <SubHeadingLink Title='Featured Campaign' Cmd='View All >' onPress={onPress}/>
      <FlatList
        data={campaignData}
        renderItem={renderFeaturedCampaign}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 5,marginTop:10 }}
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
