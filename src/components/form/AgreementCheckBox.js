import { View } from "react-native";
import CheckBox from "expo-checkbox"
import usePreferences from "../../contexts/usePreferences";
import React from 'react'

const AgreementCheckBox = ({isChecked, onClick}) => {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  return (
    <View 
    style={{ margin:7,}}>
    <CheckBox
    value={isChecked}
    onValueChange={onClick}
    style={{ marginEnd:'auto'}}
    />
    </View>
  )
}

export default AgreementCheckBox
