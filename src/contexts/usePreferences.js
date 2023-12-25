import { useContext } from "react";
import { PreferencesContext } from "./PreferencesContext";

export default function usePreferences() {
  return useContext(PreferencesContext);
}
