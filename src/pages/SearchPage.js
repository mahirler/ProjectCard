import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";
import useAction from "../useAction";
import AppbarHeader from "../components/AppbarHeader";
import { IconButton, Searchbar } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";

const SearchPage = ({ navigation }) => {
  const { search, setSearch, filteredDataSource } = useAction();
  const { theme, isThemeDark } = usePreferences();

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: isThemeDark ? "white" : "#C8C8C8",
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
      <Text
        style={[styles.itemStyle, { color: "white", width: "50%" }]}
        onPress={() => getItem(item)}
      >
        {item.title}
      </Text>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundColor }}
    >
      <AppbarHeader
        show={true}
        content={
          <>
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "left",
                color: theme.colors.textColor,
              }}
            >
              Arama
            </Text>
            <IconButton />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        <Searchbar
          style={[
            styles.textInputStyle,
            { marginTop: 20, width: "90%", alignSelf: "center" },
          ]}
          onChangeText={(text) => setSearch(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Ara"
          keyboardType="default"
        />
        <FlatList
          style={{ width: "90%", alignSelf: "center" }}
          data={filteredDataSource}
          ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item) => item.id.toString()}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
  },
});

export default SearchPage;
