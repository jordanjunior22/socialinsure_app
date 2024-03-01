import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ProfileDisplay = () => {
    const navigation = useNavigation();

    const handleImageClick = () => {
        navigation.navigate('ProfileEdit');
      };
  return (
    <View style={{margin:20, }}>
        <View style={{borderRadius: 50,backgroundColor:'green',height:70, width:70, overflow:'hidden', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Image source={require('../../../assets/logonobg2.png')} style={styles.image} />
        </View>
        <Text style={{padding:10}}>My Profile</Text>
        <View style={{marginTop:20, flexDirection:'column',gap:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',borderColor: 'gray',borderBottomWidth: 1,padding:10}}>
                <Text>User ID</Text>
                <TextInput
                style={styles.input}
                placeholder="User ID"
                value="00000000001" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',borderColor: 'gray',borderBottomWidth: 1,padding:10}}>
                <Text>Association Code</Text>
                <TextInput
                style={styles.input}
                placeholder="Association Code"
                value="00000000001" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',borderColor: 'gray',borderBottomWidth: 1,padding:10}}>
                <Text>Display Profile</Text>
                <Image source={require('../../../assets/ted.jpg')} style={{width:50,height:50, borderRadius:50}} />

            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',borderColor: 'gray',borderBottomWidth: 1,padding:10}}>
                <Text>Name</Text>
                <TextInput
                style={styles.input}
                placeholder="Name"
                value="Flavius Prahlad" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>
            
            
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',borderColor: 'gray',borderBottomWidth: 1,padding:10}}>
                <Text>Email</Text>
                <TextInput
                style={styles.input}
                placeholder="Email"
                value="flaviusprahlad@socialinsure.org" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',borderColor: 'gray',borderBottomWidth: 1,padding:10}}>
                <Text>Phone Number</Text>
                <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value="17037258183" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <TouchableOpacity onPress={handleImageClick} style={{backgroundColor: 'green',padding:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProfileDisplay

const styles = StyleSheet.create({
    image: {
        width: 30,
        height: 50,
      },
      input: {
        textAlign:'right',
        width:'80%'
      },
})