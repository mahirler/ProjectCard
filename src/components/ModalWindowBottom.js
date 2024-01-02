import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Linking, Platform, View } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";

export default function ModalWindowBottom({ visible, content, location }) {
  const { theme, isThemeDark } = usePreferences();
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(-100);

  const animatedStyl = useAnimatedStyle(() => ({
    bottom: withTiming(translateY.value, {
      duration: 500,
    }),
  }));

  useEffect(() => {
    if (visible) {
      translateY.value += 140;
    } else if (translateY.value != -100) {
      translateY.value -= 140;
    }
  }, [visible]);

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        alignItems: "center",
        zIndex: 100000,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 380,
            height: 100,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          },
          animatedStyl,
        ]}
      >
        {/* {visible && (
          <TouchableOpacity
            style={{ padding: 500, zIndex: 10000 }}
            // onPress={() => setVisible(false)}
          />
        )} */}
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.colors.modalWindow,
            // marginBottom: 5,
            width: 380,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            height: 100,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "grey",
            }}
          />
          <View
            style={{
              width: "75%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.colors.textColor,
                textAlign: "center",
                width: "80%",
              }}
            >
              {content && content.text}
            </Text>
            <Button
              textColor="white"
              onPress={() => {
                let link;
                if (Platform.OS == "ios") link = "maps://app?daddr=";
                else link = "google.navigation:q=";
                Linking.openURL(link + location.la + "+" + location.lo);
              }}
            >
              Konuma Git
            </Button>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
