import React, { useContext,useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,Platform } from 'react-native';
import SocialFeaturesContainer from './SocialFeaturesContainer';
import { useNavigation } from '@react-navigation/native';
import SubHeadingLink from './SubHeadingLink';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const SocialFeatures = ({Network,setNoNetwork}) => {
  const [verification, setVerification] = useState(null);
  const [Features, setFeatures] = useState([])
  const {user} = useContext(UserContext)
  const navigation= useNavigation()
  const [MissedContribution,setMissedContribution] = useState([]);
  const userId = user?._id;
 
  const INTERVAL = 5000; // Interval in milliseconds (5 seconds)


  useEffect(() => {
    const fetchAllFeatureData = async () =>{
      try{
        if(userId){
          const FeatureResponse = await axios.get(`${BACKEND_URL}/features/${userId}`);
          setFeatures(FeatureResponse.data);
          setNoNetwork(false);
        }

      }catch(error){
        //console.error("Fetch Features error :",error);
        setNoNetwork(true);
      }
    }

    const fetchVerificationData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${BACKEND_URL}/verification/${userId}`);
          setVerification(response.data);
          setNoNetwork(false);
        }
      } catch (error) {
        //console.error('Error fetching verification data:', error);
        setNoNetwork(true);

      }
    };


    const fetchMissedContributionData = async () => {
      try {
        if (userId) {
          const MissedContributionResponse = await axios.get(`${BACKEND_URL}/missedContributions/${userId}`)
          setMissedContribution(MissedContributionResponse.data);
          setNoNetwork(false);
        }
      } catch (error) {
        //console.error('Error fetching contribution data:', error);
        setNoNetwork(true);
      }
    };


    fetchAllFeatureData();
    fetchVerificationData();
    fetchMissedContributionData();

    const interval = setInterval(() => {
      fetchAllFeatureData();
      fetchVerificationData();
      fetchMissedContributionData();
    }, INTERVAL);
  
    // Clean up interval on component unmount
    return () => clearInterval(interval);

  }, [userId,Network]); // Run effect when userId changes
  

   //console.log(Features)
  //console.log(verification)


  const handleSocialFeaturePress = (item) => {
    console.log(`Social Feature pressed has ID: ${item._id}`);
    if(item.subReq === 'Yes' && !user?.isAWellBeingSubscriber && (!verification || verification?.status === 'Not Started' || verification?.status === 'Rejected')){
      navigation.navigate('SubReqFeatureForNonMembers', { item });
    }else if(item.subReq === 'Yes' && user?.isAWellBeingSubscriber && verification?.status === 'Approved'){
      navigation.navigate('SubReqFeatureForMembers', { item });
    }else if(item.subReq === 'Yes' && !user?.isAWellBeingSubscriber && verification?.status === 'Pending'){
      navigation.navigate('PendingMembers');
    }
    else if(item.subReq === 'No'){
      navigation.navigate('NoSubReqFeature', { item });
    }else if(item.subReq === 'Yes' && !user?.isAWellBeingSubscriber && MissedContribution.length>2){
      navigation.navigate('RemovedMembers', { item });
    }
    else{
      throw "fatal error"
    }

  };

const firstThreeFeatures = Features.slice(0, 3);
  const renderSocialFeature = ({ item }) => (
    <SocialFeaturesContainer
      imageSource={item.imageSource}
      title={item.title}
      description={item.description}
      onPress={() => handleSocialFeaturePress(item)}
      customContainerStyle={{    
          backgroundColor : 'black',
          borderRadius:20,
          ...Platform.select({
            ios: {
              width: 130, // Width for iOS
            },
            android: {
              width:120,
            },
          }),
        }}
      customIconImageStyle={{    
          width:'100%',
          height:110,}}
    />
  );

  return (
    <View>
      <SubHeadingLink Title='Social Insure' Cmd='View All >' onPress={()=>{navigation.navigate('AllFeatures')}}/>
      <FlatList
        data={firstThreeFeatures}
        renderItem={renderSocialFeature}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:5,marginTop:10}}
      />

    </View>
  );
};

export default SocialFeatures;

const styles = StyleSheet.create({
  socialContainer: {},
  socialContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
   
  },
});
