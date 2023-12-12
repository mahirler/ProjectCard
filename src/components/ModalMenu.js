import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import usePreferences from "../contexts/usePreferences";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Divider, Icon, Text } from "react-native-paper";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function ModalMenu() {
  const { visible, setVisible, content } = useContext(ModalContext);
  const { theme, isThemeDark } = usePreferences();
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(0);
  const bgOpacity = useSharedValue(0);
  const [bgV, setbgV] = useState(false);

  const animatedStyl = useAnimatedStyle(() => ({
    bottom: withTiming(-translateY.value * 2, {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    }),
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(bgOpacity.value, [-300, 300], [1, 0]),
  }));

  const stlyes = StyleSheet.create({
    button: {
      padding: 15,
      backgroundColor: isThemeDark ? "white" : "black",
      width: 380,
    },
  });

  useEffect(() => {
    // console.info("useffect");
    if (visible) {
      setbgV(visible);
      translateY.value -= 300;
      bgOpacity.value = withTiming(-300, {});
    } else {
      translateY.value += 300;
      bgOpacity.value = withTiming(300, {}, (isfinished) => {
        if (isfinished) runOnJS(setbgV)(visible);
      });
    }
  }, [visible]);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          position: "relative",
          flex: 1,
          alignItems: "center",
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
          {visible && (
            <TouchableOpacity
              style={{ padding: 500, zIndex: 10000 }}
              onPress={() => setVisible(false)}
            />
          )}
          <ScrollView
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: theme.colors.modalWindow,
              marginBottom: 5,
              width: 380,
            }}
          >
            {content.map((item, _index) => {
              return (
                <React.Fragment key={_index}>
                  <Button
                    key={_index}
                    mode="outlined"
                    style={{
                      paddingVertical: 10,
                      borderWidth: 0,
                      margin: 0,
                    }}
                    icon={item.icon}
                    textColor={theme.colors.textColor}
                    onPress={item.onPress}
                    rippleColor="rgba(0,0,0,0)"
                    labelStyle={{ fontSize: 30 }}
                    contentStyle={{
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>
                      {item.label}
                    </Text>
                  </Button>
                  <Divider key={_index + 1} bold="true" />
                </React.Fragment>
              );
            })}
          </ScrollView>
          <Button
            mode="contained"
            textColor={isThemeDark ? "black" : "white"}
            onPress={() => setVisible(false)}
            style={stlyes.button}
            labelStyle={{ fontWeight: "bold", fontSize: 15 }}
            rippleColor="rgba(0,0,0,0)"
          >
            VAZGEÇ
          </Button>
        </Animated.View>

        {bgV && (
          <Animated.View
            style={[
              {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                position: "absolute",
                bottom: 0,
                zIndex: -1000,
                backgroundColor: "rgba(0,0,0,0.5)",
              },
              backgroundAnimatedStyle,
            ]}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}
