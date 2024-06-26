import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text,View } from 'react-native';
import Nav from '../components/Nav';
import SocialBanner from '../components/SocialBanner';
import { useNavigation } from '@react-navigation/native';
import SubHeadingNoLink from '../components/SubHeadingNoLink';
import SponsorGrid from '../components/SponsorGrid';
import SubHeadingLink from '../components/SubHeadingLink';
import BottomMargin from '../components/BottomMargin';
import FeatureGrid from '../components/FeatureGrid';

export default function AllFeatures() {
    const navigation = useNavigation();
    const iconURL = require('../../assets/back.png')
    const Title = 'Social Insure'
    const Content = 'Social Insure liaises you with a blend of healthier life-Social Well-being, Social Kids, Social Patron, Social Entrepreneur, and Social Commune.'
  return (
    <SafeAreaView style={{ flex: 1}}>
    <ScrollView style={{padding: 10}}>
        <Nav onPress={() => navigation.navigate('Home')} iconURL={iconURL} Title="Products & Services" />
        <SocialBanner Title={Title} Content={Content}/>
        <SubHeadingNoLink heading='Features & Services'/>
        <FeatureGrid/>
        <SponsorGrid/>
        <BottomMargin/>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
