import { useState } from "react";
import { Text } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";

export default function CustomPieChart({
  style,
  data,
  selected,
  height = 200,
}) {
  const GetTotalAmount = () => {
    let amount = 0;
    for (let i = 0; i < data.length; i++) amount += data[i].amount;
    return amount;
  };

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={30}
          fontWeight={"bold"}
        >
          {selected == index &&
            ((data.amount / GetTotalAmount()) * 100).toFixed(2) + "%"}
        </Text>
      );
    });
  };

  return (
    <PieChart
      style={{ ...style, height: height }}
      outerRadius={"70%"}
      innerRadius={30}
      valueAccessor={({ item }) => item.amount}
      data={data}
      spacing={0}
      animate={true}
      animationDuration={1000}
    >
      <Labels />
    </PieChart>
  );
}
