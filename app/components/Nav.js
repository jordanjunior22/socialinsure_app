import {StatusBar,Platform, SafeAreaView, StyleSheet, Text, View, ScrollView, Image,Button,TouchableOpacity } from 'react-native';
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

const Nav = ({ onPress,Title = '', name='', iconURL=null }) => {
 const {user} = useContext(UserContext);
 const navigation = useNavigation();
 const NotificationCounter =5;
  //console.log("users from storage",user);  
  return (
    <View style={styles.headingSection}>
      {name.trim() !== '' && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.heading}>Hello {user?.firstName}</Text>  
        </TouchableOpacity>
      )}
      {iconURL && (
        <TouchableOpacity onPress={onPress}>
          <Image source={iconURL} style={styles.iconImage} />
        </TouchableOpacity>
      )}
        <Text style={{fontWeight:700,fontSize:20}}>{Title}</Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}> 

          <TouchableOpacity style={{position:'relative'}} onPress={() => navigation.navigate('Notification')}>
            <Image source={require('../../assets/bell.png')} style={styles.iconImage} />
            <View style={{position:'absolute',right:0}}>
            <Text style={{backgroundColor:'orange',color:'white',fontSize:10,paddingLeft:4,paddingRight:4,borderRadius: 50,}}>{NotificationCounter}</Text>
            </View>
          </TouchableOpacity>

          {user.imageUrl ? (
          <TouchableOpacity onPress={() => navigation.navigate('ProfileDisplay')}>
            <Image source={{ uri: user?.imageUrl }} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('ProfileDisplay')}>
            <Image source={require('../../assets/profile.png')} style={styles.image} />
          </TouchableOpacity>
        )}
        </View>


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
        width: 40, // Adjust the width and height as needed
        height: 40,
        borderWidth:2,
        borderColor:'blue',
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