import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SignUp({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex : 1,
      justifyContent : "center",
      backgroundColor: theme.colors.background,
      alignItems: "center",
    },
    signUpView:{
      minWidth:150,
      backgroundColor: 'white',
      borderWidth:2,
      borderColor: 'black',
      borderRadius:10,
      borderColor: 'gray',
      margin:10,
      justifyContent:"center",
      alignItems:"center",
    },
    cancelButton:{
      backgroundColor:"red",
    },
    buttonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:25,
      width:"90%",
    },
    red: {
      color: "red",
    },
  });

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (values)=>{
    console.log(values);
    handleDismissKeyboard();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom:30, }}>Registration Form</Text>
      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={{email: "",name:"",phoneNumber:"",password:"", confirmPassword:"",}}
        onSubmit={onSubmit}
      >
        {({handleSubmit}) => (
        <>
            <Field
            component={CustomInput}
            name="name"
            label="Name"
            />
            <Field
            component={CustomInput}
            name="email"
            label="Email"
            keyboardType="email-address"
            />
            <Field
            component={CustomInput}
            name="phoneNumber"
            label="PhoneNumber"
            keyboardType="numeric"
            />
            <Field
            component={CustomInput}
            name="password"
            label="Password"
            secureTextEntry
            />
            <Field
            component={CustomInput}
            name="confirmPassword"
            label="Confirm Password"
            secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <View style={styles.signUpView} >
                {isLoading 
                ? <ActivityIndicator size="small" color="green" />
                : <Button mode="contained" onPress={handleSubmit} type="Submit" >Sign Up</Button>
                }
                </View>
              <Button style={[styles.signUpView, styles.cancelButton]} mode="contained" onPress={() => navigation.navigate("Home")}>
                  Navigate Back
                </Button>
            </View>
          </>
        )}
      </Formik>
     
    </View>
    </TouchableWithoutFeedback>

  );
}
