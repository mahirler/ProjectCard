import { Icon, IconButton, Switch, Text } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { View } from "react-native";
import usePreferences from "../contexts/usePreferences";

export default function Settings({ navigation: { goBack } }) {
  const { theme, isThemeDark, toggleTheme } = usePreferences();
  return (
    <>
      <AppbarHeader
        show={true}
        content={
          <>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
              }}
            >
              Ayarlar
            </Text>
            <IconButton
              icon="arrow-left"
              style={{ position: "absolute", left: 0, top: 0 }}
              size={30}
              onPress={() => goBack()}
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
      >
        <Switch color="red" value={isThemeDark} onValueChange={toggleTheme} />
      </View>
    </>
  );
}
