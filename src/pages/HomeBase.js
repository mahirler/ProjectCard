import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import usePreferences from "../contexts/usePreferences";

import StarbucksLogo from "../../assets/brandIcons/starbucks.png";
import BurgerKingLogo from "../../assets/brandIcons/burgerking.png";
import GetirLogo from "../../assets/brandIcons/getir.png";
import TrendyolLogo from "../../assets/brandIcons/trendyol.png";
import LastExpenses from "../components/LastExpenses.";
import ContentSlider from "../components/ContentSlider.";

export default function HomeBase({ navigation }) {
  const { theme, isThemeDark } = usePreferences();

  const sliderContent = [
    {
      Text: "Getir",
      Width: 350,
      Icon: GetirLogo,
      GiveBackShare: "%5",
      NoColor: true,
      Comment: "50TL ve üzeri alışverişlerde",
      onPress: () => {
        navigation.navigate("Opportunities");
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

  return (
    <GestureHandlerRootView style={styles.container}>
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
    </GestureHandlerRootView>
  );
}
