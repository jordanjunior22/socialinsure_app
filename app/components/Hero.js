import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Hero = ({ balance, onQuickTopUp, onMyContributions }) => {
  const {user} = useContext(UserContext);

  const formattedBalance = Number(user?.balance).toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
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
            <Text style={{ color: 'black' }}>My Contributions</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderButton2}>
            <Text style={{ color: '#18B8A8' }}>My Contributions</Text>
          </View>
        )}
      </View>

      
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View>
          <Text style={{ color: 'white'}}>Total Balance</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: 'white' }}>{formattedBalance}</Text>
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
    tintColor:'white'
   },
  hero: {
    flexDirection: 'column',
    backgroundColor: '#18B8A8',
    padding:15,
    marginTop: 20,
    gap: 10,
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
    backgroundColor: 'black',
    padding: 10,
    color: 'white',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0.5,
  },
  buttons2: {
    borderRadius: 50,
    borderColor: '#18B8A8',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
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
