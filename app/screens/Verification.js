import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavNoProfile from '../components/NavNoProfile';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../components/Button'
import BottomMargin from '../components/BottomMargin';

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
  const passportIconWhite = require('../../assets/passportWhite.png');
  const NICIconWhite = require('../../assets/id-cardWhite.png');
  const DriverIconWhite = require('../../assets/driver-licenseWhite.png');

  const iconURL = require('../../assets/close.png')


  const handleVerificationMethod =(method)=>{
    setVerifMethod(method);
  }
  const handleContinue = () =>{
    navigation.navigate('UploadId',{item,verifMethod,selectedCountry})
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
        countryItems.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryItems);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{padding:10,flexDirection:'column',alignItems:'center'}}>
      <View>
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
                <Image source={NICIconWhite} style={{ height: 20, width: 20 }} />
                <Text style={{color:'white',fontWeight:700}}>National Identity Card</Text>
            </TouchableOpacity>
            ):(
            <TouchableOpacity onPress={() => {handleVerificationMethod('National Identity Card');}} style={{ flexDirection: 'row', gap: 10, borderWidth: 1, borderColor: '#18B8A8', padding: 10, width: '100%', borderRadius: 5 }}>
                <Image source={NICIcon} style={{ height: 20, width: 20 }} />
                <Text>National Identity Card</Text>
            </TouchableOpacity>
            )}

            {verifMethod === 'Passport' ? (
            <TouchableOpacity onPress={() => {handleVerificationMethod('National Identity Card');}} style={{ flexDirection: 'row', gap: 10,backgroundColor: '#18B8A8', padding: 10, width: '100%', borderRadius: 5, }}>
                <Image source={passportIconWhite} style={{height:20,width:20}}/>
                <Text style={{color:'white',fontWeight:700}}>Passport</Text>
            </TouchableOpacity>
            ):(
            <TouchableOpacity onPress={()=>{handleVerificationMethod('Passport')}} style={{flexDirection:'row',gap:10,borderWidth:1,borderColor:'#18B8A8',padding: 10,width:"100%",borderRadius:5}}>
              <Image source={passportIcon} style={{height:20,width:20}}/>
              <Text>Passport</Text>
            </TouchableOpacity>
            )}

            {verifMethod === 'Drivers License' ? (
            <TouchableOpacity onPress={() => {handleVerificationMethod('Drivers License');}} style={{ flexDirection: 'row', gap: 10,backgroundColor: '#18B8A8', padding: 10, width: '100%', borderRadius: 5, }}>
                <Image source={DriverIconWhite} style={{height:20,width:20}}/>
                <Text style={{color:'white',fontWeight:700}}>Drivers License</Text>
            </TouchableOpacity>
            ):(
            <TouchableOpacity onPress={()=>{handleVerificationMethod('Drivers License')}} style={{flexDirection:'row',gap:10,borderWidth:1,borderColor:'#18B8A8',padding: 10,width:"100%",borderRadius:5}}>
              <Image source={DriverIcon} style={{height:20,width:20}}/>
              <Text>Drivers License</Text>
            </TouchableOpacity>
            )}

        </View>
      </View>
      <BottomMargin/>
      <CustomButton name='Continue' onPress={handleContinue}/>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center'
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
