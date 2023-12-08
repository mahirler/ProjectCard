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
          {/* <Appbar.Action
            icon="view-headline"
            color={theme.colors.iconColor}
            rippleColor="rgba(0,0,0,0)"
            size={30}
            onPress={() => {
              setVisible(!visible);
              handlePress();
            }}
          />
          <Appbar.Action icon="bell" color={theme.colors.iconColor} size={30} />
          <Text style={{ fontSize: 40, fontWeight: "500" }}>BENBUY</Text>
          <Appbar.Action
            icon="magnify"
            color={theme.colors.iconColor}
            size={30}
          />
          <Appbar.Action
            icon="account-circle-outline"
            color={theme.colors.iconColor}
            onPress={() => {
              alert("This is an alert!");
            }}
            size={30}
          /> */}
          {content}
        </Appbar.Header>
      )}
    </>
  );
}
