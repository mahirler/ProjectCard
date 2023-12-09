import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
} from "react-native-reanimated";

const INITIAL_OFFSET = 110;
const SIZE = 160;
const MARGIN = 30;
const LEFT_BOUNDARY = 330;
const RIGHT_BOUNDARY = -330;

const items = [
  { color: "#FFE780" },
  { color: "#87CCE8" },
  { color: "#FFA3A1" },
  { color: "#B1DFD0" },
];

export default function App() {
  const offset = useSharedValue(INITIAL_OFFSET);
  const Index = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const pan = Gesture.Pan()

    .onChange((event) => {
      offset.value += event.changeX;
      //   console.log("Offset %d", offset.value);
    })
    .onFinalize(() => {
      if (offset.value > 110 - 220 * Index.value) {
        Index.value--;
        offset.value = withSpring(110 - 220 * Index.value);
      } else {
        Index.value++;
        offset.value = withSpring(110 - 220 * Index.value);
      }
      console.log(Index.value);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.row, animatedStyles]}>
          {items.map((item) => (
            <View
              key={item.color}
              style={{ ...styles.box, backgroundColor: item.color }}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    marginVertical: 64,
    overflow: "hidden",
  },
  buttonWrapper: {
    position: "absolute",
    width: SIZE,
    zIndex: 1,
  },
  box: {
    height: SIZE,
    width: SIZE,
    borderRadius: 5,
    marginHorizontal: MARGIN,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    position: "absolute",
    width: SIZE / 3,
    height: SIZE / 3,
    borderRadius: SIZE,
    backgroundColor: "#ccc",
    borderColor: "#fff",
    borderWidth: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    top: 58,
  },
  buttonItem: {
    color: "#666",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 2,
  },
  previous: {
    left: -30,
  },
  next: {
    right: -30,
  },
});
