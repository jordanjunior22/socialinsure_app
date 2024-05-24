import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Grid from './Grid';
import SubHeadingLink from './SubHeadingLink';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

const SponsoreData = [
  {
    id: '1',
    imageSource: require('../../assets/intern.jpg'),
    title: 'International Basket Market',
    description: 'Example description 1',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ,website:'https://www.google.com'
  },
  {
      id: '2',
      imageSource: require('../../assets/garden.jpg'),
      title: 'Meza Foundation',
      description: 'Everyone deserves healthcare',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,website:'https://www.google.com'
    },
];

const SponsorGrid = () => {
  const navigation=useNavigation();
  const {user} = useContext(UserContext)
  const userId = user?._id;
  const [sponsorData,setsponsorData] = useState([]);

  useEffect(()=>{
    const fetchAllSponsorData = async () =>{
      try{
        if(userId){
          const SponsorResponse = await axios.get(`${BACKEND_URL}/sponsor`);
          setsponsorData(SponsorResponse.data);
        }

      }catch(error){
        console.error("Fetch Features error :",error);
      }
    }
    fetchAllSponsorData();
  },[userId])

    const handleSponsorPress = (item) => {
        navigation.navigate('Sponsored',{item})
      };
    const handleViewAll = () =>{
      navigation.navigate('AllSponsored');
    }

  return (
    <View>
        <SubHeadingLink Title='SPONSORED SERVICES' Cmd='View All >' onPress={handleViewAll}/>
        {sponsorData.map((_, index) => {
          if (index % 2 === 0) { // Every second index creates a new row
            const item1 = sponsorData[index];
            const item2 = sponsorData[index + 1]; // Ensure there's a second item
            return (
              <Grid
                key={index}
                item1={item1}
                item2={item2}
                onPress1={()=>{handleSponsorPress(item1)}}
                onPress2={()=>{handleSponsorPress(item2)}}
                gridStyles={styles.SponsorGridStyles}
                imageStyles={styles.SponsorImageStyles}
              />
            );
          }
          return null;
        })}
    </View>
  )
}

export default SponsorGrid

const styles = StyleSheet.create({
    SponsorGridStyles: {
        flex: 1, // Equal space for each item in the row
        backgroundColor: '#AB2525',
        borderWidth: 1,
        borderColor: '#AB2525',
        height: 140, // Consistent height for items
        margin:1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,

      },
      SponsorImageStyles:{
        resizeMode: 'cover', width: '100%', height: 70 
    
      }
})