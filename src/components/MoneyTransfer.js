import { View, ScrollView, Modal, Platform } from "react-native";
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Searchbar,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import React, { useState } from "react";

export default function MoneyTransfer({ showSendMoney, navigation }) {
  const { theme, isThemeDark } = usePreferences();
  const [value, setValue] = useState("phonenumber");
  const [filterValue, setFilterValue] = useState("");

  const contacts = [
    {
      Name: "Ömer Kaya",
      Icon: null,
      Number: "+905548838283",
      BenbuyNo: 21,
    },
    {
      Name: "Rıfkı Kesepara",
      Icon: null,
      Number: "+905316639317",
      BenbuyNo: 300,
    },
    {
      Name: "Efe Dortluoğlu",
      Icon: null,
      Number: "+905313313131",
      BenbuyNo: 34,
    },
    {
      Name: "Zafer Bacaksız",
      Icon: null,
      Number: "+905313313131",
      BenbuyNo: 50,
    },
    {
      Name: "Ömer Kaya",
      Icon: null,
      Number: "+905548838283",
      BenbuyNo: 21,
    },
    {
      Name: "Rıfkı Kesepara",
      Icon: null,
      Number: "+905316639317",
      BenbuyNo: 300,
    },
    {
      Name: "Efe Dortluoğlu",
      Icon: null,
      Number: "+905313313131",
      BenbuyNo: 34,
    },
    {
      Name: "Zafer Bacaksız",
      Icon: null,
      Number: "+905313313131",
      BenbuyNo: 50,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.backgroundColor,
      }}
    >
      <IconButton
        icon="close"
        iconColor={theme.colors.iconColor}
        onPress={() => showSendMoney(false)}
        style={{ alignSelf: "flex-start" }}
      />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{ width: "90%" }}
        buttons={[
          {
            value: "phonenumber",
            label: "Cep Telefonu",
          },
          {
            value: "benbuyno",
            label: "Benbuy NO",
          },
        ]}
      />
      {value == "phonenumber" ? (
        <>
          <Searchbar
            onBlur={(e) => console.log(this)}
            style={{
              width: "90%",
              marginTop: 10,
              borderWidth: 1,
              //   backgroundColor: theme.colors.backgroundColor,
            }}
            placeholder="Kişi Arama"
            onChangeText={(text) => setFilterValue(text)}
            clearButtonMode="always"
            clearIcon="close"
          />

          <ScrollView
            style={{
              flex: 1,
              width: "100%",
              marginTop: 10,
            }}
          >
            {contacts
              .filter((item) => {
                if (filterValue == "") return item;
                else
                  return item.Name.toLowerCase().includes(
                    filterValue.toLocaleLowerCase()
                  );
              })
              .map((item, _index) => {
                return (
                  <React.Fragment key={_index}>
                    <View
                      style={{
                        height: 100,
                        alignItems: "center",
                        width: "90%",
                        alignSelf: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                          backgroundColor: "grey",
                        }}
                      />
                      <View
                        style={{
                          width: "100%",
                          marginLeft: 20,
                          height: "60%",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>{item.Name}</Text>
                        <Text>{item.Number}</Text>
                      </View>
                    </View>
                    <Divider leftInset="true" />
                  </React.Fragment>
                );
              })}
          </ScrollView>
        </>
      ) : (
        <React.Fragment>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginTop: 20,
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "space-between",
                height: 80,
              }}
            >
              <Text style={{ fontSize: 20 }}>Hızlı İşlemler</Text>
              <Icon source="account-circle-outline" size={45} />
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: 80,
              }}
            >
              <Text style={{ fontSize: 20 }}>Yeni Adres Ekle</Text>
              <Icon source="plus-box-outline" size={45} />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: 200,
              justifyContent: "space-around",
            }}
          >
            <Searchbar
              key={20}
              autoFocus={true}
              clearButtonMode="always"
              style={{
                width: "90%",
                marginTop: 10,
                borderWidth: 1,
                // backgroundColor: theme.colors.backgroundColor,
              }}
              placeholder="Benbuy No"
              // onChangeText={(text) => setFilterValue(text)}
              clearIcon="close"
              keyboardType="numeric"
            />
            <Button
              mode="contained"
              textColor={isThemeDark ? "black" : "white"}
              buttonColor={isThemeDark ? "white" : "black"}
              style={{ width: "90%", height: 70, justifyContent: "center" }}
            >
              Devam Et
            </Button>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}
