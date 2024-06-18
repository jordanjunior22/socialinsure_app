import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TextInput,ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ContributionContainer from '../components/ContributionContainer';
import NavNoProfile from '../components/NavNoProfile';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import NoNetwork from '../screens/NoNetwork'

const Contributions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contributions, setContributions] = useState([]);
  const { user } = useContext(UserContext);
  const iconURL = require('../../assets/back.png');
  const navigation = useNavigation();
  const userId = user?._id;
  const [loading,setLoading] = useState(true);
  const [Network,setNoNetwork] = useState(false);
  const INTERVAL = 5000; // Interval in milliseconds (5 seconds)


  useEffect(() => {
    const fetchAllContributions = async () => {
      try {
        if (userId) {
          const contributionResponse = await axios.get(`${BACKEND_URL}/contributions/${userId}`);
          setContributions(contributionResponse.data);
          setNoNetwork(false);
        }
      } catch (error) {
        //console.error("Fetch Contribution error:", error);
        setNoNetwork(true);
      }finally{
        setLoading(false);
      }
    };

    const interval = setInterval(fetchAllContributions, INTERVAL);
    fetchAllContributions();
    return () => clearInterval(interval);

  }, [userId,Network]);

  // Filter contributions by title based on the search term
  const filteredContributions = contributions.filter((contribution) =>
    contribution.campaign_title && contribution.campaign_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View style={{ paddingHorizontal: 10 }}>
      <NavNoProfile Title="All Contributions" iconURL={iconURL} onPress={handleBack} />

      </View>

      <View style={styles.searchBox}>
        <View style={styles.searchInputWrapper}>
          <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Contributions..."
            placeholderTextColor="gray"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)} // Update the search term
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        {filteredContributions.length === 0 ? (
          <View style={styles.noContributionsContainer}>
            <Text style={styles.noContributionsText}>No contributions found.</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'column', gap: 10 }}>
            {filteredContributions.map((contribution) => (
              <ContributionContainer
                key={contribution._id} // Ensure each element has a unique key
                title={contribution.campaign_title} // Passing data to the component
                contribution={contribution.amount}
                date={contribution.createdAt}
                paymentId={contribution.paymentId}
              />
            ))}
          </View>
          
        )}
      </ScrollView>
      {loading && (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="black" />
      </View>
      )}
      {Network && (
        <NoNetwork/>
      )}
    </SafeAreaView>
  );
};

export default Contributions;

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10
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
  noContributionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noContributionsText: {
    fontSize: 18,
    color: 'gray',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
},
});
