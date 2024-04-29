import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import ContributionContainer from '../components/ContributionContainer';
import NavNoProfile from '../components/NavNoProfile';
import { useNavigation } from '@react-navigation/native';

const myContributions = [
  {
    id: 1,
    title: 'Solidarity for John Doe',
    contribution: 100,
    date: '01/07/20',
  },
  {
    id: 2,
    title: 'Solidarity for Felix',
    contribution: 50,
    date: '01/07/22',
  },
  {
    id: 3,
    title: 'Health Funding for Jim',
    contribution: 300,
    date: '01/07/24',
  },
];

const Contributions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const iconURL = require('../../assets/back.png');
  const navigation = useNavigation();

  // Filter contributions by title based on the search term
  const filteredContributions = myContributions.filter((contribution) =>
    contribution.title.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive matching
  );
  const handleBack = () =>{
    navigation.navigate('Home');
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        <NavNoProfile Title="All Contributions" iconURL={iconURL} onPress={handleBack}/>

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

        <View style={{ flexDirection: 'column', gap: 10 }}>
          {filteredContributions.map((contribution) => (
            <ContributionContainer
              key={contribution.id} // Ensure each element has a unique key
              title={contribution.title} // Passing data to the component
              contribution={contribution.contribution}
              date={contribution.date}
            />
          ))}
        </View>
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
});
