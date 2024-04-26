import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import FeaturedCampaignsContainer from './FeaturedCampaignsContainer';
import SubHeadingLink from './SubHeadingLink';
const SocialFeatures = () => {
  const onPress = () => {
    console.log('Button pressed');
  };

  const handleCampaignPress = (id) => {
    console.log(`Campaign pressed. ID: ${id}`);
  };

  const featuredCampaignsData = [
    {
      id: '1',
      imageSource: require('../../assets/ted.jpg'),
      title: 'Solidarity For John Deo',
      goal: 10000,
      raised: 4500,
      daysLeft: 15,
    },
    {
        id: '2',
        imageSource: require('../../assets/pah.jpg'),
        title: 'Solidarity For John Deo',
        goal: 10000,
        raised: 8000,
        daysLeft: 15,
      },    
    // Add more featured campaigns as needed
  ];

  const renderFeaturedCampaign = ({ item }) => (
    <FeaturedCampaignsContainer
      id={item.id}
      imageSource={item.imageSource}
      title={item.title}
      onPress={() => handleCampaignPress(item.id)}
      Goal={item.goal}
      Raised={item.raised}
      daysLeft={item.daysLeft}
    />
  );

  return (
    <View style={{paddingBottom:50}}>
      <SubHeadingLink Title='Featured Campaign' Cmd='View All >' onPress={onPress}/>
      <FlatList
        data={featuredCampaignsData}
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
