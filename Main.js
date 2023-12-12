import { registerRootComponent } from "expo";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
} from "react-native-paper";
import App from "./src/App";
import { useCallback, useMemo, useState } from "react";
import { PreferencesContext } from "./src/contexts/PreferencesContext";
import { StatusBar } from "react-native";

const lightTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: "white",
    textColor: "black",
    backgroundColor: "#f9f7f8",
    iconColor: "black",
    modalWindow: "#F2F1EB",
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
    backgroundColor: "#191919",
    iconColor: "white",
    modalWindow: "#23272e",
  },
};

const Main = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  let theme = isThemeDark ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      theme,
    }),
    [toggleTheme, isThemeDark, theme]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <StatusBar
        barStyle={isThemeDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.backgroundColor}
      />
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

registerRootComponent(Main);
