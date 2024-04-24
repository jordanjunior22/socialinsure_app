import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Nav from '../../components/Nav';
import * as ImagePicker from 'expo-image-picker';

const ProfileDisplay = () => {
    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = useState(null);

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

    const saveProfile = () => {
        

      };

    
  return (
    <ScrollView style={{flex:1,padding:10}}>
        <Nav onPress={() => navigation.navigate('Home')} Title='My Profile' name="<Back"/>
    
        <Text style={{marginTop:20, fontSize:12, color:'blue'}}>Editing your profile is disabled, Please contact support on <Text style={{fontWeight:700}}>+1 703 725-8183</Text> or email <Text  style={{fontWeight:700}}>accounts@socialinsure.com</Text></Text>
        
        <View style={{marginTop:30,flexDirection:'column',gap:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',backgroundColor:'#18B8A8'}}>
                <Text style={{color:'white',padding:4}}>User ID</Text>
                <TextInput
                style={[styles.input,{color:'white',opacity:0.7,padding:4}]}
                placeholder="User ID"
                value="00000000001" // Set the initial value for the name
                editable={false} // Make the input read-only
                
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{padding:4}}>Association Code</Text>
                <TextInput
                style={[styles.input,{padding:4}]}
                placeholder="Association Code"
                value="00000000001" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',backgroundColor:'#18B8A8'}}>
                <Text style={{color:'white',padding:4}}>Name</Text>
                <TextInput
                style={[styles.input,{color:'white',opacity:0.7,padding:4}]}
                placeholder="Name"
                value="Flavius Prahlad" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>
            
            
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{padding:4}}>Email</Text>
                <TextInput
                 style={[styles.input,{padding:4}]}
                placeholder="Email"
                value="flaviusprahlad@socialinsure.org" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#18B8A8'}}>
                <Text style={{color:'white',padding:4}}>Phone Number</Text>
                <TextInput
                style={[styles.input,{color:'white',opacity:0.7,padding:4}]}
                placeholder="Phone Number"
                value="17037258183" // Set the initial value for the name
                editable={false} // Make the input read-only
                />
            </View>

            <View style={{flexDirection:'row', gap:30, alignItems:'center',padding:10}}>

                <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={pickImage} >
                    <Image source={ selectedImage ?{uri: selectedImage}: require('../../../assets/ted.jpg')} style={styles.image}/>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../../assets/camera.png')} style={styles.icon}/>
                    </View>
                  </TouchableOpacity>
                </View>
                
                <Text style={{color:'blue',fontWeight:700}}>Change Profile Picture</Text>
            </View>
            
            <TouchableOpacity onPress={saveProfile} style={{backgroundColor: '#DB00FF',padding:10}}>
                <Text style={{textAlign:'center',color:'white'}}>Save</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default ProfileDisplay

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
      }
})