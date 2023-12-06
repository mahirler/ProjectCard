import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Registration from "./pages/Registration";
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
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}