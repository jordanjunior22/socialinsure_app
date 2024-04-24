import { StyleSheet, Text, View, FlatList } from 'react-native'

import React from 'react'
import CustomButton from './TodoButton';

const TodoScrollView = () => {
    const onPress = () => {
        console.log('Button pressed');
      };
    const todoButtonsData = [
        { id: '1', text: 'Add Debit Card 💳' },
        { id: '2', text: 'Enable Auto Top Up 💲' },
        { id: '3', text: 'Enable FaceID / Fingerprint' },
        { id: '4', text: 'Add a Profile Picture 🙎🏻‍♂️' },
      ];
      const renderItem = ({ item }) => (
        <CustomButton onPress={onPress} buttonText={item.text} />
      );


  return (
        <View style={{ marginTop:30, flexDirection: 'column', gap:10}}>
          <Text style={{ textAlign: 'right', color:'black', opacity:0.5 }}>My To-dos</Text>
          <FlatList
            data={todoButtonsData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={styles.todoButtonContainer}
          />
        </View>
  )
}

export default TodoScrollView

const styles = StyleSheet.create({
    todoButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:5,
       },
})