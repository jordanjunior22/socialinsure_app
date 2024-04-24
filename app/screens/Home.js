import {StatusBar,Platform, SafeAreaView, StyleSheet, Text, View, ScrollView, Image,Button,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import TodoScrollView from '../components/TodoScrollView';
import SocialFeatures from '../components/SocialFeatures';
import FeaturedCampaings from '../components/FeaturedCampaigns';
import Nav from '../components/Nav';
import Hero from '../components/Hero';

const Home = () => {
  const handleContributions = () => {
    console.log('Button pressed');
  };
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent={false} barStyle="white-content" />
      
      <ScrollView style={styles.container}>
        <Nav onPress={() => navigation.navigate('Home')} name="Hello John Deo,"/>
        <Hero balance={100.00} 
              onQuickTopUp={()=>{navigation.navigate('QuickTopUp')}}
              onMyContributions={handleContributions}
              />

        <TodoScrollView />
        <SocialFeatures />
        <FeaturedCampaings />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
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
  hero :{
    flexDirection:'column',
    backgroundColor:'#F9F9F9',
    padding: 20,
    marginTop:20,
    gap:50,
    borderRadius: 20,
    borderColor:'#18B8A8',
    borderWidth:1
  },
  hero_top:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttons:{
    borderRadius:50,
    backgroundColor: '#18B8A8',
    padding: 10,
    color:'white',
    borderRadius: 10,
  },
  buttons2:{
    borderRadius:50,
    borderColor:'#18B8A8',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  buttonText:{

  },
  todoButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:5,
   },
   todoButton:{
    borderWidth: 2, borderColor: 'lightgray', borderStyle: 'solid',
    padding:10,
   },
   iconimage: {
    width: 30,
    height: 30,
   },
shadowBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20, // Rounded corners
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Ensures borderRadius works on Android
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Black shadow
        shadowOffset: { width: 2, height: 2 }, // Offset
        shadowOpacity: 0.5, // Opacity
        shadowRadius: 5, // Spread
      },
      android: {
        elevation: 10, // Elevation for shadow effect
      },
    }),
  },
});
