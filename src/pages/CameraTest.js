import { Camera, CameraType } from "expo-camera";
import { View } from "moti";
import { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Icon } from "react-native-paper";

export default function CameraTest({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("Home");
  };

  const [permission, requesPermission] = Camera.useCameraPermissions();

  if (permission)
    return (
      <View style={styles.container}>
        <BarCodeScanner
          style={styles.camera}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <Icon source="scan-helper" color="white" size={300} />
        </BarCodeScanner>
      </View>
    );
  else requesPermission();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
