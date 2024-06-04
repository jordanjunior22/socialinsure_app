import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../context/UserContext'
import SubHeadingNoLink from '../components/SubHeadingNoLink'
import PenaltyCal from '../components/PenaltyCal'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import StaticInput from '../components/StaticInput'
import { CardField, useStripe } from '@stripe/stripe-react-native';
import ButtonFull from '../components/ButtonFull';

const Penalty = () => {
    const {user} = useContext(UserContext);
    const [foundCampaigns,setFoundCampaigns]= useState([])
    const [loading, setLoading] = useState(false);
    const [compaigns, setCampaign] = useState([]);
    const navigation =useNavigation();
    const iconUrl = require('../../assets/back.png');
    const userId = user._id;
    const [missedContribution,setMissedContribution] = useState([]);
    const [total,setTotal] = useState(0);
    const PenaltyFees = 50;
    const cardIcon = require('../../assets/creditcard.png')
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [paymentID,setPayamentID] = useState('');
    const email = user.email;
    const fullName = user.firstName + ' ' + user.lastName;
   
    const goBack = () =>{
      navigation.navigate('Account')
    }

    const contributionDataArray = foundCampaigns.map(campaign => ({
      campaign_id: campaign._id,
      campaign_title: campaign.title,
      user_id : userId,
      fullName : fullName,
      amount : campaign.fees,
      email : email,
      paymentId: paymentID
    }));



    useEffect(()=>{
      const fetchData = async () => {
      if(userId){
        try{
          const campaignResponse = await axios.get(`${BACKEND_URL}/campaign`);
          setCampaign(campaignResponse.data);

          const MissedContributionResponse = await axios.get(`${BACKEND_URL}/missedContributions/${userId}`)
          setMissedContribution(MissedContributionResponse.data);

          const missedCampaignIds  = MissedContributionResponse.data.map(contribution => contribution.campaign_id);
          
          const missedCampaigns = campaignResponse.data.filter(campaign => missedCampaignIds.includes(campaign._id));
          setFoundCampaigns(missedCampaigns);

          const total = foundCampaigns.reduce((accumulator, campaign) => accumulator + campaign.fees, 0) + PenaltyFees;
          setTotal(total)
          initializePaymentSheet();
          
        }catch(error){
          console.log('Missed Contribution API error at penalty: ',error)
        }
      }
    }

    fetchData();
    },[userId,total])
    
    
    const metaData = {
      userId,
      total
    };
    //console.log(foundCampaigns);


    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${BACKEND_URL}/re-subcribe-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metaData: metaData, 
          amount: total,
          currency: 'usd', 
      }),
      });
      const { paymentIntent, ephemeralKey, customer,publishableKey,paymentIntentID} = await response.json();
      setPayamentID(paymentIntentID);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
        paymentIntentID,
      };
    }

    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Social Insure",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };

    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
      setLoading(true);
      if (error) {
        Alert.alert('Error', error);
        console.error("error occured",error)
      }else{
        
        //navigation.navigate('SuccessFeedback');
        try{
          const Contributionresponse = await fetch(`${BACKEND_URL}/paid-contributions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({contributionDataArray: contributionDataArray}),
          });

          if(Contributionresponse.status === 201){
            setLoading(false);
            navigation.navigate('SuccessFeedback');
          }
        }catch(error){
          setLoading(false);
          console.error("error",error);
        }
      }
      }
    
    useEffect(() => {
      if(total){
        initializePaymentSheet();
      }
    }, [total]); 


    return (
      <SafeAreaView style={{flex:1,padding:10}}>
        <NavNoProfile Title='Re-Subcription'  iconURL={iconUrl} onPress={goBack}/>
        <Text style={{backgroundColor:'#AB2525',color:'white',textAlign:'center',fontSize:18,borderRadius:10}}>Fees To Be Paid</Text>
        <SubHeadingNoLink heading='Missed Campaigns'/>
        <Text style={{marginBottom:10}}>You will have to pay all the campaign you have missed and the penalty fee</Text>
        {foundCampaigns.map((campaign,index) => (
            <PenaltyCal key={index} item={campaign}/>
        ))}
        <Text style={{backgroundColor:'#18B8A8',color:'white',fontSize:25}}>Penalty Fees <Text style={{fontWeight:'bold'}}>${PenaltyFees}</Text> </Text>
        <StaticInput amount={total}/>
        <ButtonFull name='Credit/Debit Cart' onPress={openPaymentSheet} imageIcon={cardIcon}/>

        
        {!loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )}
      </SafeAreaView>
    )
}

export default Penalty

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
},
})