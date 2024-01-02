import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

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

export const CustomInput = (props) => {
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
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      {...inputProps}
      />
  )
}

