
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import useAction from '../useAction';


const SearchPage = ({navigation}) => {
    const {search, setSearch, filteredDataSource} = useAction();

      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
    
      const getItem = (item) => {
        // Function for click on an item
        navigation.navigate(item.page);
      };

      const ItemView = ({ item }) => {
        return (
          // Flat List Item
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.title}
          </Text>
        );
      };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setSearch(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
          keyboardType='default'
        />
      <FlatList
        data={filteredDataSource}
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={item => item.id.toString()}
        renderItem={ItemView}
      />
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
  });

export default SearchPage
