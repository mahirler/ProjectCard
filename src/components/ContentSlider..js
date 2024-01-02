import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import usePreferences from "../contexts/usePreferences";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useState } from "react";

const INITIAL_OFFSET = 110;
const MARGIN = 10;
// const LEFT_BOUNDARY = 330;
const LEFT_BOUNDARY = SIZE * 2 + MARGIN * 2;
const RIGHT_BOUNDARY = -330;
const SIZE = 160;

const items = [
  { color: "#FFE780" },
  { color: "#87CCE8" },
  { color: "#FFA3A1" },
  { color: "#B1DFD0" },
];

export default function ContentSlider({ content }) {
  const boxSize = 350;
  const size = (content.length / 2 - 1) * (boxSize + MARGIN * 2);
  const leftBoundary = size + MARGIN + boxSize / 2;
  const slideOffset = boxSize + MARGIN * 2;
  const { theme, isThemeDark } = usePreferences();
  const offset = useSharedValue(leftBoundary);
  const [buttonDisabled, setDisabled] = useState(true);
  const Index = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const pan = Gesture.Pan()
    .onBegin(() => runOnJS(setDisabled)(true))
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize(() => {
      if (Index.value == 0 && offset.value > leftBoundary) {
        offset.value = withSpring(leftBoundary);
      } else if (
        Index.value == content.length - 1 &&
        offset.value < -leftBoundary
      ) {
        offset.value = withSpring(-leftBoundary);
      } else if (
        offset.value >
        leftBoundary - slideOffset * Index.value + boxSize / 4
      ) {
        Index.value--;
        offset.value = withSpring(leftBoundary - slideOffset * Index.value);
      } else if (
        offset.value <
        leftBoundary - slideOffset * Index.value - boxSize / 4
      ) {
        Index.value++;
        offset.value = withSpring(leftBoundary - slideOffset * Index.value);
      } else
        offset.value = withSpring(leftBoundary - slideOffset * Index.value);
      runOnJS(setDisabled)(false);
    });

  return (
    // <GestureHandlerRootView style={styles.container}>
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.row, animatedStyles]}>
        {content.map((item, _index) => (
          <TouchableOpacity
            key={_index}
            style={{
              ...styles.box,
              width: item.Width,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.iconColor,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
            // activeOpacity={1}
            onPress={item.onPress}
            disabled={buttonDisabled}
          >
            <Text
              style={{
                color: theme.colors.textColor,
                fontWeight: "bold",
                fontSize: 35,
                // backgroundColor: "green",
              }}
            >
              {item.GiveBackShare}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
                width: "70%",
                justifyContent: "flex-start",
                // backgroundColor: "red",
              }}
            >
              <Icon
                source={item.Icon}
                size={50}
                color={!item.NoColor ? (isThemeDark ? "white" : "black") : {}}
              />
              {/* <IconButton
                icon="cursor-default-click-outline"
                iconColor={theme.colors.primary}
                size={70}
                onPress={() => console.log("zaaa " + _index)}
              /> */}
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: isThemeDark ? "white" : "black",
                    fontSize: 35,
                  }}
                >
                  {item.Text}
                </Text>
                {item.Comment && (
                  <Text style={{ color: isThemeDark ? "white" : "black" }}>
                    {item.Comment}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  buttonWrapper: {
    position: "absolute",
    width: SIZE,
    zIndex: 1,
  },
  box: {
    height: 90,
    width: SIZE,
    borderRadius: 5,
    marginHorizontal: MARGIN,
    justifyContent: "center",
    alignItems: "center",
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
