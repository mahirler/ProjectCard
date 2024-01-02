import { Button, IconButton, TextInput } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import usePreferences from "../contexts/usePreferences";
import React from "react";

export default function Feedback({ navigation }) {
  const { theme, isThemeDark } = usePreferences();

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
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Geri Bildirim ve Öneri
            </Text>
            <View style={{ width: 30, height: 30 }} />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
          position: "relative",
        }}
        behavior={Platform.OS == "ios" ? "height" : "padding"}
      >
        <TextInput
          autoFocus={true}
          mode="outlined"
          multiline={true}
          placeholder="Görüş ve düşüncelerinizi yazınız."
          contentStyle={{
            height: 200,
            backgroundColor: theme.colors.backgroundColor,
          }}
        />
        <Button
          mode="contained"
          textColor={isThemeDark ? "black" : "white"}
          buttonColor={isThemeDark ? "white" : "black"}
          style={{
            width: "95%",
            height: 50,
            justifyContent: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 20,
          }}
        >
          Gönder
        </Button>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
}
