import { StyleSheet, Text, View, FlatList } from 'react-native'

import React from 'react'
import CustomButton from './TodoButton';
import { useNavigation } from '@react-navigation/native';

const TodoScrollView = () => {
  const navigation = useNavigation();

  const creditCardData = false; //for id 1
  const imageUrl = false; //for id 2

  const onPress = (id) => {
      console.log(`Button pressed for action: ${id}`);
      switch (id) {
          case '1':
              navigation.navigate('PaymentSettings');
              break;
          case '2':
              navigation.navigate('ProfileDisplay');
              break;
          default:
              break;
      }
  };

  const todoButtonsData = [
      { id: '1', text: 'Add Debit Card 💳' },
      { id: '2', text: 'Add a Profile Picture 🙎🏻‍♂️' },
  ];

  const filteredButtons = todoButtonsData.filter(item => {
      return (item.id === '1' && !creditCardData) || (item.id === '2' && !imageUrl);
  });

  if (filteredButtons.length === 0) {
      return null; // If no buttons to render, return null
  }

  const renderItem = ({ item }) => {
      return <CustomButton onPress={() => onPress(item.id)} buttonText={item.text} />;
  };

  return (
      <View style={{ marginTop: 30, flexDirection: 'column', gap: 10 }}>
          {filteredButtons.length > 0 && (
              <>
                  <Text style={{ textAlign: 'right', color: '#18B8A8', fontWeight: 'bold' }}>My To-dos &gt;</Text>
                  <FlatList
                      data={filteredButtons}
                      keyExtractor={(item) => item.id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderItem}
                      contentContainerStyle={styles.todoButtonContainer}
                  />
              </>
          )}
      </View>
  );
};

export default TodoScrollView;

const styles = StyleSheet.create({
  todoButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 5,
  },
});
