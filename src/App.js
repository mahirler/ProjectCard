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
  const [progress, setProgress] = useState(false);
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
        animating={false}
        color={MD2Colors.red800}
      />
      <ProgressBar
        style={{ width: 300, height: 50 }}
        progress={progress ? 1 : 0}
        color={MD3Colors.error50}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput label="email" mode="outlined" style={{ width: 250 }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput label="email" mode="outlined" style={{ width: 250 }} />
      </View>
      <Button
        mode="contained"
        style={{
          backgroundColor: theme.colors.primary,
          width: 250,
          margin: 0,
          justifyContent: "center",
        }}
        textColor={theme.colors.textColor}
        onPress={() => setProgress(!progress)}
      >
        Load
      </Button>
    </View>
  );
}
