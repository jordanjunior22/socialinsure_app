import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Nav from '../components/Nav';
import CampaignGrid from '../components/CampainGrid';
import BottomMargin from '../components/BottomMargin';
import { useNavigation } from '@react-navigation/native';


const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation =useNavigation();

  // Example campaign data
  const campaignData = [
    {
      id: '1',
      imageSource: require('../../assets/ted.jpg'),
      title: 'Solidarity For John Deo',
      goal: 10000,
      raised: 4500,
      daysLeft: 15,
      description: 'Example description 1',
      featureType: 'Social Wellbeing',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023'
    },
    {
      id: '2',
      imageSource: require('../../assets/pah.jpg'),
      title: 'Health Contribution',
      goal: 10000,
      raised: 8000,
      daysLeft: 15,
      description: 'Example description 2',
      featureType: 'Social Health',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023'
    },
    {
      id: '3',
      imageSource: require('../../assets/pah.jpg'),
      title: 'Medical Assistance Fund',
      goal: 20000,
      raised: 10000,
      daysLeft: 10,
      description: 'Example description 3',
      featureType: 'Medical Aid',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023'
    },
    {
      id: '4',
      imageSource: require('../../assets/ted.jpg'),
      title: 'Solidarity For Jane Doe',
      goal: 15000,
      raised: 6000,
      daysLeft: 5,
      description: 'Example description 4',
      featureType: 'Social Wellbeing',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ,date: '01/02/2023'
    },
  ];

  const handleContribute = (item) => {
    console.log(' Contribute Button:', item.id);
    navigation.navigate('ContributionPayment', {item})
    
  };
  const campaignPress = (item) =>{
    console.log('Campaign Press:', item.id);
    navigation.navigate('CampaignSponsorDetailsContainer', {item})
  }

  // Extract unique feature types for filtering
  const uniqueFeatureTypes = Array.from(
    new Set(campaignData.map((data) => data.featureType))
  );

  // Filter items for the picker
  const filterItems = uniqueFeatureTypes.map((type) => ({
    label: type,
    value: type,
  }));

  // Filtering based on both search term and selected filter
  const filteredCampaigns = campaignData
    .filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedFilter || campaign.featureType === selectedFilter)
    );

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{padding: 10}}>
      <Nav Title="All Campaigns" />

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

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Filter</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedFilter(value)}
          items={filterItems}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Feature', value: null }}
          useNativeAndroidPickerStyle={false}
        />
      </View>

      {/* Display Campaigns */}
      <View>
        {filteredCampaigns.map((campaign, index) => {
          // Group campaigns in pairs for grid-style display
          if (index % 2 === 0) {
            const item1 = filteredCampaigns[index];
            const item2 = filteredCampaigns[index + 1]; // Ensure there's a second item

            return (
              <CampaignGrid
                key={index}
                item1={item1}
                item2={item2}
                onPress1={() => handleContribute(item1)}
                onPress2={() => handleContribute(item2)}
                gridStyles={styles.FeatureGridStyle}
                handleCampaignPress1={() =>campaignPress(item1)}
                handleCampaignPress2={() =>campaignPress(item2)}
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

export default Campaigns;

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