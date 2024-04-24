import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import ProgressBar from 'react-native-progress/Bar';
import Button from '../components/Button'

const FeaturedCampaignsContainer = ({ id,imageSource, title, onPress,Goal,Raised,daysLeft }) => {
    const progress = Raised / Goal;
    const handleContribute = (id) => {
      console.log(`Handle Contribute for ID: ${id}`);
      // You can perform other actions here when the button is pressed
    };
  
      return (
    <View >
      <TouchableOpacity style = {styles.socialContainer} onPress={onPress}>
        <Image source={imageSource} style={styles.iconimage} />
        
        <View style={{padding:5, flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <Text style={{fontSize:12, fontWeight:700}}>{title}</Text>
            <Text style={{color:'#24FF00',fontSize:12,fontWeight:700}}>{daysLeft} days left</Text>
        </View>

        <ProgressBar progress={progress} width={240} height={6} />

        <View style={styles.figures}>
            <View>
                <Text>Goal</Text>
                <Text style={{fontWeight:700,color:'#24FF00'}}>USD $ {Goal}</Text>
            </View>
            <View>
                <Text>Raised</Text>
                <Text style={{fontWeight:700,color:'#24FF00'}}>USD $ {Raised}</Text>
            </View>
        </View>
        <Button name="Contribute" onPress={() => handleContribute(id)}/>
      </TouchableOpacity>
    </View>
  )
}

export default FeaturedCampaignsContainer

const styles = StyleSheet.create({
    socialContainer : {
      backgroundColor : '#FFFFFF',
      alignItems : 'center',
      borderRadius : 20,
      overflow: 'hidden',
      width:250,
      height:'fit',
      borderWidth:1,
      borderColor:'lightgray'
    },
    iconimage : {
        width : '100%',
        height : 170,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
    },
    figures : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      width : "100%",
      padding:10, 
    }
  })