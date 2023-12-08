import { createContext } from "react";

export const ModalContext = createContext({
  content: [],
  visible: false,
  setVisible: () => {},
  setContent: () => {},
});
