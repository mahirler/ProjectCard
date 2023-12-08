import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Registration from "./pages/Registration";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import { Button, Text } from "react-native-paper";
import { AppBarContext } from "./contexts/AppBarContext";
import { useMemo, useState } from "react";
import AppbarHeader from "./components/AppbarHeader";
import AppbarNavigator from "./components/AppbarNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showNavigator, setShowNavigator] = useState(true);
  const [headerContent, setHeaderContent] = useState(
    <Text style={{ fontSize: 40, fontWeight: "500" }}>BENBUY</Text>
  );
  const [navigatorContent, setNavigatorContent] = useState(
    <Button mode="contained" textColor="black">
      Test
    </Button>
  );

  const appbar = useMemo(
    () => ({
      showHeader,
      showNavigator,
      setShowHeader,
      setShowNavigator,
      setHeaderContent,
      setNavigatorContent,
    }),
    [showHeader, showNavigator, headerContent, navigatorContent]
  );
  return (
    <AppBarContext.Provider value={appbar}>
      <AppbarHeader show={showHeader} content={headerContent} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
      <AppbarNavigator show={showNavigator} content={navigatorContent} />
    </AppBarContext.Provider>
  );
}
