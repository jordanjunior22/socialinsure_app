import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Nav from '../components/Nav';
import CampaignGrid from '../components/CampainGrid';
import BottomMargin from '../components/BottomMargin';
import { useNavigation} from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import NoNetwork from '../screens/NoNetwork'

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [campaign, setCampaign] = useState([]);
  const [contribution, setContribution] = useState([])
  const [features, setFeatures] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation =useNavigation();
  const {user} = useContext(UserContext)
  const userId = user?._id;
  const isAWellBeingSubscriber = user?.isAWellBeingSubscriber;
  const [loading,setLoading] = useState(true);
  const INTERVAL = 5000; // Interval in milliseconds (5 seconds)
  const [Network,setNoNetwork] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const campaignResponse = await axios.get(`${BACKEND_URL}/campaign/${userId}`);
          setCampaign(campaignResponse.data);

          const contributionResponse = await axios.get(`${BACKEND_URL}/contributions/${userId}`);
          setContribution(contributionResponse.data);

          const featureResponse = await axios.get(`${BACKEND_URL}/features/${userId}`);
          setFeatures(featureResponse.data); 
          
          setNoNetwork(false);
        }
      } catch (error) {
        //console.error("Fetch data error at campaign screen:", error);
        setNoNetwork(true);
      }finally{
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, INTERVAL);
    fetchData();
    return () => clearInterval(interval);
  }, [userId, contribution.paymentId,Network]);
  //console.log(contribution)

  const calculateDaysLeft = (endAt) => {
    const endDate = new Date(endAt);
    const currentDate = new Date();
    if (endDate < currentDate) {
        return 0; 
    }
    const timeDifference = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
};
  const campaignsWithDaysLeft = campaign.map(campaign => {
      const daysLeft = calculateDaysLeft(campaign.endAt);
      return { ...campaign, daysLeft }; // Add 'daysLeft' property to each campaign object
  });

  const filteredCampaign = campaignsWithDaysLeft.map(campaign => {
    const subReq = features.find(feature => feature._id === campaign.feature_id)?.subReq || false;
    return { ...campaign, subReq }; // Add 'subReq' property to each campaign object
  });

  const filteredCampaignWithPayment = filteredCampaign.map(campaign =>{
    const matchedContribution = contribution.find(contribution => contribution.campaign_id === campaign._id);
    const paymentId = matchedContribution ? contribution.paymentId : '';
    return { ...campaign, paymentId };
  })

  //console.log("campaogns",filteredCampaignWithPayment);

  const handleContribute = (item) => {
    //console.log(' Contribute Button:', item._id);
    const currentDate = new Date();
    const endDate = new Date(item.endAt);

    if (endDate < currentDate) {
        alert("This campaign has already ended. You can no longer contribute.");
    }else{
        navigation.navigate('ContributionPayment', {item})
    }
    
};
  const campaignPress = (item) =>{
    const currentDate = new Date();
    const endDate = new Date(item.endAt);
    if (endDate < currentDate) {
      alert("This campaign has already ended. You can no longer contribute.");
  }else{
    navigation.navigate('CampaignSponsorDetailsContainer', {item,isAWellBeingSubscriber})
  }
  }

  // Extract unique feature types for filtering
  const uniqueFeatureTypes = Array.from(
    new Set(filteredCampaignWithPayment.map((data) => data.featureType))
  );

  // Filter items for the picker
  const filterItems = uniqueFeatureTypes.map((type) => ({
    label: type,
    value: type,
  }));

  // Filtering based on both search term and selected filter
  const filteredCampaigns = filteredCampaignWithPayment
    .filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFilter === null || campaign.featureType === selectedFilter)
    );
// Filter out campaigns where the end date has passed
const activeCampaigns = filteredCampaigns.filter(campaign => calculateDaysLeft(campaign.endAt) > 0);

  return (
<SafeAreaView style={styles.container}>
    <ScrollView style={{ padding: 10 }}>
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
      {loading ? (
        // Render loading indicator if loading is true
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : activeCampaigns.length === 0 ? (
        // Render message when there are no active campaigns
        <Text>No campaigns available</Text>
      ) : (
        // Render active campaigns
        <View>
          {activeCampaigns.map((campaign, index) => {
            // Group campaigns in pairs for grid-style display
            if (index % 2 === 0) {
              const item1 = activeCampaigns[index];
              const item2 = activeCampaigns[index + 1]; // Ensure there's a second item

              return (
                <CampaignGrid
                  key={index}
                  item1={item1}
                  item2={item2}
                  onPress1={() => handleContribute(item1)}
                  onPress2={() => handleContribute(item2)}
                  gridStyles={styles.FeatureGridStyle}
                  handleCampaignPress1={() => campaignPress(item1)}
                  handleCampaignPress2={() => campaignPress(item2)}
                  subReq1={item1?.subReq}
                  subReq2={item2?.subReq}
                  isAWellBeingSubscriber={isAWellBeingSubscriber}
                  paymentId1={item1?.paymentId}
                  paymentId2={item2?.paymentId}
                />
              );
            }
            return null; // If there is no second item, skip
          })}
        </View>
      )}
      <BottomMargin />
    </ScrollView>
    {Network && (
        <NoNetwork/>
      )}
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
    borderRadius: 4,
    backgroundColor: '#27AE60',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderColor:'gray',
  },
  inputAndroid: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#27AE60',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderColor:'gray'
  },
  placeholder: {
    color: 'white',
  },
};