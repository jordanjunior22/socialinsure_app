import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ContributionContainer from '../components/ContributionContainer';
import NavNoProfile from '../components/NavNoProfile';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const Contributions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contributions, setContributions] = useState([]);
  const { user } = useContext(UserContext);
  const iconURL = require('../../assets/back.png');
  const navigation = useNavigation();
  const userId = user?._id;

  useEffect(() => {
    const fetchAllContributions = async () => {
      try {
        if (userId) {
          const contributionResponse = await axios.get(`${BACKEND_URL}/contributions/${userId}`);
          setContributions(contributionResponse.data);
        }
      } catch (error) {
        console.error("Fetch Contribution error:", error);
      }
    };

    fetchAllContributions();
    const intervalId = setInterval(fetchAllContributions, 1 * 60 * 1000); // Fetch every 1 minute
    return () => clearInterval(intervalId);
  }, [userId]);

  // Filter contributions by title based on the search term
  const filteredContributions = contributions.filter((contribution) =>
    contribution.campaign_title && contribution.campaign_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <NavNoProfile Title="All Contributions" iconURL={iconURL} onPress={handleBack} />

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

      <ScrollView>
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
    </SafeAreaView>
  );
};

export default Contributions;

const styles = StyleSheet.create({
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
  noContributionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noContributionsText: {
    fontSize: 18,
    color: 'gray',
  },
});
