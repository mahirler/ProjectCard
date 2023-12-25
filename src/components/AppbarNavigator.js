import { Dimensions, View } from "react-native";
import { Appbar, Surface } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppbarNavigator({ show, content, style }) {
  const { theme } = usePreferences();
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      {show && (
        <Appbar
          style={[
            {
              backgroundColor: theme.colors.backgroundColor,
              width: Dimensions.get("window").width,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
          safeAreaInsets={{ bottom }}
        >
          {content}
        </Appbar>
      )}
    </>
  );
}
