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
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerTitle: "test", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Project",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
