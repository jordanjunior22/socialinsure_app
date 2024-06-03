import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity,ScrollView, SafeAreaView,Alert, ActivityIndicator} from 'react-native'
import React, { useState,useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import Nav from '../../components/Nav';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
const ProfileDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const iconURL = require('../../../assets/close.png')
    const [selectedImage, setSelectedImage] = useState(null);
    const {user} = useContext(UserContext);
  console.log("users from storage PROFILE SCREEN",user);  


  const defaultProfileImage = user?.imageUrl && user.imageUrl !== '' ? { uri: user.imageUrl } : require('../../../assets/profile.png');
  const pickImage = async () => {
      // Ask for permissions if needed
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
  
      // Open the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Optional, for aspect ratio
        quality: 1, // High quality
      });
      //console.log(result);
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        console.log('Selected Image URI:', result.assets[0].uri);

      }
    };

    const saveProfile = async () => {
      setIsLoading(true);
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage, 
          name: 'profile.jpg', // Example name, can be anything
          type: 'image/jpeg', // Example type, change based on image type
        });
        formData.append('userId', user?._id);
    
        try {
          const response = await axios.post(`${BACKEND_URL}/uploadprofile`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Required for file uploads
            },
          });
    
          if (response.status === 200) {
            setIsLoading(false);
            Alert.alert('Profile picture updated successfully!');
          } else {
            Alert.alert('Failed to update profile picture.');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('An error occurred while updating profile picture.');
        }
      } else {
        Alert.alert('Please select an image to upload.');
      }
    };

    
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{padding:10}}>
        <Nav onPress={() => navigation.navigate('Home')} Title='My Profile' iconURL={iconURL}/>
    
        <Text style={{marginTop:20, fontSize:12, color:'blue'}}>Editing your profile is disabled, Please contact support on <Text style={{fontWeight:700}}>+1 703 725-8183</Text> or email <Text  style={{fontWeight:700}}>accounts@socialinsure.com</Text></Text>
        
        <View style={{marginTop:30,flexDirection:'column'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',backgroundColor:'#27AE60'}}>
                <Text style={{color:'white',padding:4}}>User ID</Text>
                <TextInput
                style={[styles.input,{color:'white',opacity:0.9,padding:4}]}
                placeholder="User ID"
                value={user?._id} // Set the initial value for the name
                editable={false} // Make the input read-only
                
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{padding:4}}>Association Code</Text>
                <TextInput
                style={[styles.input,{padding:4}]}
                placeholder="Association Code"
                value="00000000000" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',backgroundColor:'#18B8A8'}}>
                <Text style={{color:'white',padding:4}}>Name</Text>
                <TextInput
                style={[styles.input,{color:'white',opacity:0.9,padding:4}]}
                placeholder="Name"
                value={user?.firstName} // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>
            
            
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{padding:4}}>Email</Text>
                <TextInput
                style={[styles.input,{padding:4}]}
                placeholder="Email"
                value={user?.email} // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#18B8A8'}}>
                <Text style={{color:'white',padding:4}}>Phone Number</Text>
                <TextInput
                style={[styles.input,{color:'white',padding:4}]}
                placeholder="Phone Number"
                value={user?.phoneNumber} // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row', gap:30, alignItems:'center',padding:10, marginTop:10}}>

                <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={pickImage} >
                    
                  <Image source={selectedImage ? { uri: selectedImage } : defaultProfileImage} style={styles.image} />
                    
                    <View style={styles.iconContainer}>
                      <Image source={require('../../../assets/camera.png')} style={styles.icon}/>
                    </View>
                  </TouchableOpacity>
                </View>
                
                <Text style={{color:'blue',fontWeight:700}}>Change Profile Picture</Text>
            </View>
            
            <TouchableOpacity onPress={saveProfile} style={{backgroundColor: '#FF5733',padding:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Save</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileDisplay
//user.email
const styles = StyleSheet.create({
    // image: {
    //     width: 30,
    //     height: 50,
    //   },
      input: {
        textAlign:'right',

      },
      imageContainer: {
        position: 'relative', // Necessary to position the icon absolutely within this context
        width: 80, // Example width, adjust as needed
        height: 80, // Example height, adjust as needed
      },
      image: {
        width: '100%', // Full width of the container
        height: '100%', // Full height of the container
        borderRadius: 10, // Optional, adds a border radius to the image
      },
      iconContainer: {
        position: 'absolute', // Allows absolute positioning
        top: '50%', // Centers vertically
        left: '50%', // Centers horizontally
        transform: [{ translateX: -30 }, { translateY: -30 }], // Adjusts to truly center
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon:{
        width:60,
        height:60,
        tintColor:'gray'
      }
})