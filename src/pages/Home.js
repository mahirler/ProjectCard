import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  Appbar,
  Button,
  IconButton,
  Searchbar,
  Surface,
  Text,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";
import AppbarHeader from "../components/AppbarHeader";
import AppbarNavigator from "../components/AppbarNavigator";
import { ModalContext } from "../contexts/ModalContext";
import { Skeleton } from "moti/skeleton";
import ContentSlider from "../components/ContentSlider.";
import LastExpenses from "../components/LastExpenses.";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import StarbucksLogo from "../../assets/brandIcons/starbucks.png";
import BurgerKingLogo from "../../assets/brandIcons/burgerking.png";
import GetirLogo from "../../assets/brandIcons/getir.png";
import TrendyolLogo from "../../assets/brandIcons/trendyol.png";
import MoneyTransfer from "../components/MoneyTransfer";

export default function Home({ navigation }) {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const { setVisible, setContent } = useContext(ModalContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);

  const pressed = useSharedValue(false);
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
      onPress: () => {},
    },
    {
      label: "Destek Merkezi",
      icon: "lifebuoy",
      onPress: () => {},
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
      label: "Profil Düzenle",
      icon: "account-edit-outline",
      onPress: () => {},
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
      onPress: () => {},
    },
    {
      label: "Hesap Hareketleri",
      icon: "account-clock-outline",
      onPress: () => {},
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

  const sliderContent = [
    {
      Text: "Getir",
      Width: 350,
      Icon: GetirLogo,
      GiveBackShare: "%5",
      NoColor: true,
      Comment: "50TL ve üzeri alışverişlerde",
      onPress: () => {
        navigation.navigate("Refund");
      },
    },
    {
      Text: "Burger King",
      Width: 350,
      GiveBackShare: "%10",
      Icon: BurgerKingLogo,
    },
    {
      Text: "Steam",
      Width: 350,
      Icon: "steam",
      GiveBackShare: "%10",
    },
    {
      Text: "Trendyol",
      Width: 350,
      Icon: TrendyolLogo,
      GiveBackShare: "%20",
      NoColor: true,
      Comment: "250TL ve üzeri alışverişlerde",
    },
    {
      Text: "Netflix",
      Width: 350,
      Icon: "netflix",
      GiveBackShare: "%30",
      Comment: "Her ay 30TL ye kadar",
    },
    {
      Text: "Starbucks",
      Width: 350,
      Icon: StarbucksLogo,
      GiveBackShare: "%5",
    },
    {
      Text: "Coffy",
      Width: 350,
      GiveBackShare: "%10",
    },
    {
      Text: "Spotify",
      Width: 350,
      Icon: "spotify",
      GiveBackShare: "%55",
      Comment: "Her ay 15TL ye kadar",
    },
  ];

  const expensesContent = [
    {
      explain: "Efe Dortluoğlu",
      amount: -50,
      date: "15 Kasım 23:00",
      type: "Para Transferi",
    },
    {
      explain: "Rıfkı Kesepara",
      amount: 497,
      date: "15 Kasım 22:39",
      type: "Para Transferi",
    },
    {
      explain: "Geri Ödeme",
      amount: 23,
      date: "15 Eylül 07:58",
      type: "Market Alışverişi",
    },
    {
      explain: "BİM",
      amount: 230,
      date: "15 Eylül 07:55",
      type: "Market Alışverişi",
    },
    {
      explain: "Zafer Bacaksız",
      amount: -100.0,
      date: "14 Ağustos 06:55",
      type: "Para Transferi",
    },
    {
      explain: "Geri Ödeme",
      amount: 2,
      date: "10 Kasım  09:07",
      type: "Kafe Ödemesi",
    },
    {
      explain: "SAU KAFE",
      amount: -20,
      date: "10 Kasım  09:05",
      type: "Kafe Ödemesi",
    },
    {
      explain: "Geri Ödeme",
      amount: 4.99,
      date: "9 Ekim  20:07",
      type: "Tekel Alışverişi",
    },
    {
      explain: "NAVIDRES",
      amount: -49.9,
      date: "9 Ekim  20:05",
      type: "Tekel Alışverişi",
    },
  ];

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
    moneyButtons: {
      width: 140,
      height: 60,
      justifyContent: "center",
      marginHorizontal: 10,
    },
  });

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    width: searBarWidth.value,
  }));

  const qrCodeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pressed.value ? 1.3 : 1) }],
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  useEffect(() => {
    if (showSearch) searBarWidth.value = withTiming("80%");
    else searBarWidth.value = withTiming("0%");
  }, [showSearch]);

  return (
    <GestureHandlerRootView style={styles.container}>
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
      <View
        style={[
          styles.container,
          {
            flexDirection: "column",
            justifyContent: "space-around",
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            height: "20%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 60,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            1537,09 TL
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              mode="outlined"
              textColor={theme.colors.textColor}
              style={styles.moneyButtons}
              labelStyle={{ fontSize: 20, fontWeight: "bold" }}
            >
              YATIR
            </Button>
            <Button
              style={[
                styles.moneyButtons,
                { backgroundColor: isThemeDark ? "white" : "black" },
              ]}
              mode="contained"
              textColor={isThemeDark ? "black" : "white"}
              labelStyle={{ fontSize: 20, fontWeight: "bold" }}
            >
              ÇEK
            </Button>
          </View>
        </View>
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
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: "80%",
          }}
        >
          <LastExpenses
            content={expensesContent}
            height="75%"
            style={{ marginTop: 10 }}
          />
          <ContentSlider content={sliderContent} />
        </View>
      </View>

      <AppbarNavigator
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
                icon="home-outline"
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
      />
    </GestureHandlerRootView>
  );
}
