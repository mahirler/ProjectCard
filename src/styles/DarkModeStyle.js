import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
} from "react-native-paper";

export const ThemeDark = {
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
