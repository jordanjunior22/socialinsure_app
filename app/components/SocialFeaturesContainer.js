import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const SocialFeaturesContainer = ({ imageSource, title, description, onPress, customContainerStyle, customIconImageStyle }) => {
  return (
    <View>
      <TouchableOpacity style={customContainerStyle} onPress={onPress}>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          {typeof imageSource === 'string' ? (
            <Image source={{ uri: imageSource }} style={customIconImageStyle} />
          ) : null}
        </View>
        <View style={{ padding: 5 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{title}</Text>
          <Text style={{ opacity: 0.7, fontSize: 10, textAlign: 'center', color: 'white' }}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

})

export default SocialFeaturesContainer;