import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Hero = ({ balance, onQuickTopUp, onMyContributions }) => {
  const {user} = useContext(UserContext);

  return (
    <View style={styles.hero}>
      <View style={styles.hero_top}>
        {onQuickTopUp ? (
          <TouchableOpacity onPress={onQuickTopUp} style={styles.buttons}>
            <Text style={{ color: 'white' }}>+ Quick Top Up</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderButton}>
            <Text style={{ color: 'white' }}>+ Quick Top Up</Text> 
          </View>
        )}
        
        {onMyContributions ? (
          <TouchableOpacity onPress={onMyContributions} style={styles.buttons2}>
            <Text style={{ color: '#18B8A8' }}>My Contributions</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderButton2}>
            <Text style={{ color: '#18B8A8' }}>My Contributions</Text>
          </View>
        )}
      </View>

      
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View>
          <Text style={{ color: 'black', opacity: 0.5 }}>My Account Balance</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#18B8A8' }}>${user?.balance}</Text>
        </View>
          <Image source={require('../../assets/logonobg.png')} style={styles.iconimage}/>
      </View>

    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  iconimage: {
    width: 50,
    height: 80,
    tintColor:'#18B8A8'
   },
  hero: {
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    padding: 20,
    marginTop: 20,
    gap: 50,
    borderRadius: 20,
    borderColor: '#18B8A8',
    borderWidth: 1,
  },
  hero_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    borderRadius: 50,
    backgroundColor: '#AB2525',
    padding: 10,
    color: 'white',
    borderRadius: 10,
  },
  buttons2: {
    borderRadius: 50,
    borderColor: '#18B8A8',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  placeholderButton: {
    borderRadius: 50,
    backgroundColor: '#AB2525',
    padding: 10,
    borderRadius: 10,
    opacity: 0.5, // To indicate it's not interactive
  },
  placeholderButton2: {
    borderRadius: 50,
    borderColor: '#18B8A8',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    opacity: 0.5, // To indicate it's not interactive
  },
});
