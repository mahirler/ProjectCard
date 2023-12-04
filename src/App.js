import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  ProgressBar,
  MD3Colors,
  TextInput,
  ActivityIndicator,
  MD2Colors,
  useTheme,
} from "react-native-paper";

export default function App() {
  const [progress, setProgress] = useState(0);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    textInput: {
      fontWeight: "bold",
      fontSize: 20,
      borderBottomWidth: 2,
      borderStartWidth: 2,
      borderTopWidth: 2,
      borderEndWidth: 2,
      borderBottomWidth: 2,
      minWidth: 250,
    },
    red: {
      color: "red",
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={"large"}
        animating={true}
        color={MD2Colors.red800}
      />
      <ProgressBar
        style={{ width: 300, height: 50 }}
        progress={progress}
        color={MD3Colors.error50}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput label="email" mode="outlined" style={{ width: 300 }} />
        <Button
          style={{ backgroundColor: theme.colors.primary }}
          mode="contained"
          textColor={theme.colors.textColor}
          onPress={() => setProgress(1)}
        >
          Çok konuşma sikmim
        </Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput label="email" mode="outlined" style={{ width: 300 }} />
        <Button
          mode="contained"
          style={{ backgroundColor: theme.colors.primary }}
          textColor={theme.colors.textColor}
          onPress={() => setProgress(0)}
        >
          Press me
        </Button>
      </View>
    </View>
  );
}
