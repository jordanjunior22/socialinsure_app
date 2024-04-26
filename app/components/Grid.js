import React from 'react';
import {View, StyleSheet} from 'react-native';
import SocialFeaturesContainer from './SocialFeaturesContainer';


export default function Grid({ item1, item2, onPress1, onPress2, gridStyles,imageStyles }) {

  return (
    <View style={styles.row}>

      <View style={gridStyles}>
        <SocialFeaturesContainer
          imageSource={item1.imageSource}
          title={item1.title}
          description={item1.description}
          customIconImageStyle={imageStyles}
          onPress={onPress1}
        />
      </View>
      {item2 && ( // Check if item2 exists before rendering
        <View style={gridStyles}>
          <SocialFeaturesContainer
            imageSource={item2.imageSource}
            title={item2.title}
            description={item2.description}
            customIconImageStyle={imageStyles}
            onPress={onPress2}
          />
        </View>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row', // Horizontal alignment for two-column layout
      justifyContent: 'space-between', // Even spacing between items
    },
  });
