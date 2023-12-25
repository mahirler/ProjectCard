import { useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function Test() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <MapView provider="google" region={region} onRegionChange={setRegion} />
  );
}
