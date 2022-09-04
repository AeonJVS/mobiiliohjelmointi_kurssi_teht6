import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipeData, setRecipeData] = useState([]);

  const fetchData = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRecipeData(data.meals))
    .catch(error => {
      Alert.alert('Error' + error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.boxHeader}>
          <Text style={{fontSize:22, fontWeight:"bold", color: 'white', marginVertical: 25}}> Search for recipe by ingredient </Text>
        </View>
        <TextInput style={{fontSize:20, width:200, marginLeft:30, marginVertical: 30}}
          placeholder='keyword' placeholderTextColor={'navy'}
          onChangeText={ text => setKeyword(text) } />
        <Button title="Search" onPress= {fetchData} />

      <FlatList 
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) =>
        <View>
          <Text
            style={{fontSize:18, fontWeight: "bold", marginHorizontal: 4}}>{item.strMeal}
          </Text>
          <Image style={styles.tinyImg} source={{uri: item.strMealThumb}} />
        </View>}
        data={recipeData} /> 

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D97CC',
  },
  innerContainer: {
    flex: 1, 
    backgroundColor: '#6CB7F4', 
    borderRightWidth: 6, 
    borderBottomWidth: 6, 
    borderColor: '#46849E', 
    marginVertical: 100
  },
  boxHeader: {
    flex: .2, 
    backgroundColor: '#2196F3'
  },
  tinyImg: {
    width: 75,
    height: 75,
  },
});
