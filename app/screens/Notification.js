import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavNoProfile from '../components/NavNoProfile';
import { useNavigation } from '@react-navigation/native';
// Sample data for multiple notifications
const notificationsData = [
  { id: '1', title: 'System Update', message: 'A new system update is available. Please update to the latest version.' },
  { id: '2', title: 'Promotion', message: 'Special offer! Get 20% off on your next purchase.' },
  { id: '3', title: 'Reminder', message: 'Don’t forget about your appointment tomorrow at 3 PM.' },
  { id: '4', title: 'Welcome', message: 'Welcome to our service! We are glad to have you.' },
  { id: '5', title: 'Alert', message: 'Security alert! Please change your password.' },
];

const NotificationItem = ({ title, message }) => (
  <View style={styles.notificationBox}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const NotificationList = () => {
  const iconURL = require('../../assets/close.png');
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavNoProfile Title='Notifications' iconURL={iconURL} onPress={handleBack}/>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem title={item.title} message={item.message} />}
      />
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
});
