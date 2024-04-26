import {StatusBar,Platform, SafeAreaView, StyleSheet, Text, View, ScrollView, Image,Button,TouchableOpacity } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const NavNoProfile = ({ onPress,Title = '', name='', iconURL=null }) => {
 const navigation = useNavigation();

  return (
    <View style={styles.headingSection}>
      {name.trim() !== '' && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.heading}>{name}</Text>
        </TouchableOpacity>
      )}
      {iconURL && (
        <TouchableOpacity onPress={onPress}>
          <Image source={iconURL} style={styles.iconImage} />
        </TouchableOpacity>
      )}
        <Text style={{fontWeight:700,fontSize:20}}>{Title}</Text>
        <View>
            <Image source={require('../../assets/ted.jpg')} style={styles.image} />
        </View>
    </View>
  )
}

export default NavNoProfile

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        opacity: 0.7,
      },
      image: {
        width: 50, // Adjust the width and height as needed
        height: 50,
        opacity:0,
        borderRadius: 50, 
      },
      headingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      iconImage: {
        width: 30,
        height: 30,

       },
})