import { useState } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Appbar, Button, Drawer, Modal, Text } from "react-native-paper";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);

  const pressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handlePress = () => {
    if (!visible) translateY.value -= 300;
    else translateY.value += 300;
  };
  const { bottom } = useSafeAreaInsets();

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(() => {
      offsetY.value = withSpring(0);
      offsetX.value = withSpring(0);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    backgroundColor: pressed.value ? "#FFE04B" : "#b58df1",
  }));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f7f8",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      height: 120,
      width: 120,
      backgroundColor: "#b58df1",
      borderRadius: 20,
    },
    modalStyle: {
      width: 300,
      height: 500,
      alignSelf: "center",
      borderWidth: 2,
      backgroundColor: "white",
      position: "absolute",
      bottom: -500,
    },
    bottom: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  const animatedStyl = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value * 2) }],
  }));
  return (
    <GestureHandlerRootView style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: "#f9f7f8",
          width: Dimensions.get("window").width,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Appbar.Action
          icon="view-headline"
          color="black"
          rippleColor="rgba(0,0,0,0)"
          size={30}
          onPress={() => {
            setVisible(!visible);
            handlePress();
          }}
        />
        <Appbar.Action icon="bell" color="black" size={30} />
        <Text style={{ fontSize: 35, fontWeight: "500" }}>BENBUY</Text>
        <Appbar.Action icon="magnify" color="black" size={30} />
        <Appbar.Action
          icon="account-circle-outline"
          color="black"
          onPress={() => {
            alert("This is an alert!");
          }}
          size={30}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
        <Text style={{ color: "black" }}>Home Page</Text>
      </View>
      <Animated.View style={[styles.modalStyle, animatedStyl]}>
        <Button mode="outlined" textColor="black">
          Press me
        </Button>
      </Animated.View>
      <Appbar
        style={[
          styles.bottom,
          {
            height: 50 + bottom,
            backgroundColor: "#f9f7f8",
            width: Dimensions.get("window").width,
            display: "flex",
            justifyContent: "space-between",
          },
        ]}
        safeAreaInsets={{ bottom }}
      >
        <Appbar.Action icon="chart-pie" color="black" size={45} />
        <Appbar.Action
          icon="qrcode"
          color="black"
          rippleColor="rgba(0,0,0,0)"
          size={75}
          style={{
            backgroundColor: "#f9f7f8",
            borderWidth: 3,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("SignUpFirstPart")}
        />
        <Appbar.Action icon="cash-refund" color="black" size={45} />
      </Appbar>
    </GestureHandlerRootView>
  );
}
