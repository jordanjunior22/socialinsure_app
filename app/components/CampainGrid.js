import React from 'react';
import {View, StyleSheet} from 'react-native';
import FeaturedCampaignsContainer from './FeaturedCampaignsContainer';
import FeaturedCampaignsContainerGrid from './FeaturedCampainsContainerGrid';

export default function CampaignGrid({ item1, item2,handleCampaignPress1,handleCampaignPress2, onPress1, onPress2, gridStyles,containerStyle,imageStyle,subReq1,subReq2,isAWellBeingSubscriber,paymentId }) {
//FeaturedCampaignsContainer = ({ id,imageSource,description, title, onPress,Goal,Raised,daysLeft,handleContribute  })
  return (
    <View style={styles.row}>

      <View style={gridStyles}>
        <FeaturedCampaignsContainerGrid
          
          imageSource={item1.imageSource}
          title={item1.title}
          Goal={item1.goal}
          Raised={item1.raised}
          daysLeft={item1.daysLeft}
          handleContribute={onPress1}
          containerStyle={containerStyle}
          imageStyle={imageStyle}
          onPress={handleCampaignPress1}
          subReq={subReq1}
          isAWellBeingSubscriber={isAWellBeingSubscriber}
          paymentId={paymentId}
        />
      </View>
      {item2 && ( // Check if item2 exists before rendering
        <View style={gridStyles}>
          <FeaturedCampaignsContainerGrid
            imageSource={item2.imageSource}
            title={item2.title}
            description={item2.description}
            Goal={item2.goal}
            Raised={item2.raised}
            daysLeft={item2.daysLeft}
            handleContribute={onPress2}
            containerStyle={containerStyle}
            imageStyle={imageStyle}
            onPress={handleCampaignPress2}
            subReq={subReq2}
            isAWellBeingSubscriber={isAWellBeingSubscriber}
            paymentId={paymentId}
          />
        </View>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row', // Horizontal alignment for two-column layout
      justifyContent: 'space-between', // Even spacing between items
    },
  });
