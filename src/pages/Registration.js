import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function Registration({ navigation }) {
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
      <Text style={{ fontSize: 30, color: "red" }}>Selam</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Navigate
      </Button>
    </View>
  );
}
