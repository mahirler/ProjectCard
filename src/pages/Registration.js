import { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { AppBarContext } from "../contexts/AppBarContext";

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

  const { setShowNavigator, setShowHeader } = useContext(AppBarContext);

  useEffect(() => {
    setShowHeader(false);
    setShowNavigator(false);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Selam</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Navigate
      </Button>
    </View>
  );
}
