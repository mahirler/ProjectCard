import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import usePreferences from "../contexts/usePreferences";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions, View, StyleSheet } from "react-native";
import { Button, Divider, Icon, Text } from "react-native-paper";
import React, { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function ModalMenu() {
  const { visible, setVisible, content } = useContext(ModalContext);
  const { theme } = usePreferences();
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(-Dimensions.get("window").height / 2);

  const animatedStyl = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateY.value * 2, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        }),
      },
    ],
  }));

  const stlyes = StyleSheet.create({
    button: {
      padding: 15,
      backgroundColor: "black",
    },
  });

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
            width: 380,
            height: "auto",
            bottom: 0,
            marginBottom: bottom,
          }}
        >
          <ScrollView
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: theme.colors.modalWindow,
              marginBottom: 5,
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
            textColor="white"
            onPress={() => setVisible(false)}
            style={stlyes.button}
            rippleColor="rgba(0,0,0,0)"
          >
            VAZGEÇ
          </Button>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
