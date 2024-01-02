import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import usePreferences from '../../contexts/usePreferences'


export const PasswordInput = (props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { toggleTheme, isThemeDark, theme } = usePreferences();

    const styles = StyleSheet.create({
      textInput: {
          height: 50,
          marginBottom: 8,
          backgroundColor: theme.colors.backgroundColor,
          minWidth:250,
          width:'90%',
          borderColor:"white",
          }
    })
  
    const togglePasswordVisibility= () => {
        setIsPasswordVisible(prev => !prev);
    }

    const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
    } = props

  return (
      <TextInput
      mode='outlined'
      style={styles.textInput}
      outlineStyle={{borderRadius:10}}
      outlineColor={theme.colors.textColor}
      activeOutlineColor={theme.colors.textColor}
      value={value}
      onChangeText={(text) => onChange(name)(text)}
      right={
        <TextInput.Icon
          icon={isPasswordVisible ? 'eye-off' : 'eye'}
          onPress={togglePasswordVisibility}
          color={theme.colors.textColor}
          />
      }
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      {...inputProps}
      secureTextEntry = {!isPasswordVisible}
      />
  )
}

