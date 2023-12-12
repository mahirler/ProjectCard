import { IconButton } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { Text, View } from "react-native";
import React from "react";
import usePreferences from "../contexts/usePreferences";

export default function Notifications({ navigation }) {
  const { theme } = usePreferences();

  return (
    <React.Fragment>
      <AppbarHeader
        show={true}
        content={
          <>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Bildirimler
            </Text>
            <IconButton
              icon="arrow-left"
              style={{ position: "absolute", left: 0, top: 0 }}
              size={40}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon="cog-outline"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
              size={40}
            />
          </>
        }
        headerStyle={{ justifyContent: "flex-start" }}
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
