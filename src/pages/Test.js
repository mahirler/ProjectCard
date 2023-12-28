import { useState } from "react";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import CustomPieChart from "../components/CustomPieChart";

export default function Test() {
  const [selected, setSelected] = useState(null);

  const data = [
    {
      key: 1,
      amount: 50,
      svg: {
        fill: "#600080",
        onPress: () => setSelected(0),
      },
      arc: selected == 0 && { outerRadius: "130%", cornerRadius: 10 },
    },
    {
      key: 2,
      amount: 50,
      svg: { fill: "#9900cc", onPress: () => setSelected(1) },
      arc: selected == 1 && { outerRadius: "130%", cornerRadius: 10 },
    },
    {
      key: 3,
      amount: 40,
      svg: { fill: "#c61aff", onPress: () => setSelected(2) },
      arc: selected == 2 && { outerRadius: "130%", cornerRadius: 10 },
    },
    {
      key: 4,
      amount: 95,
      svg: { fill: "#d966ff", onPress: () => setSelected(3) },
      arc: selected == 3 && { outerRadius: "130%", cornerRadius: 10 },
    },
    {
      key: 5,
      amount: 35,
      svg: { fill: "#ecb3ff", onPress: () => setSelected(4) },
      arc: selected == 4 && { outerRadius: "130%", cornerRadius: 10 },
    },
  ];

  return <CustomPieChart data={data} selected={selected} height={500} />;
}
