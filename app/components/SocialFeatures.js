import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import SocialFeaturesContainer from './SocialFeaturesContainer';

const SocialFeatures = () => {
  const onPress = () => {
    console.log('Button pressed');
  };

  const handleSocialFeaturePress = (id) => {
    console.log(`Social Feature pressed has ID: ${id}`);
  };

  const socialFeaturesData = [
    {
      id: '1',
      imageSource: require('../../assets/lost.gif'),
      title: 'Social Well-being',
      description: 'Give A Token Help A lot More',
    },
    {
      id: '2',
      imageSource: require('../../assets/health.gif'),
      title: 'Social Health',
      description: 'Everyone deserves healthcare',
    },
    {
      id: '3',
      imageSource: require('../../assets/health.gif'),
      title: 'Social Health',
      description: 'Everyone deserves healthcare',
    },
    // Add more social features as needed
  ];

  const renderSocialFeature = ({ item }) => (
    <SocialFeaturesContainer
      imageSource={item.imageSource}
      title={item.title}
      description={item.description}
      onPress={() => handleSocialFeaturePress(item.id)}

    />
  );

  return (
    <View>
      <View style={styles.socialContainerText}>
        <Text style={{textTransform: 'uppercase',fontWeight: 'bold',}}>Social Insure</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{opacity:0.5}}>View All &gt;</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={socialFeaturesData}
        renderItem={renderSocialFeature}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:5}}
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
