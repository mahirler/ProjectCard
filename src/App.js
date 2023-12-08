import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
