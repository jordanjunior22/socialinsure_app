import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Nav from '../components/Nav';
import CampaignGrid from '../components/CampainGrid';
import BottomMargin from '../components/BottomMargin';
import { useNavigation } from '@react-navigation/native';
import Grid from '../components/Grid';
import NavNoProfile from '../components/NavNoProfile';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const SponsoreData = [
    {
      id: '1',
      imageSource: require('../../assets/intern.jpg'),
      title: 'International Basket Market',
      goal: 10000,
      raised: 4500,
      daysLeft: 15,
      description: 'Example description 1',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023',
      isSponsored:true
    },
    {
        id: '2',
        imageSource: require('../../assets/garden.jpg'),
        title: 'Meza Foundation',
        goal: 10000,
        raised: 4500,
        daysLeft: 15,
        description: 'Everyone deserves healthcare',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ,date: '01/02/2023',
        isSponsored:true
      },
      {
        id: '3',
        imageSource: require('../../assets/garden.jpg'),
        title: 'Meza Foundation',
        goal: 10000,
        raised: 4500,
        daysLeft: 15,
        description: 'Everyone deserves healthcare',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ,date: '01/02/2023',
        isSponsored:true
      },   
      {
        id: '4',
        imageSource: require('../../assets/garden.jpg'),
        title: 'Meza Foundation',
        goal: 10000,
        raised: 4500,
        daysLeft: 15,
        description: 'Everyone deserves healthcare',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ,date: '01/02/2023',
        isSponsored:true
      },     
  ];

const AllSponsored = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation =useNavigation();
  const iconURL = require('../../assets/close.png')
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
        //console.error("Fetch Features error :",error);

      }
    }
    fetchAllSponsorData();
  },[userId])


  const handelback = () => {
    navigation.navigate('AllFeatures')
    
  };
  const campaignPress = (item) =>{
    console.log('Campaign Press:', item.id);
    navigation.navigate('Sponsored', {item})
  }


  // Filtering based on both search term and selected filter
  const filteredCampaigns = sponsorData
    .filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedFilter || campaign.featureType === selectedFilter)
    );

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{padding: 10}}>
      <NavNoProfile Title="Sponsored Campaign" iconURL={iconURL} onPress={handelback}/>

      {/* Search Box with Custom Icon */}
      <View style={styles.searchBox}>
        <View style={styles.searchInputWrapper}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Campaigns..."
            placeholderTextColor="gray"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
      </View>


      {/* Display Campaigns */}
      <View>
        {filteredCampaigns.map((campaign, index) => {
          // Group campaigns in pairs for grid-style display
          if (index % 2 === 0) {
            const item1 = filteredCampaigns[index];
            const item2 = filteredCampaigns[index + 1]; // Ensure there's a second item

            return (
              <Grid
                key={index}
                item1={item1}
                item2={item2}
                onPress1={() => campaignPress(item1)}
                onPress2={() => campaignPress(item2)}
                gridStyles={styles.SponsorGridStyles}
                imageStyles={styles.SponsorImageStyles}
              />
            );
          }
          return null; // If there is no second item, skip
        })}
      </View>

      <BottomMargin />
    </ScrollView>
    </SafeAreaView>
  );
};

export default AllSponsored;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBox: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  FeatureGridStyle: {
    margin: 1,
  },
  SponsorGridStyles: {
    flex: 1, // Equal space for each item in the row
    backgroundColor: '#27AE60',
    borderWidth: 1,
    borderColor: 'gray',
    height: 140, // Consistent height for items
    margin:1,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  SponsorImageStyles:{
    resizeMode: 'cover', width: '100%', height: 70 

  }
});

const pickerSelectStyles = {
  inputIOS: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#AB2525',
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  inputAndroid: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#AB2525',
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  placeholder: {
    color: 'white',
  },
};