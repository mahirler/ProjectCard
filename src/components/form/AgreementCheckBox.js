import { View } from "react-native";
import CheckBox from "react-native-check-box";

import React from 'react'

const AgreementCheckBox = ({isChecked, onClick}) => {
  return (
    <View 
    style={{ margin:7,}}>
    <CheckBox
    isChecked={isChecked}
    onClick={onClick}
    style={{ marginEnd:'auto'}}
    />
    </View>
  )
}

export default AgreementCheckBox
