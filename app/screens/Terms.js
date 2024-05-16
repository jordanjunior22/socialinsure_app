import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import SocialBanner from '../components/SocialBanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavNoProfile from '../components/NavNoProfile';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import Checkbox from '../components/Checkbox';
import CustomButton from '../components/Button';
import ButtonFull from '../components/ButtonFull';

const Terms = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  const iconURL = require('../../assets/back.png');
  const { item, verifMethod, selectedCountry, selectedImage } = route.params;

  const handleGoBack = () => {
    navigation.navigate('UploadId', { item, verifMethod, selectedCountry, selectedImage });
  };

  const handleAccept = () => {
    if (isChecked) {
      navigation.navigate('Payment', { item, verifMethod, selectedCountry, selectedImage });
    } else {
      Alert.alert('You have not clicked the checkbox');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <NavNoProfile iconURL={iconURL} Title='Terms & Condition' onPress={handleGoBack} />
        <SocialBanner Title={item.title} Content={item.description} />
        <SubHeadingNoLink heading='Terms & Conditions' />
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={true}
          style={styles.termsContainer}
        >
          <Text style={styles.termsText}>{item.terms}</Text>
        </ScrollView>
        <Checkbox
          isChecked={isChecked}
          label='I hereby accept the terms and conditions of this services'
          onToggle={() => setIsChecked(!isChecked)}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonFull name='Accept Terms & Conditions' onPress={handleAccept} />
      </View>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',

  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  termsContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
    height: 180,
  },
  termsText: {
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'center',
  },
});
