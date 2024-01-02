import { View } from "react-native";
import usePreferences from "../contexts/usePreferences";
import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Expenses from "./Expenses";

const Tab = createBottomTabNavigator();

export default function Test() {
  const { theme } = usePreferences();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Selam</Text>
    </View>
  );
}
