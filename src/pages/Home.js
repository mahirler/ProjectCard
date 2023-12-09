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

export default function Home({ navigation }) {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const { setVisible, setContent } = useContext(ModalContext);

  const MenuModal = [
    {
      label: "Ayarlar",
      icon: "cog-outline",
      onPress: () => {},
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
        navigation.navigate("Registration");
        setVisible(false);
      },
    },
  ];

  const { bottom } = useSafeAreaInsets();

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
        <Skeleton
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
          >
            <Switch
              color="red"
              value={isThemeDark}
              onValueChange={toggleTheme}
            />
          </View>
        </Skeleton>
        <Skeleton
          show="true"
          width={Dimensions.get("window").width - 40}
          colorMode={isThemeDark ? "dark" : "light"}
        >
          <View
            style={{
              width: Dimensions.get("window").width - 40,
              height: 100,
              backgroundColor: "grey",
              borderRadius: 20,
            }}
          ></View>
        </Skeleton>
      </View>

      <AppbarNavigator
        show={true}
        content={
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
                  onPress={() => navigation.navigate("CameraTest")}
                />
              </Surface>
              <Appbar.Action
                icon="cash-refund"
                color={theme.colors.iconColor}
                size={45}
              />
            </View>
          </>
        }
      />
    </GestureHandlerRootView>
  );
}
