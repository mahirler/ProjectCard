import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import { Button, Text } from "react-native-paper";
import { AppBarContext } from "./contexts/AppBarContext";
import { ModalContext } from "./contexts/ModalContext";
import { useMemo, useState } from "react";
import AppbarHeader from "./components/AppbarHeader";
import AppbarNavigator from "./components/AppbarNavigator";
import ModalMenu from "./components/ModalMenu";
import usePreferences from "./contexts/usePreferences";
import Test from "./pages/Test";
import CameraTest from "./pages/CameraTest";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Refund from "./pages/Refund";
import Map from "./pages/Map";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [showHeader, setShowHeader] = useState(true);
  // const [showNavigator, setShowNavigator] = useState(true);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState([
    { label: "Test", onPress: () => alert("zaa") },
  ]);
  // const [headerContent, setHeaderContent] = useState(
  //   <Text style={{ fontSize: 40, fontWeight: "500" }}>BENBUY</Text>
  // );
  // const [navigatorContent, setNavigatorContent] = useState(
  //   <Button mode="contained" textColor="black">
  //     Test
  //   </Button>
  // );

  const modal = useMemo(
    () => ({
      visible,
      setVisible,
      content,
      setContent,
    }),
    [visible, content]
  );

  // const appbar = useMemo(
  //   () => ({
  //     showHeader,
  //     showNavigator,
  //     setShowHeader,
  //     setShowNavigator,
  //     setHeaderContent,
  //     setNavigatorContent,
  //   }),
  //   [showHeader, showNavigator, headerContent, navigatorContent]
  // );
  return (
    // <AppBarContext.Provider value={appbar}>
    // <AppbarHeader show={showHeader} content={headerContent} />

    <ModalContext.Provider value={modal}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="CameraTest" component={CameraTest} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Refund" component={Refund} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
        <ModalMenu />
      </NavigationContainer>
    </ModalContext.Provider>
    // <AppbarNavigator show={showNavigator} content={navigatorContent} />
    // </AppBarContext.Provider>
  );
}
