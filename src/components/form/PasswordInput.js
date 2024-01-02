import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { useState } from 'react'

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        marginBottom: 8,
        backgroundColor: '#F6F6F6',
        minWidth:250,
        width:'90%',
        borderColor:"white",
        }
  })

 

export const PasswordInput = (props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      outlineColor='white'
      value={value}
      onChangeText={(text) => onChange(name)(text)}
      right={
        <TextInput.Icon
          icon={isPasswordVisible ? 'eye-off' : 'eye'}
          onPress={togglePasswordVisibility}
          color="#3E3E3E"
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

