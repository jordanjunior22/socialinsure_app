import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const SocialFeaturesContainer = ({ imageSource, title, description, onPress }) => {
  return (
    <View>
      <TouchableOpacity style = {styles.socialContainer} onPress={onPress}>
        <Image source={imageSource} style={styles.iconimage} />
        <Text>{title}</Text>
        <Text style={{opacity:0.5}}>{description}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  socialContainer : {
    backgroundColor : '#EEECEE',
    padding : 15,
    width:170,
    alignItems : 'center',
    borderRadius : 20,
    marginTop : 10,
  },
  iconimage : {
    width: 100,
    height:100,
  },
})

export default SocialFeaturesContainer;