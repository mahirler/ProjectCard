import { registerRootComponent } from "expo";
import App from "./src/App";
import { useCallback, useMemo, useState } from "react";
import { PreferencesContext } from "./src/contexts/PreferencesContext";
import { StatusBar } from "react-native";
import { LightTheme } from "./src/styles/LightModeStyle";
import { ThemeDark } from "./src/styles/DarkModeStyle";
import { PaperProvider } from "react-native-paper";

const Main = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  let theme = isThemeDark ? ThemeDark : LightTheme;

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
