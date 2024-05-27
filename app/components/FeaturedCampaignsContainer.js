import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import Button from '../components/Button';


const FeaturedCampaignsContainer = ({
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
  //console.log("button",subReq)
  return (
    <View>
      <TouchableOpacity
        style={containerStyle ? containerStyle : styles.socialContainer}
        onPress={onPress}
      >

          {typeof imageSource === 'string' ? (
            <Image source={{ uri: imageSource }} style={imageStyle ? imageStyle : styles.iconImage} />
          ) : ''}

        <View
          style={{
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '700' }}>{title}</Text>
          <Text style={{ color: 'blue', fontSize: 12, fontWeight: '700' }}>
            {daysLeft} days left
          </Text>
        </View>

        <ProgressBar progress={progress} width={240} height={6} />

        <View style={styles.figures}>
          <View>
            <Text>Goal</Text>
            <Text style={{ fontWeight: '700', color: '#AB2525' }}>
              USD $ {Goal}
            </Text>
          </View>
          <View>
            <Text>Raised</Text>
            <Text style={{ fontWeight: '700', color: '#24FF00' }}>
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

export default FeaturedCampaignsContainer;

const styles = StyleSheet.create({
  socialContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width: 250,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  iconImage: {
    width: '100%',
    height: 170,
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
