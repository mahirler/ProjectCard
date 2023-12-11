import { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Appbar, Button, Surface, Switch, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";
import AppbarHeader from "../components/AppbarHeader";
import AppbarNavigator from "../components/AppbarNavigator";
import { ModalContext } from "../contexts/ModalContext";
import { Skeleton } from "moti/skeleton";
import Test from "./Test";
import ContentSlider from "../components/ContentSlider.";
import LastExpenses from "../components/LastExpenses.";

export default function Home({ navigation }) {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const { setVisible, setContent } = useContext(ModalContext);

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
      label: "Cashback",
      icon: "cash-refund",
      onPress: () => {},
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
        navigation.navigate("SignUpFirstPart");
        setVisible(false);
      },
    },
  ];

  const sliderContent = [
    {
      Text: "Hello World",
      Width: 350,
    },
    {
      Text: "Deneme",
      Width: 350,
    },
    {
      Text: "12345",
      Width: 350,
    },
    {
      Text: "Hello World",
      Width: 350,
    },
    {
      Text: "Hello World",
      Width: 350,
    },
    {
      Text: "Hello World",
      Width: 350,
    },
    {
      Text: "Hello World",
      Width: 350,
    },
    {
      Text: "Rifki",
      Width: 350,
    },
  ];

  const expensesContent = [
    {
      explain: "Harcama açıklaması",
      amount: -50,
      date: "15 Kasım 2023 23:00",
    },
    {
      explain: "Harçlık",
      amount: 1000,
      date: "15 Kasım 2023 22:39",
    },
    {
      explain: "SAU KAFE",
      amount: -25.25,
      date: "07 Temmuz 2023 16:53",
    },
    {
      explain: "NAVIDRES",
      amount: "-49.90",
      date: "15 Eylül 2022 07:55",
    },
    {
      explain: "Harcama açıklaması",
      amount: -50,
      date: "14 Ağustos 2022 07:55",
    },
    {
      explain: "Harçlık",
      amount: 1000,
      date: "14 Ağustos 2022 06:55",
    },
    {
      explain: "SAU KAFE",
      amount: -25.25,
      date: "10 Kasım 2021 09:05",
    },
    {
      explain: "NAVIDRES",
      amount: "-49.90",
      date: "9 Ekim 2021 20:05",
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
      width: 150,
      height: 60,
      justifyContent: "center",
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppbarHeader
        show={true}
        content={
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
              rippleColor="rgba(0,0,0,0)"
              onPress={() => {
                setContent(ProfileModal);
                setVisible(true);
              }}
              size={30}
            />
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
        <Text style={{ fontSize: 80, fontWeight: "bold" }}>30,45 TL</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: 400,
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
        <LastExpenses content={expensesContent} />
        <ContentSlider content={sliderContent} />
      </View>

      <AppbarNavigator
        show={true}
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
                icon="chart-pie"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
              />
              <Appbar.Action
                icon="home-outline"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
              />
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
              <Appbar.Action
                icon="store-outline"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
              />
              <Appbar.Action
                icon="cash-refund"
                color={theme.colors.iconColor}
                size={45}
                style={{ margin: 0 }}
              />
            </View>
          </>
        }
      />
    </GestureHandlerRootView>
  );
}
