import { Text, View } from "react-native";
import AppbarHeader from "../components/AppbarHeader";
import { IconButton } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import PieChart from "react-native-pie-chart";

export default function Expenses({ navigation }) {
  const { theme } = usePreferences();
  const widthAndHeight = 300;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];
  return (
    <>
      <AppbarHeader
        show={true}
        content={
          <>
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
              // style={{ zIndex: 1000 }}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: theme.colors.textColor,
              }}
            >
              Harcamalar
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
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.45}
        />
      </View>
    </>
  );
}
