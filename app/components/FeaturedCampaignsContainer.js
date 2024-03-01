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
        
        <View style={{padding:10, flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <Text style={{fontSize:12, fontWeight:600, width:'40%'}}>{title}</Text>
            <Text >{daysLeft} days left</Text>
        </View>

        <ProgressBar progress={progress} width={200} height={10} />

        <View style={styles.figures}>
            <View>
                <Text>Goal</Text>
                <Text>USD $ {Goal}</Text>
            </View>
            <View>
                <Text>Raised</Text>
                <Text>USD $ {Raised}</Text>
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
      backgroundColor : '#EEECEE',
      alignItems : 'center',
      borderRadius : 20,
      marginTop : 10,
      overflow: 'hidden',
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
  