import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        marginBottom: 15,
        backgroundColor: 'white',
        borderColor: 'gray',
        minWidth:250,
        width:'90%',
      },
    errorText: {
      fontSize: 10,
      color: 'red',
    },
    errorInput: {
      borderColor: 'red',
    }
  })

export const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
      mode='outlined'
      style={[
        styles.textInput,
        hasError && styles.errorInput
      ]}
      value={value}
      onChangeText={(text) => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name)
        onBlur(name)
      }}
      {...inputProps}
      />
      {hasError && touched && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

