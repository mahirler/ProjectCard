import { registerRootComponent } from "expo";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
  Button,
} from "react-native-paper";
import App from "./src/App";
import { AppRegistry, useColorScheme } from "react-native";
import { useState } from "react";

const lightTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: "white",
    textColor: "black",
  },
};

const darkTheme = {
  ...DarkTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DarkTheme.colors,
    primary: "black",
    textColor: "white",
  },
};

const Main = () => {
  const [thm, setTheme] = useState(useColorScheme());
  const theme = thm === "dark" ? darkTheme : lightTheme;
  return (
    <PaperProvider theme={darkTheme}>
      <App />
      <Button mode="contained" onPress={() => setTheme("light")}>
        Change
      </Button>
    </PaperProvider>
  );
};

registerRootComponent(Main);
