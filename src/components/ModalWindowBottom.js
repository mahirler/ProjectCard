import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

export default function ModalWindowBottom({ visible, content }) {
  const { theme, isThemeDark } = usePreferences();
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  const animatedStyl = useAnimatedStyle(() => ({
    bottom: withTiming(translateY.value, {
      duration: 500,
    }),
  }));

  useEffect(() => {
    if (visible) {
      translateY.value += 100;
    } else if (translateY.value != 0) {
      translateY.value -= 100;
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
            marginBottom: bottom,
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
            marginBottom: 5,
            width: 380,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "grey",
            }}
          />
          <Text
            style={{
              color: theme.colors.textColor,
              textAlign: "center",
              width: "80%",
            }}
          >
            {content && content.text}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}
