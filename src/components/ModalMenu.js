import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import usePreferences from "../contexts/usePreferences";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, View } from "react-native";
import { Button } from "react-native-paper";
import { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function ModalMenu() {
  const { visible, setVisible, content } = useContext(ModalContext);
  const { theme } = usePreferences();
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(-Dimensions.get("window").height / 2);

  const animatedStyl = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value * 2) }],
  }));

  useEffect(() => {
    if (visible) translateY.value -= Dimensions.get("window").height / 2;
    else translateY.value += Dimensions.get("window").height / 2;
  }, [visible]);

  return (
    <GestureHandlerRootView>
      <Animated.View
        style={[
          {
            position: "absolute",
            // backgroundColor: theme.colors.modalWindow,
            zIndex: 1000,
            flex: 1,
            alignItems: "center",
          },
          animatedStyl,
        ]}
      >
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 300,
            height: "auto",
            backgroundColor: theme.colors.modalWindow,
            borderRadius: 10,
            padding: 10,
            marginBottom: bottom,
            bottom: 0,
          }}
        >
          <ScrollView>
            {content.map((item, index) => {
              return (
                <Button
                  key={index}
                  mode="outlined"
                  style={{ marginVertical: 5 }}
                  textColor={theme.colors.textColor}
                  onPress={item.onPress}
                >
                  {item.label}
                </Button>
              );
            })}
          </ScrollView>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
