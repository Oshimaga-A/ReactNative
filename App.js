import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import FoodItem from './components/FoodItem';
import FoodInput from './components/FoodInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [FavFoods, setFavFoods] = useState([]);

  function startAddFoodHandler() {
    setModalIsVisible(true);
  }

  function endAddFoodHandler() {
    setModalIsVisible(false);
  }

  function addFoodHandler(enteredFoodText) {
    setFavFoods((currentFavFoods) => [
      ...currentFavFoods,
      { text: enteredFoodText, id: Math.random().toString() },
    ]);
    endAddFoodHandler();
  }

  function deleteFoodHandler(id) {
    setFavFoods((currentFavFoods) => {
      return currentFavFoods.filter((Food) => Food.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Food"
          color="#F36A48"
          onPress={startAddFoodHandler}
        />
        <FoodInput
          visible={modalIsVisible}
          onAddFood={addFoodHandler}
          onCancel={endAddFoodHandler}
        />
        <View style={styles.FoodsContainer}>
          <FlatList
            data={FavFoods}
            renderItem={(itemData) => {
              return (
                <FoodItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteFoodHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  FoodsContainer: {
    flex: 5,
  },
});