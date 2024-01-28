import React, { useContext, useEffect, useState } from "react";
import { Appbar, Icon, IconButton, Searchbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";
import AppbarHeader from "../components/AppbarHeader";
import { ModalContext } from "../contexts/ModalContext";
import { Skeleton } from "moti/skeleton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeBase from "./HomeBase";
import Expenses from "./Expenses";
import Map from "./Map";
import MoneyTransfer from "../components/MoneyTransfer";
import { Platform, Modal } from "react-native";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const { setVisible, setContent } = useContext(ModalContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);

  const searBarWidth = useSharedValue(0);

  const MenuModal = [
    {
      label: "Ayarlar",
      icon: "cog-outline",
      onPress: () => {
        navigation.navigate("Settings");
        setVisible(false);
      },
    },
    {
      label: "Ücretler ve Kampanyalar",
      icon: "cash-multiple",
      onPress: () => {
        navigation.navigate("Opportunities");
        setVisible(false);
      },
    },
    {
      label: "Destek Merkezi",
      icon: "lifebuoy",
      onPress: () => {
        navigation.navigate("SearchPage");
        setVisible(false);
      },
    },
    {
      label: "SSS",
      icon: "forum",
      onPress: () => {},
    },
    {
      label: "Geri Ödemeler",
      icon: "cash-refund",
      onPress: () => {
        navigation.navigate("Refund");
        setVisible(false);
      },
    },
  ];

  const ProfileModal = [
    {
      label: "Profil",
      icon: "account-edit-outline",
      onPress: () => {
        navigation.navigate("Profile");
        setVisible(false);
      },
    },
    {
      label: "Arkadaşlar",
      icon: "account-group-outline",
      onPress: () => {},
    },
    {
      label: "Hesap Detayları",
      icon: "briefcase-account-outline",
      onPress: () => {},
    },
    {
      label: "Arkadaşını Davet Et",
      icon: "account-plus-outline",
      onPress: () => {
        navigation.navigate("InvitationPage")
        setVisible(false)
      },
    },
    {
      label: "Hesap Hareketleri",
      icon: "account-clock-outline",
      onPress: () => {
        navigation.navigate("AccountHistory")
        setVisible(false);
      },
    },
    {
      label: "Güvenli Çıkış",
      icon: "logout",
      onPress: () => {
        navigation.navigate("SignUp");
        setVisible(false);
      },
    },
  ];

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    width: searBarWidth.value,
  }));

  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (showSearch) searBarWidth.value = withTiming("80%");
    else searBarWidth.value = withTiming("0%");
  }, [showSearch]);

  return (
    <>
      {/* <GestureHandlerRootView style={styles.container}> */}
      <AppbarHeader
        show={true}
        content={
          <>
            {!showSearch && (
              <>
                <Appbar.Action
                  icon="view-headline"
                  color={theme.colors.iconColor}
                  rippleColor="rgba(0,0,0,0)"
                  size={30}
                  onPress={() => {
                    setContent(MenuModal);
                    setVisible(true);
                  }}
                />
                <Appbar.Action
                  icon="bell-outline"
                  color={theme.colors.iconColor}
                  size={30}
                  onPress={() => navigation.navigate("Notifications")}
                />
                <Text style={{ fontSize: 40, fontWeight: "500" }}>BENBUY</Text>
                <Appbar.Action
                  icon="magnify"
                  color={theme.colors.iconColor}
                  rippleColor="rgba(0,0,0,0)"
                  size={30}
                  onPress={() => {
                    setShowSearch(true);
                  }}
                />
              </>
            )}
            <Animated.View
              style={[
                {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
                searchBarAnimatedStyle,
              ]}
            >
              {showSearch && (
                <Searchbar
                  style={{ width: "100%" }}
                  placeholder="Ara"
                  iconColor={!showSearch && theme.colors.backgroundColor}
                />
              )}
              {showSearch && (
                <IconButton
                  icon={"close"}
                  size={40}
                  onPress={() => setShowSearch(false)}
                  style={{ position: "absolute", top: 0, margin: 0 }}
                />
              )}
            </Animated.View>
            {!showSearch && (
              <Appbar.Action
                icon="account-circle-outline"
                color={theme.colors.iconColor}
                rippleColor="rgba(0,0,0,0)"
                onPress={() => {
                  setContent(ProfileModal);
                  setVisible(true);
                }}
                size={30}
              />
            )}
          </>
        }
      />
      {/* <Skeleton
          show="true"
          width={Dimensions.get("window").width - 40}
          colorMode={isThemeDark ? "dark" : "light"}
        >
          <View
            style={{
              width: Dimensions.get("window").width - 40,
              height: 300,
              backgroundColor: "grey",
              borderRadius: 20,
            }}
          ></View>
        </Skeleton> */}
      {/* <AppbarNavigator
        show={true}
        style={{ height: 80 }}
        content={
          <>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Appbar.Action
                icon="credit-card-clock-outline"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
                onPress={() => navigation.navigate("Expenses")}
              />
              <Appbar.Action
                icon="home"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
              />
              <GestureDetector gesture={tap}>
                <Animated.View style={[qrCodeAnimatedStyle]}>
                  <Surface
                    style={{
                      backgroundColor: theme.colors.backgroundColor,
                      borderRadius: 10,
                    }}
                    elevation={5}
                  >
                    <Appbar.Action
                      icon="qrcode"
                      color={theme.colors.iconColor}
                      rippleColor="rgba(0,0,0,0)"
                      size={50}
                      style={{ margin: 0 }}
                      onPress={() => navigation.navigate("CameraTest")}
                    />
                  </Surface>
                </Animated.View>
              </GestureDetector>
              <Appbar.Action
                icon="map-marker-outline"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
                onPress={() => navigation.navigate("Map")}
              />
              <Appbar.Action
                icon="swap-horizontal"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
                onPress={() => setShowSendMoney(true)}
              />
            </View>
            <Modal
              visible={showSendMoney}
              presentationStyle="formSheet"
              animationType="slide"
            >
              <MoneyTransfer showSendMoney={setShowSendMoney} />
            </Modal>
          </>
        }
      /> */}
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.backgroundColor,
              borderTopWidth: 0,
              height:
                Platform.OS == "android"
                  ? insets.bottom + 60
                  : insets.bottom + 50,
            },
            tabBarShowLabel: false,
          }}
          initialRouteName="HomeBase"
          safeAreaInsets={insets}
        >
          <Tab.Screen
            name="Expenses"
            component={Expenses}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={
                    focused ? "credit-card-clock" : "credit-card-clock-outline"
                  }
                  size={45}
                  color={isThemeDark ? "white" : "black"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="HomeBase"
            component={HomeBase}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={focused ? "home" : "home-outline"}
                  size={45}
                  color={isThemeDark ? "white" : "black"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Camera"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <IconButton
                  icon={focused ? "qrcode" : "qrcode"}
                  size={45}
                  iconColor={isThemeDark ? "white" : "black"}
                  onPress={() => navigation.navigate("CameraTest")}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={focused ? "map-marker" : "map-marker-outline"}
                  size={45}
                  color={isThemeDark ? "white" : "black"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="SendMoney"
            component={MoneyTransfer}
            options={{
              tabBarIcon: ({ focused }) => (
                <IconButton
                  rippleColor={"rgba(0,0,0,0)"}
                  icon={focused ? "swap-horizontal" : "swap-horizontal"}
                  size={45}
                  iconColor={isThemeDark ? "white" : "black"}
                  onPress={() => setShowSendMoney(true)}
                />
              ),
            }}
          />
        </Tab.Navigator>
        <Modal
          visible={showSendMoney}
          presentationStyle="formSheet"
          animationType="slide"
        >
          <MoneyTransfer showSendMoney={setShowSendMoney} navigation={navigation}/>
        </Modal>
      </>
      {/* </GestureHandlerRootView> */}
    </>
  );
}
