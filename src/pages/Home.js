import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Appbar, Button, Surface, Switch, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";
import { AppBarContext } from "../contexts/AppBarContext";
import { useIsFocused } from "@react-navigation/native";

export default function Home({ navigation }) {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const isFocused = useIsFocused();

  const [visible, setVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const {
    setShowHeader,
    setShowNavigator,
    setHeaderContent,
    setNavigatorContent,
  } = useContext(AppBarContext);

  useEffect(() => {
    if (isFocused) {
      setShowHeader(true);
      setShowNavigator(true);
      setHeaderContent(() => {
        return (
          <>
            <Appbar.Action
              icon="view-headline"
              color={theme.colors.iconColor}
              rippleColor="rgba(0,0,0,0)"
              size={30}
              onPress={() => {
                setVisible(!visible);
                handlePress();
              }}
            />
            <Appbar.Action
              icon="bell"
              color={theme.colors.iconColor}
              size={30}
            />
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
            />
          </>
        );
      });

      setNavigatorContent(
        <>
          <View
            style={{
              display: "flex",
              width: 400,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Appbar.Action
              icon="chart-pie"
              color={theme.colors.iconColor}
              size={45}
            />
            <Surface
              style={{
                backgroundColor: theme.colors.backgroundColor,
                borderRadius: 10,
                marginBottom: bottom,
              }}
              elevation={5}
            >
              <Appbar.Action
                icon="qrcode"
                color={theme.colors.iconColor}
                rippleColor="rgba(0,0,0,0)"
                size={75}
                onPress={() => navigation.navigate("Registration")}
              />
            </Surface>
            <Appbar.Action
              icon="cash-refund"
              color={theme.colors.iconColor}
              size={45}
            />
          </View>
        </>
      );
    }
  }, [theme, isFocused]);
  const pressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handlePress = () => {
    if (!visible) translateY.value -= Dimensions.get("window").height / 2;
    else translateY.value += Dimensions.get("window").height / 2;
  };

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
      backgroundColor: theme.colors.backgroundColor,
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
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      backgroundColor: "rgba(0,0,0,0)",
      position: "absolute",
      bottom: -Dimensions.get("window").height,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      zIndex: 10000,
    },
    modal: {
      width: 300,
      height: "auto",
      backgroundColor: theme.colors.modalWindow,
      borderRadius: 10,
      padding: 10,
      marginBottom: bottom,
    },
    modalButton: {
      marginVertical: 5,
    },
  });

  const animatedStyl = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value * 2) }],
  }));
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
        <Text style={{ color: theme.colors.textColor }}>Home Page</Text>
        <Switch color="red" value={isThemeDark} onValueChange={toggleTheme} />
      </View>

      <Animated.View style={[styles.modalStyle, animatedStyl]}>
        <TouchableOpacity
          onPress={() => {
            handlePress();
            setVisible(!visible);
          }}
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        />
        <View style={styles.modal}>
          <ScrollView>
            <Button
              mode="outlined"
              style={styles.modalButton}
              textColor={theme.colors.textColor}
              onPress={() => console.log("1")}
            >
              TEST BUTTON1
            </Button>
            <Button
              mode="outlined"
              style={styles.modalButton}
              textColor={theme.colors.textColor}
              onPress={() => console.log("2")}
            >
              TEST BUTTON2
            </Button>
            <Button
              mode="outlined"
              style={styles.modalButton}
              textColor={theme.colors.textColor}
              onPress={() => console.log("3")}
            >
              TEST BUTTON3
            </Button>
          </ScrollView>
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
