import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Grid from './Grid';
import { useNavigation } from '@react-navigation/native';
const socialFeaturesData = [
  {
    id: '1',
    imageSource: require('../../assets/lost.gif'),
    title: 'Social Well-being',
    description: 'Give A Token Help A lot More',
    subReq:'Yes',
    details:'Social Life allows grieving families to enjoy support from the community. The objective is to bring family members living in the diaspora under an umbrella, in order to reduce donations to $1.25 per adult, and $0.75 per minor relative.— No more crucifying financial burdens after losing a loved one.',
    fees:20,
    terms:'Social Life allows grieving families to enjoy support from the community. The objective is to bring family members living in the diaspora under an umbrella, in order to reduce donations to $1.25 per adult, and $0.75 per minor relative.— No more crucifying financial burdens after losing a loved one.'
    ,members:1000,
    contributions: 19870
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
    {
      id: '4',
      imageSource: require('../../assets/health.gif'),
      title: 'Social Health',
      description: 'Everyone deserves healthcare',
      subReq:'No',
      details:'Social Life allows grieving families to enjoy support from the community. The objective is to bring family members living in the diaspora under an umbrella, in order to reduce donations to $1.25 per adult, and $0.75 per minor relative.— No more crucifying financial burdens after losing a loved one.'

    },    
    // Add more social features as needed
  ];
const FeatureGrid = () => {
    const navigation=useNavigation();
    const user = {
      id:1,
      name:'john',
      isSubsciber:false
    }
    const handleSocialFeaturePress = (item) => {
      console.log(`Social Feature pressed has ID: ${item.id}`);
      if(item.subReq === 'Yes' && !user.isSubsciber){
        navigation.navigate('SubReqFeatureForNonMembers', { item });
      }else if(item.subReq === 'Yes' && user.isSubsciber){
        navigation.navigate('SubReqFeatureForMembers', { item });
      }
      else if(item.subReq === 'No'){
        navigation.navigate('NoSubReqFeature', { item });
      }
      else{
        throw "fatal error"
      }
  
    };
    
  return (
    <View>
        {socialFeaturesData.map((_, index) => {
          if (index % 2 === 0) { // Every second index creates a new row
            const item1 = socialFeaturesData[index];
            const item2 = socialFeaturesData[index + 1]; // Ensure there's a second item
            return (
              <Grid
                key={index}
                item1={item1}
                item2={item2}
                onPress1={()=>{handleSocialFeaturePress(item1)}}
                onPress2={()=>{handleSocialFeaturePress(item2)}}
                gridStyles={styles.FeatureGridStyle}
                imageStyles={styles.FeatureimageStyles}
              />
            );
          }
          return null;
        })}
    </View>
  )
}

export default FeatureGrid

const styles = StyleSheet.create({
    FeatureGridStyle: {
        flex: 1, // Equal space for each item in the row
        backgroundColor: '#18B8A8',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#18B8A8',
        height: 140, // Consistent height for items
        margin:1
      },
      FeatureimageStyles:{
        resizeMode: 'cover', width: '100%', height: 70
      },
})