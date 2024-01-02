import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import usePreferences from '../../contexts/usePreferences'


export const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props
  const { toggleTheme, isThemeDark, theme } = usePreferences();

  const styles = StyleSheet.create({
    textInput: {
        height: 50,
        marginBottom: 8,
        backgroundColor: theme.colors.backgroundColor,
        minWidth:250,
        width:'90%',
        }
  })

  return (
      <TextInput
      mode='outlined'
      style={styles.textInput}
      outlineStyle={{borderRadius:10}}
      outlineColor={theme.colors.textColor}
      activeOutlineColor={theme.colors.textColor}
      value={value}
      onChangeText={(text) => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      {...inputProps}
      />
  )
}

