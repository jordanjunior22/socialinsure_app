import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const bannerImage = require('../../assets/banner.jpg');

const SocialBanner = ({Title,Content}) => {
  return (
    <View style={styles.container}>
      {/* Main Image */}
      <Image 
        source={bannerImage}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Overlay with a linear gradient background */}
      <LinearGradient 
        colors={['#18B8A8', '#0B524B']} // Define the gradient colors
        style={styles.overlay}        // Apply the styles to the gradient
        start={{ x: 0, y: 0 }}        // Gradient start point
        end={{ x: 1, y: 1 }}          // Gradient end point
      >
        <Text style={[styles.overlayText,{fontWeight:700,fontSize:18}]}>{Title}</Text>
        <Text style={[styles.overlayText,{fontSize:10}]}>{Content}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Full width of the screen
    height: 140,   // Fixed height
    position: 'relative', // Needed to position the overlay
    borderRadius: 20, // Rounded corners
    overflow: 'hidden', // Ensures children respect the border radius
    marginTop:20,

  },
  image: {
    width: '100%',  // Image fills the entire width
    height: 140,    // Image also has a fixed height
    borderRadius: 20, // Apply the same borderRadius to the image
  },
  overlay: {
    position: 'absolute',  // To position this view relative to its parent
    bottom: 0,              // Position at the bottom
    width: '100%',         // Fill the width of the parent
    height: 70,            // Fixed height for the overlay
    justifyContent: 'center', // Center the text vertically
    borderBottomLeftRadius: 20, // Add radius to bottom left corner
    borderBottomRightRadius: 20, // Add radius to bottom right corner
    paddingLeft:10
  },
  overlayText: {
    color: 'white', // White text for contrast against the dark overlay
    textAlign:'left',

  },
});

export default SocialBanner;
