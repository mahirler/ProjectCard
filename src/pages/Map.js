import { View } from "react-native";
import { Text, Image } from "react-native";
import usePreferences from "../contexts/usePreferences";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import AppbarHeader from "../components/AppbarHeader";
import { Icon, IconButton } from "react-native-paper";
import MarkerIcon from "../../assets/marker.png";
import { useState } from "react";
import { useRef } from "react";
import ModalWindowBottom from "../components/ModalWindowBottom";

export default function Map({ navigation }) {
  const { theme, isThemeDark } = usePreferences();

  const markers = [
    {
      latitude: 40.74983262550481,
      longitude: 30.363843638657414,
      content: { text: "SAU Coffy'de %30 anında geri ödeme." },
    },
    {
      latitude: 40.73768247480036,
      longitude: 30.36165425793588,
      content: { text: "A101'de anında %50 geri ödeme." },
    },
  ];

  const ref = useRef(null);
  const [selected, setSelected] = useState(false);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.backgroundColor,
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
              Harita
            </Text>
            <IconButton icon="cog-outline" size={30} />
          </>
        }
        headerStyle={{ justifyContent: "space-between" }}
      />
      <MapView
        ref={ref}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 40.74983262550481,
          latitudeDelta: 0.0360726402466085,
          longitude: 30.363843638657414,
          longitudeDelta: 0.022869149943360867,
        }}
        mapType="mutedStandard"
        userInterfaceStyle={isThemeDark ? "dark" : "light"}
      >
        {markers.map((item, _index) => {
          return (
            <Marker
              id={_index}
              identifier={_index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={(e) => {
                ref.current.animateToRegion(e.nativeEvent.coordinate, 500);
              }}
              onSelect={(e) => {
                setSelected({
                  bool: true,
                  id: _index,
                  content: item.content,
                });
              }}
              onDeselect={() =>
                setSelected({ ...selected, id: -1, bool: false })
              }
            >
              <Icon
                source="store"
                size={45}
                color={
                  selected.id === _index && !selected.bool + 1 ? "black" : "red"
                }
              />
            </Marker>
          );
        })}
      </MapView>
      <ModalWindowBottom visible={selected.bool} content={selected.content} />
    </View>
  );
}
