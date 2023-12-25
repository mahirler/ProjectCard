import { createContext } from "react";

export const AppBarContext = createContext({
  showHeader: false,
  showBottom: false,
  setShowHeader: () => {},
  setShowNavigator: () => {},
  setHeaderContent: () => {},
  setNavigatorContent: () => {},
});
