import { StyleSheet, Text, TouchableOpacity, View,Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import NavNoProfile from '../components/NavNoProfile'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomButton from '../components/Button'
import * as ImagePicker from 'expo-image-picker';
import BottomMargin from '../components/BottomMargin'
import ButtonFull from '../components/ButtonFull'

const UploadId = () => {
    const route = useRoute();
    const {item,verifMethod,selectedCountry} = route.params; 
    const navigation=useNavigation();
    const iconURL = require('../../assets/back.png');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleContinue = () =>{
        navigation.navigate('Terms', {item,verifMethod,selectedCountry,selectedImage})
    }
    const pickImage = async () => {
      // Ask for permissions if needed
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
  
      // Open the image picker
      const result = await ImagePicker.launchCameraAsync({
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
    const goBack=()=>{
        navigation.navigate('Verification',{item,verifMethod,selectedCountry})
    }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{padding:10, flexDirection:'column', justifyContent:'space-between', alignItems:'center',backgroundColor:'#F9F9F9'}}>
        <View style={{width:'100%'}}>
            <NavNoProfile Title="Upload Document" onPress={goBack} iconURL={iconURL}/>
            <Text style={{textAlign:'center', marginTop:30}}>Upload a Photo of your <Text style={{fontWeight:700}}>{verifMethod}</Text> </Text>
            
            {selectedImage ? (
            <TouchableOpacity onPress={pickImage} style={{borderWidth:1, borderColor:'#18B8A8', width:'100%',height:200,flexDirection:'row', justifyContent:'center', alignItems:'center',borderRadius:20}}>
               <Image source={{uri: selectedImage}} style={{ height:'100%', width: '100%',borderRadius:20 }}/>
            </TouchableOpacity>
            ):(
            <TouchableOpacity onPress={pickImage} style={{borderWidth:1, borderColor:'#18B8A8', width:'100%',height:200,flexDirection:'row', justifyContent:'center', alignItems:'center',borderRadius:20,backgroundColor:'#FFFFFF'}}>
                <Image source={require('../../assets/upload.png')} style={{ height: 40, width: 40 }}/>
            </TouchableOpacity>
            )}

        </View>
        <BottomMargin/>
        <ButtonFull name='Continue' onPress={handleContinue} disabled={!selectedImage}/>

    </View>
    </SafeAreaView>
  )
}

export default UploadId

const styles = StyleSheet.create({

})