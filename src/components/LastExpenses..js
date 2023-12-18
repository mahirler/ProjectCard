import { Dimensions, ScrollView, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import React, { useEffect, useRef, useState } from "react";

export default function LastExpenses({ content, height }) {
  const { theme } = usePreferences();
  const baseBalance = useRef(1000);

  useEffect(() => {
    baseBalance.current = 1000;
  }, [content]);

  return (
    <View
      style={{
        height: height ? height : "70%",
        width: Dimensions.get("window").width - 40,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "column-reverse" }}>
          {/* <Divider bold="true" style={{ backgroundColor: "black" }} /> */}
          {content.reverse().map((item, _index) => {
            const test = item.amount.toString().split(".");
            baseBalance.current += item.amount;
            const baseAmountString = baseBalance.current.toString().split(".");
            return (
              <React.Fragment key={_index}>
                <View
                  style={{
                    display: "flex",
                    height: 80,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "65%",
                      // backgroundColor: "red",
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 5,
                        backgroundColor: "grey",
                      }}
                    />
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-start",
                        marginLeft: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: theme.colors.textColor,
                          fontSize: 18,
                        }}
                      >
                        {item.explain}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "grey",
                        }}
                      >
                        {item.type}
                      </Text>
                      {item.date && (
                        <Text style={{ textAlign: "center", color: "grey" }}>
                          {item.date}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "35%",
                      // backgroundColor: "green",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        color: item.amount < 0 ? "red" : "green",
                        textAlign: "center",
                      }}
                    >
                      {test[0]},{test[1] ? test[1] : "00"}₺
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "grey",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Kalan Bakiye: {baseAmountString[0]},
                      {baseAmountString[1][0]}
                      {baseAmountString[1][1]}₺
                    </Text>
                  </View>
                </View>
                {/* <Divider style={{ backgroundColor: "black", zIndex: -1000 }} /> */}
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
