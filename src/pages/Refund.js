import { IconButton } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { Text, View } from "react-native";
import React from "react";
import usePreferences from "../contexts/usePreferences";

export default function Refund({ navigation }) {
  const { theme } = usePreferences();

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
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
          alignItems: "center",
        }}
      ></View>
    </React.Fragment>
  );
}
