import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import AppbarHeader from "../components/AppbarHeader";
import { Icon, IconButton, Surface } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import React, { useState } from "react";
import CustomPieChart from "../components/CustomPieChart";
import * as Progress from "react-native-progress";

export default function Expenses({ navigation }) {
  const { theme } = usePreferences();
  const [selected, setSelected] = useState(null);

  const data = [
    {
      key: 1,
      amount: 50,
      svg: {
        fill: "purple",
        onPress: () => setSelected(0),
      },
      arc: selected == 0 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "fuel",
      type: "Araç Yakıtı",
    },
    {
      key: 2,
      amount: 50,
      svg: { fill: "orange", onPress: () => setSelected(1) },
      arc: selected == 1 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "home",
      type: "Ev Kirası",
    },
    {
      key: 3,
      amount: 40,
      svg: { fill: "blue", onPress: () => setSelected(2) },
      arc: selected == 2 && { outerRadius: "130%", cornerRadius: 10 },
      icon: "needle",
      type: "Sağlık",
    },
    {
      key: 4,
      amount: 95,
      svg: { fill: "green", onPress: () => setSelected(3) },
      arc: selected == 3 && { outerRadius: "130%", cornerRadius: 10 },
      type: "Yemek ve İçecekler",
      icon: "hamburger",
    },
  ];

  return (
    <React.Fragment>
      {/* <AppbarHeader
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
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Harcamalar
            </Text>
            <IconButton icon="cog-outline" size={30} />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      /> */}
      <CustomPieChart
        selected={selected}
        data={data}
        style={{ backgroundColor: theme.colors.backgroundColor }}
        height={300}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: theme.colors.backgroundColor,
        }}
      >
        <ScrollView style={{ width: "100%" }}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={item.svg.onPress}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Surface
                  elevation={2}
                  style={{
                    width: "95%",
                    backgroundColor:
                      index == selected ? "grey" : theme.colors.modalWindow,
                    height: 90,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Icon source={item.icon} size={50} color={item.svg.fill} />
                  <View
                    style={{
                      alignItems: "flex-start",
                      width: "70%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <View style={{ width: "85%" }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            color: theme.colors.textColor,
                          }}
                        >
                          {item.type}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "grey",
                          }}
                        >
                          1 Ödeme
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: "bold",
                          color: theme.colors.textColor,
                        }}
                      >
                        {item.amount}₺
                      </Text>
                    </View>
                    <Progress.Bar
                      progress={item.amount / 100}
                      color={item.svg.fill}
                      width={270}
                      style={{
                        marginTop: 5,
                      }}
                    />
                  </View>
                </Surface>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </React.Fragment>
  );
}
