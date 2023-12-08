import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import UnderlinedText from "../components/UnderlinedText";
import { SubmitButton, NavigateHomeButton } from "../components/form/Buttons";

export default function SignIn({ navigation }) {
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
    navigationTextContainer:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
    },
    signInText:{
      textStyle :{
        color:'#4b0082',
      },
      underlineColor:'#4b0082',
    },
    buttonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:5,
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


  const initialValues = {name:"",password:"",}

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom:30, }}>Sign In Form</Text>
      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={initialValues}
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
            name="password"
            label="Password"
            secureTextEntry
            />

            <View style={styles.navigationTextContainer}>
              <Text >Do not have an account? </Text>
              <UnderlinedText 
                style={styles.signInText.underlineColor} textStyle={styles.signInText.textStyle} onPress={() => navigation.navigate("SignUp")}>
                  Sign Up
              </UnderlinedText>
            </View>

            <View style={styles.buttonContainer}>
              <SubmitButton handleSubmit={handleSubmit} loading={isLoading}>Sign In</SubmitButton>
              <NavigateHomeButton navigation={navigation}/>
            </View>
          </>
        )}
      </Formik>
     
    </View>
    </TouchableWithoutFeedback>

  );
}
