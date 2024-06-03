import { StyleSheet, Text, View, FlatList } from 'react-native'

import React, { useContext } from 'react'
import CustomButton from './TodoButton';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

const TodoScrollView = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const phoneNumber = user?.phoneNumber; //for id 1
  const imageUrl = user?.imageUrl; //for id 2

  const onPress = (id) => {
      console.log(`Button pressed for action: ${id}`);
      switch (id) {
          case '1':
              navigation.navigate('ProfileDisplay');
              break;
          case '2':
              navigation.navigate('ProfileDisplay');
              break;
          default:
              break;
      }
  };

  const todoButtonsData = [
      { id: '1', text: 'Add Profile Picture 🙎🏻‍♂️' },
      { id: '2', text: 'Add Phone Number ' },
  ];

  const filteredButtons = todoButtonsData.filter(item => {
      return (item.id === '1' && !imageUrl) || (item.id === '2' && !phoneNumber);
  });

  if (filteredButtons.length === 0) {
      return null; // If no buttons to render, return null
  }

  const renderItem = ({ item }) => {
      return <CustomButton onPress={() => onPress(item.id)} buttonText={item.text} />;
  };

  return (
      <View style={{ marginTop: 20, flexDirection: 'column', gap:5 }}>
          {filteredButtons.length > 0 && (
              <>
                  <Text style={{ textAlign: 'right', color: 'black', fontWeight: 'bold',opacity:0.5 }}>My To-dos</Text>
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
