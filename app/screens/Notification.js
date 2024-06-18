import React, { useEffect, useState,useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavNoProfile from '../components/NavNoProfile';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import NoNetwork from '../screens/NoNetwork'


const NotificationItem = ({ title, message }) => (

  <View style={styles.notificationBox}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const NotificationList = () => {
  const [notificationsData,setnotificationsData]= useState([]);
  const [loading,setLoading] = useState(true);
  const iconURL = require('../../assets/close.png');
  const navigation = useNavigation();
  const INTERVAL = 5000; // Interval in milliseconds (5 seconds)
  const [Network,setNoNetwork] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
    try{
      const notificationResponse = await axios.get(`${BACKEND_URL}/notifications`);
      setnotificationsData(notificationResponse.data);
      //console.log('done FETCH');
      setNoNetwork(false);
    }catch(error){
      //console.error("Notification Error : ",error);
      //navigation.replace('NoNetwork');
      setNoNetwork(true);

    }finally{
      setLoading(false);
    }
    }
      
    const interval = setInterval(fetchData, INTERVAL);
    fetchData();
    return () => clearInterval(interval);

  },[Network])
  

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavNoProfile Title='Notifications' iconURL={iconURL} onPress={handleBack}/>
      {notificationsData.length === 0 && !loading ? (
        <View style={styles.noNotificationContainer}>
          <Text style={styles.noNotificationText}>No notifications</Text>
        </View>
      ) : (
        <FlatList
          data={notificationsData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <NotificationItem title={item.title} message={item.message} />}
        />
      )}
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

export default NotificationList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  notificationBox: {
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10, // Space between notifications
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    color: '#495057',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
},
noNotificationContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
noNotificationText: {
  fontSize: 18,
  color: '#495057',
},
});
