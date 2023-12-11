import { Dimensions, ScrollView, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import React from "react";

export default function LastExpenses({ content }) {
  const { theme } = usePreferences();
  return (
    <View
      style={{
        height: "45%",
        width: Dimensions.get("window").width - 40,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {/* <Divider bold="true" style={{ backgroundColor: "black" }} /> */}
        {content.map((item, _index) => {
          const test = item.amount.toString().split(".");
          return (
            <React.Fragment key={_index}>
              <View
                style={{
                  display: "flex",
                  height: 80,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    width: "50%",
                    textAlign: "center",
                    color: theme.colors.textColor,
                  }}
                >
                  {item.explain}
                </Text>
                <View
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 30,
                      color: item.amount < 0 ? "red" : "green",
                      textAlign: "center",
                    }}
                  >
                    {test[0]},{test[1] ? test[1] : "00"}TL
                  </Text>
                  {item.date && (
                    <Text style={{ textAlign: "center", color: "grey" }}>
                      {item.date}
                    </Text>
                  )}
                </View>
              </View>
              {/* <Divider style={{ backgroundColor: "black", zIndex: -1000 }} /> */}
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
}
