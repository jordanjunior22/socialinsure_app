import {StatusBar,Platform, SafeAreaView, StyleSheet, Text, View, ScrollView, Image,Button,TouchableOpacity } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Nav = ({ onPress,Title = '', name }) => {
 const navigation = useNavigation();

  return (
    <View style={styles.headingSection}>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.heading}>{name}</Text>
        </TouchableOpacity>
        <Text style={{fontWeight:700,fontSize:20}}>{Title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDisplay')}>
            <Image source={require('../../assets/ted.jpg')} style={styles.image} />
        </TouchableOpacity>
    </View>
  )
}

export default Nav

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        opacity: 0.7,
      },
      image: {
        width: 50, // Adjust the width and height as needed
        height: 50,
    
        borderRadius: 50, 
      },
      headingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
})