import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import SocialFeaturesContainer from './SocialFeaturesContainer';
import { useNavigation } from '@react-navigation/native';
import SubHeadingLink from './SubHeadingLink';

const SocialFeatures = () => {
  const navigation= useNavigation()
  const onPress = () => {
    console.log('Button pressed');
  };

  const handleSocialFeaturePress = (item) => {
    console.log(`Social Feature pressed has ID: ${item.id}`);
    if(item.subReq === 'Yes'){
      navigation.navigate('SubReqFeature', { item });
    }else{
      console.log('item still under cons');
    }


  };

  const socialFeaturesData = [
    {
      id: '1',
      imageSource: require('../../assets/lost.gif'),
      title: 'Social Well-being',
      description: 'Give A Token Help A lot More',
      subReq:'Yes',
      details:'Social Life allows grieving families to enjoy support from the community. The objective is to bring family members living in the diaspora under an umbrella, in order to reduce donations to $1.25 per adult, and $0.75 per minor relative.— No more crucifying financial burdens after losing a loved one.'
    },
    {
      id: '2',
      imageSource: require('../../assets/health.gif'),
      title: 'Social Health',
      description: 'Everyone deserves healthcare',
      subReq:'No',
      details:'Social Life allows grieving families to enjoy support from the community. The objective is to bring family members living in the diaspora under an umbrella, in order to reduce donations to $1.25 per adult, and $0.75 per minor relative.— No more crucifying financial burdens after losing a loved one.'

    },
    {
      id: '3',
      imageSource: require('../../assets/health.gif'),
      title: 'Social Health',
      description: 'Everyone deserves healthcare',
      subReq:'No',
      details:'Social Life allows grieving families to enjoy support from the community. The objective is to bring family members living in the diaspora under an umbrella, in order to reduce donations to $1.25 per adult, and $0.75 per minor relative.— No more crucifying financial burdens after losing a loved one.'

    },
    // Add more social features as needed
  ];

  const renderSocialFeature = ({ item }) => (
    <SocialFeaturesContainer
      imageSource={item.imageSource}
      title={item.title}
      description={item.description}
      onPress={() => handleSocialFeaturePress(item)}
      customContainerStyle={{    
          backgroundColor : '#18B8A8',
          width:120,
          borderRadius:20,}}
      customIconImageStyle={{    
          width:'100%',
          height:110,}}
    />
  );

  return (
    <View>
      <SubHeadingLink Title='Social Insure' Cmd='View All >' onPress={()=>{navigation.navigate('AllFeatures')}}/>
      <FlatList
        data={socialFeaturesData}
        renderItem={renderSocialFeature}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:5,marginTop:10}}
      />
    </View>
  );
};

export default SocialFeatures;

const styles = StyleSheet.create({
  socialContainer: {},
  socialContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
   
  },
});
