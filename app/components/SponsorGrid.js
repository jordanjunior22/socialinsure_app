import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Grid from './Grid';

const SponsoreData = [
    {
      id: '1',
      imageSource: require('../../assets/intern.jpg'),
      title: 'International Basket Market',
      description: 'Give A Token, Help A Lot More',
    },
    {
      id: '2',
      imageSource: require('../../assets/garden.jpg'),
      title: 'Meza Foundation',
      description: 'Everyone deserves healthcare',
    },
  ];

const SponsorGrid = () => {
    const handleSocialFeaturePress = (id) => {
        console.log(`Social Feature pressed has ID: ${id}`);
      };

  return (
    <View>
        {SponsoreData.map((_, index) => {
          if (index % 2 === 0) { // Every second index creates a new row
            const item1 = SponsoreData[index];
            const item2 = SponsoreData[index + 1]; // Ensure there's a second item
            return (
              <Grid
                key={index}
                item1={item1}
                item2={item2}
                onPress1={()=>{handleSocialFeaturePress(item1.id)}}
                onPress2={()=>{handleSocialFeaturePress(item2.id)}}
                gridStyles={styles.SponsorGridStyles}
                imageStyles={styles.SponsorImageStyles}
              />
            );
          }
          return null;
        })}
    </View>
  )
}

export default SponsorGrid

const styles = StyleSheet.create({
    SponsorGridStyles: {
        flex: 1, // Equal space for each item in the row
        backgroundColor: '#DB00FF',
        borderWidth: 1,
        borderColor: '#DB00FF',
        height: 140, // Consistent height for items
        margin:1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
      },
      SponsorImageStyles:{
        resizeMode: 'cover', width: '100%', height: 70 
    
      }
})