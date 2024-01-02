import React from "react";
import AppbarHeader from "../components/AppbarHeader";
import { Avatar, Icon, IconButton, Surface } from "react-native-paper";
import { Text, ScrollView } from "react-native";
import usePreferences from "../contexts/usePreferences";
import { View } from "moti";
import StarbucksLogo from "../../assets/brandIcons/starbucks.png";
import BurgerKingLogo from "../../assets/brandIcons/burgerking.png";
import GetirLogo from "../../assets/brandIcons/getir.png";
import TrendyolLogo from "../../assets/brandIcons/trendyol.png";

export default function Opportunities({ navigation }) {
  const { theme, isThemeDark } = usePreferences();
  const opportunities = [
    {
      name: "Starbucks",
      amount: 20,
      icon: StarbucksLogo,
      color: isThemeDark ? "white" : "black",
    },
    {
      name: "Trendyol",
      amount: 20,
      icon: TrendyolLogo,
    },
    {
      name: "Burger King",
      amount: 20,
      icon: BurgerKingLogo,
      color: isThemeDark ? "white" : "black",
    },
    {
      name: "Steam",
      amount: 20,
      icon: "steam",
    },
    {
      name: "Getir",
      amount: 20,
      icon: GetirLogo,
    },
    {
      name: "Spotify",
      amount: 20,
      icon: "spotify",
    },
  ];

  return (
    <React.Fragment>
      <AppbarHeader
        show={true}
        content={
          <>
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
              // style={{ zIndex: 1000 }}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Ücretler ve Kampanyalar
            </Text>
            <IconButton icon="cog-outline" size={30} />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
        }}
      >
        {opportunities.map((item, index) => {
          return (
            <Surface
              key={index}
              elevation={5}
              style={{
                width: "93%",
                alignSelf: "center",
                marginBottom: 10,
                height: 150,
                backgroundColor: theme.colors.modalWindow,
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ marginLeft: 15 }}>
                <Icon
                  source={item.icon}
                  size={80}
                  color={item.color && item.color}
                />
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text
                  style={{
                    color: theme.colors.textColor,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: theme.colors.textColor }}>
                  {item.amount}
                </Text>
              </View>
            </Surface>
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
}
