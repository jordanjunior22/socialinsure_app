import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavNoProfile from '../components/NavNoProfile';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';


const Verification = () => {
  const [countries, setCountries] = useState([]);
  const [verifMethod, setVerifMethod] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null); // Store the selected country
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; 

  const passportIcon = require('../../assets/passport.png');
  const NICIcon = require('../../assets/id-card.png');
  const DriverIcon = require('../../assets/driver-license.png');
  const iconURL = require('../../assets/close.png')

  const handleVerificationMethod =(method)=>{
    setVerifMethod(method);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryItems = response.data.map((country) => ({
          label: country.name.common, // Country name for the picker
          value: country.cca3, // Unique identifier
          flag: country.flags.png, // Country flag URL
        }));
        setCountries(countryItems);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <View style={styles.container}>
      <NavNoProfile
        Title="Verification"
        onPress={() => {
          navigation.navigate('AllFeatures');
        }}
        iconURL={iconURL}
      />
      <SubHeadingNoLink heading="Nationality" />
        <RNPickerSelect
            onValueChange={(value) => {
            const selected = countries.find((country) => country.value === value);
            setSelectedCountry(selected);
            }}
            items={countries} // Use the dynamic list of countries
            style={pickerSelectStyles}
            placeholder={{ label: 'Select Nationality', value: null }}
        />
        <SubHeadingNoLink heading="Verify You Identity" />
        <Text>Upload one of the following verification documents</Text>
        <View style={{flexDirection:'column',alignItems:'center',gap:5}}>

            {verifMethod === 'National Identity Card' ? (
            <TouchableOpacity onPress={() => {handleVerificationMethod('National Identity Card');}} style={{ flexDirection: 'row', gap: 10,backgroundColor: '#18B8A8', padding: 10, width: '100%', borderRadius: 5, }}>
                <Image source={NICIcon} style={{ height: 20, width: 20 }} />
                <Text style={{color:'white',fontWeight:700}}>National Identity Card</Text>
            </TouchableOpacity>
            ):(
            <TouchableOpacity onPress={() => {handleVerificationMethod('National Identity Card');}} style={{ flexDirection: 'row', gap: 10, borderWidth: 1, borderColor: '#18B8A8', padding: 10, width: '100%', borderRadius: 5 }}>
                <Image source={NICIcon} style={{ height: 20, width: 20 }} />
                <Text>National Identity Card</Text>
            </TouchableOpacity>
            )}


            <TouchableOpacity onPress={()=>{handleVerificationMethod('Passport')}} style={{flexDirection:'row',gap:10,borderWidth:1,borderColor:'#18B8A8',padding: 10,width:"100%",borderRadius:5}}>
                <Image source={passportIcon} style={{height:20,width:20}}/>
                <Text>Passport</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{handleVerificationMethod('Drivers License')}} style={{flexDirection:'row',gap:10,borderWidth:1,borderColor:'#18B8A8',padding: 10,width:"100%",borderRadius:5}}>
                <Image source={DriverIcon} style={{height:20,width:20}}/>
                <Text>Drivers License</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

  },
  selectedItem: {
    flexDirection: 'row',
    backgroundColor: '#DB00FF',
    alignItems: 'center',
    padding: 10, // Ensure proper padding
  },
  image: {
    width: 30,
    height: 30,
  },
  selectedText: {
    color: 'white',
    paddingLeft: 10,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'lightgray',
    borderRadius: 4,
    backgroundColor: '#18B8A8',
    color: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#18B8A8',
    color: 'white',

  },
};

export default Verification;
