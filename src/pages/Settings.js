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
            <IconButton
              icon="arrow-left"
              style={{ justifyContent: "flex-start" }}
              size={40}
              onPress={() => goBack()}
            />
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                marginLeft: 70,
              }}
            >
              Ayarlar
            </Text>
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
