import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const LightTheme = {
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
