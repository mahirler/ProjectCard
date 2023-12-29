import {
  Icon,
  IconButton,
  RadioButton,
  Switch,
  Text,
} from "react-native-paper";
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
        }}
      >
        <View
          style={{
            height: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Icon
            source={"theme-light-dark"}
            size={45}
            color={isThemeDark ? "white" : "black"}
          /> */}
          <RadioButton.Group onValueChange={toggleTheme} value={isThemeDark}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  marginRight: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Dark</Text>
                <RadioButton color={theme.colors.textColor} value={true} />
              </View>
              <View
                style={{
                  marginLeft: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Light</Text>
                <RadioButton color={theme.colors.textColor} value={false} />
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </>
  );
}
