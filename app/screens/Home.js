import { StyleSheet, Text, View, ScrollView, Image,Button,TouchableOpacity } from 'react-native';
import React from 'react';
import TodoScrollView from '../components/TodoScrollView';
import SocialFeatures from '../components/SocialFeatures';
import FeaturedCampaings from '../components/FeaturedCampaigns';

const Home = () => {
  const onPress = () => {
    console.log('Button pressed');
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        <View style={styles.headingSection}>
          <Text style={styles.heading}>Hello Ted</Text>
          <Image source={require('../../assets/ted.jpg')} style={styles.image} />
        </View>
        
        <View style={styles.hero}>
          <View style={styles.hero_top}>
            <TouchableOpacity onPress={onPress} style={styles.buttons}>
              <Text style={styles.buttonText}>+ Quick Top Up</Text>
            </TouchableOpacity>            
            <TouchableOpacity onPress={onPress} style={styles.buttons2}>
              <Text style={styles.buttonText}>My Contributions</Text>
            </TouchableOpacity>           
          </View>
          <View>
            <Text>My Account Balance</Text>
            <Text style={{ fontWeight: 'bold',fontSize: 25,}}>$100.00</Text>
          </View>
        </View>

        <View>
            <TodoScrollView/>
        </View>
        <SocialFeatures/>
        <FeaturedCampaings/>
        
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 50, // Adjust the width and height as needed
    height: 50,

    borderRadius: 50, 
  },
  headingSection :{
    marginTop: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero :{
    flexDirection:'column',
    backgroundColor:'lightgray',
    padding: 20,
    marginTop:20,
    gap:50,
    borderRadius: 20,

  },
  hero_top:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  buttons:{
    borderRadius:50,
    backgroundColor: '#DB8D18',
    padding: 10,
    borderRadius: 20,
  },
  buttons2:{
    borderRadius:50,
    backgroundColor: '#AB2525',
    padding: 10,
    borderRadius: 20,
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
   }
});
