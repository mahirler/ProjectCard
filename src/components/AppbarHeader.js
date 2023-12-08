import { Appbar, Text } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import { Dimensions } from "react-native";

export default function AppbarHeader({ show, content }) {
  const { theme } = usePreferences();

  return (
    <>
      {show && (
        <Appbar.Header
          style={{
            backgroundColor: theme.colors.backgroundColor,
            width: Dimensions.get("window").width,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {content}
        </Appbar.Header>
      )}
    </>
  );
}
