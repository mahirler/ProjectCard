import { Button, Divider, IconButton } from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import usePreferences from "../contexts/usePreferences";

export default function Notifications({ navigation }) {
  const { theme } = usePreferences();

  const [content, setContent] = useState([
    {
      title: "Benbuy Geri Ödeme",
      detail: "BİM alışverişinde kazanıdığın 23TL hesabına aktarılmıştır.",
      date: "8 Aralık 23:23",
    },
    {
      title: "Market Alışverişi",
      detail: "Heasbınızdan BİM mağazasında 230TL'lik harcama yapılmıştır.",
      date: "1 Aralık 19:22",
    },
    {
      title: "Aylık Hesap Özetin",
      detail:
        "Ekim ayında yaptığın harcamaların ve kazandığın geri ödemeleri görmek için tıkla.",
      date: "4 Kasım 13:22",
    },
    {
      title: "İndirim Kampanyası",
      detail:
        "Steamde yapacağın her 250TL ve altındaki harcamalarda net %15'lik indirim seni bekliyor. Karçırma!",
      date: "1 Ekim 23:23",
    },
    {
      title: "Para Yatırma İşlemi",
      detail: "Hesabına 1000TL yatırdın. Güle güle harca!",
      date: "8m ago",
    },
    {
      title: "Para Yatırma İşlemi",
      detail: "Hesabına 50TL yatırdın. Güle güle harca!",
      date: "5m ago",
    },
    {
      title: "Para Yatırma İşlemi",
      detail: "Hesabına 25TL yatırdın. Güle güle harca!",
      date: "2m ago",
    },
    {
      title: "Para Yatırma İşlemi",
      detail: "Hesabına 5000TL yatırdın. Güle güle harca!",
      date: "2m ago",
    },
  ]);

  return (
    <React.Fragment>
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
          <ScrollView style={{ width: "90%" }}>
            {content.map((item, _index) => {
              return (
                <>
                  <View
                    key={_index}
                    style={{
                      width: "100%",
                      minHeight: 100,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
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
                </>
              );
            })}
          </ScrollView>
        ) : (
          <Text
            style={{
              color: theme.colors.textColor,
              flex: 1,
              verticalAlign: "middle",
              fontSize: 50,
              fontWeight: "bold",
            }}
          >
            Bildirim Yok
          </Text>
        )}
      </View>
    </React.Fragment>
  );
}
