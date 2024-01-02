import { Button, Divider, Icon, IconButton } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { Text, View } from "react-native";
import React, { useRef, useState } from "react";
import usePreferences from "../contexts/usePreferences";
import {
  GestureHandlerRootView,
  Swipeable,
  ScrollView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

function NotificationBar({ index, item, clearIndexed }) {
  const { theme } = usePreferences();
  const swipeRef = useRef(null);

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <Animated.View
        style={[
          {
            backgroundColor: "red",
            width: "100%",
            alignItems: "flex-end",
          },
        ]}
      >
        <IconButton
          icon={"delete"}
          size={60}
          color="white"
          onPress={() => {
            // swipeRef.current.reset();
            // clearIndexed(index);
          }}
        />
      </Animated.View>
    );
  };

  return (
    <Swipeable
      key={index}
      rightThreshold={110}
      friction={2}
      onSwipeableOpen={() => {
        swipeRef.current.reset();
        clearIndexed(index);
      }}
      ref={swipeRef}
      style={{ position: "relative" }}
      renderRightActions={renderLeftActions}
    >
      <View
        style={[
          {
            width: "100%",
            minHeight: 100,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.backgroundColor,
            marginLeft: 7,
          },
        ]}
      >
        <View
          style={{
            width: 65,
            height: 65,
            backgroundColor: "grey",
            borderRadius: 7,
          }}
        />
        <View
          style={{
            marginLeft: 15,
            width: "75%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "grey",
              }}
            >
              {item.date}
            </Text>
          </View>
          <Text
            style={{
              color: theme.colors.textColor,
              width: "100%",
            }}
          >
            {item.detail}
          </Text>
        </View>
      </View>
      <Divider leftInset="true" />
    </Swipeable>
  );
}

export default function Notifications({ navigation }) {
  const { theme } = usePreferences();
  const [content, setContent] = useState([
    {
      id: 0,
      title: "Benbuy Geri Ödeme",
      detail: "BİM alışverişinde kazanıdığın 23TL hesabına aktarılmıştır.",
      date: "8 Aralık 23:23",
    },
    {
      id: 1,
      title: "Market Alışverişi",
      detail: "Heasbınızdan BİM mağazasında 230TL'lik harcama yapılmıştır.",
      date: "1 Aralık 19:22",
    },
    {
      id: 2,
      title: "Aylık Hesap Özetin",
      detail:
        "Ekim ayında yaptığın harcamaların ve kazandığın geri ödemeleri görmek için tıkla.",
      date: "4 Kasım 13:22",
    },
    {
      id: 3,
      title: "İndirim Kampanyası",
      detail:
        "Steamde yapacağın her 250TL ve altındaki harcamalarda net %15'lik indirim seni bekliyor. Karçırma!",
      date: "1 Ekim 23:23",
    },
    {
      id: 4,
      title: "Para Yatırma İşlemi",
      detail: "Hesabına 1000TL yatırdın. Güle güle harca!",
      date: "8m ago",
    },
    {
      id: 5,
      title: "İndirim Kampanyası",
      detail:
        "Steamde yapacağın her 250TL ve altındaki harcamalarda net %15'lik indirim seni bekliyor. Karçırma!",
      date: "1 Ekim 23:23",
    },
    {
      id: 6,
      title: "Para Yatırma İşlemi",
      detail: "Hesabına 1000TL yatırdın. Güle güle harca!",
      date: "8m ago",
    },
  ]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppbarHeader
        show={true}
        content={
          <>
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Bildirimler
            </Text>
            <IconButton icon="cog-outline" size={30} />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: theme.colors.backgroundColor,
          alignItems: "center",
        }}
      >
        <Button
          style={{ alignSelf: "flex-start", marginLeft: 5, marginTop: 15 }}
          textColor={theme.colors.textColor}
          onPress={() => setContent([])}
          rippleColor={"rgba(0,0,0,0)"}
        >
          Tümünü Sil
        </Button>
        {content.length != 0 ? (
          <ScrollView style={{ width: "100%", zIndex: 1000 }}>
            {content.map((item, _index) => {
              return (
                <NotificationBar
                  key={_index}
                  index={_index}
                  item={item}
                  clearIndexed={(index) => {
                    if (content.length == 1) {
                      setContent([]);
                    } else {
                      var array = [...content]; // make a separate copy of the array
                      if (index !== -1) {
                        array.splice(index, 1);
                        setContent(array);
                      }
                    }
                  }}
                />
              );
            })}
          </ScrollView>
        ) : (
          <Text
            style={{
              color: theme.colors.textColor,
              fontSize: 50,
              fontWeight: "bold",
              verticalAlign: "middle",
              textAlign: "center",
            }}
          >
            Bildirim Yok
          </Text>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
