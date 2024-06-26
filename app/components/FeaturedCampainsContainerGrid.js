import { StyleSheet, Text, View, Image, TouchableOpacity,Platform } from 'react-native';
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import Button from '../components/Button';

const FeaturedCampaignsContainerGrid = ({
  id,
  imageSource,
  description,
  title,
  onPress,
  Goal,
  Raised,
  daysLeft,
  handleContribute,
  containerStyle,
  imageStyle,
  subReq,
  isAWellBeingSubscriber,
  paymentId,
}) => {
  const progress = Raised / Goal;

  return (
    <View>
      <TouchableOpacity
        style={containerStyle ? containerStyle : styles.socialContainer}
        onPress={onPress}
      >
        {typeof imageSource === 'string' ? (
        <Image
          source={{uri:imageSource}}
          style={imageStyle ? imageStyle : styles.iconImage}
        />):''}

        <View
          style={{
            padding: 5,
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            alignItems:'center'
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '700' }}>{title}</Text>
          <Text style={{color: 'white', fontSize: 10,backgroundColor:'darkred',padding:3,borderRadius:5}}>
            {daysLeft} days left
          </Text>
        </View>

        <ProgressBar progress={progress} width={140} height={6} />

        <View style={styles.figures}>
          <View>
            <Text style={{ fontSize: 10}}>Goal</Text>
            <Text style={{ fontWeight: '700', color: 'black',fontSize: 10 }}>
              USD $ {Goal}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 10}}>Raised</Text>
            <Text style={{ fontWeight: '700', color: '#27AE60',fontSize: 10 }}>
              USD $ {Raised}
            </Text>
          </View>
        </View>

        {subReq === 'Yes' && isAWellBeingSubscriber && paymentId !== '' ? (
        <Button name="Contributed" disabled={true} />
      ) : subReq === 'Yes' && !isAWellBeingSubscriber ? (
        <Button name="Members Only" disabled={true} />
      ) : (
        <Button name="Contribute" onPress={handleContribute} />
      )}
      </TouchableOpacity>
    </View>
  );
};

export default FeaturedCampaignsContainerGrid;

const styles = StyleSheet.create({
  socialContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'lightgray',
    ...Platform.select({
      ios: {
        width: 175, // Width for iOS
      },
      android: {
        width: 158, // Width for Android
      },
    }),
  },
  iconImage: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  figures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  }, 
});
