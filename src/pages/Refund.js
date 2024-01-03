import { Divider, IconButton } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import usePreferences from "../contexts/usePreferences";
import CustomPieChart from "../components/CustomPieChart";

export default function Refund({ navigation }) {
  const { theme, isThemeDark } = usePreferences();
  const [selected, setSelected] = useState(null);
  const totalEarn = useRef(0);

  const data = [
    {
      key: 1,
      amount: 160.23,
      svg: {
        fill: "purple",
        onPress: () => setSelected(0),
      },
      arc: selected == 0 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "fuel",
      type: "Market",
    },
    {
      key: 2,
      amount: 123.09,
      svg: { fill: "orange", onPress: () => setSelected(1) },
      arc: selected == 1 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "home",
      type: "Giyim",
    },
    {
      key: 3,
      amount: 45.43,
      svg: { fill: "blue", onPress: () => setSelected(2) },
      arc: selected == 2 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "needle",
      type: "Yemek",
    },
    {
      key: 4,
      amount: 34.32,
      svg: { fill: "green", onPress: () => setSelected(3) },
      arc: selected == 3 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "hamburger",
      type: "Steam",
    },
    {
      key: 5,
      amount: 30,
      svg: { fill: "grey", onPress: () => setSelected(4) },
      arc: selected == 4 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "steam",
      type: "Netflix",
    },
    {
      key: 6,
      amount: 30,
      svg: { fill: "pink", onPress: () => setSelected(5) },
      arc: selected == 5 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "youtube",
      type: "Youtube",
    },
    {
      key: 7,
      amount: 23.21,
      svg: { fill: "red", onPress: () => setSelected(6) },
      arc: selected == 6 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "spotify",
      type: "Spotify",
    },
  ];

  const getTotalEarn = () => {
    let amount = 0;
    for (let index = 0; index < data.length; index++) {
      amount += data[index].amount;
    }

    return amount;
  };

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
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Geri Ödemeler
            </Text>
            <IconButton icon="cog-outline" size={30} />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      />
      <CustomPieChart
        data={data}
        selected={selected}
        style={{ backgroundColor: theme.colors.backgroundColor }}
        height={300}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.colors.textColor,
            fontWeight: "bold",
          }}
        >
          Toplam Kazanç: {getTotalEarn()}₺
        </Text>
        <Text
          style={{
            color: theme.colors.textColor,
            alignSelf: "flex-start",
            fontSize: 30,
            marginLeft: 20,
          }}
        >
          Özet
        </Text>
        <ScrollView style={{ width: "100%" }}>
          {data.map((item, index) => {
            totalEarn.current += item.amount;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => setSelected(index)}
              >
                <View
                  style={{
                    width: "90%",
                    height: 50,
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 100,
                      backgroundColor: item.svg.fill,
                    }}
                  />
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      width: "90%",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 20,
                        color: theme.colors.textColor,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {item.type}
                    </Text>

                    <Text style={{ color: theme.colors.textColor }}>
                      {item.amount}₺
                    </Text>
                  </View>
                </View>
                <Divider leftInset="true" style={{ backgroundColor: "grey" }} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </React.Fragment>
  );
}
