import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Appbar, Text, useTheme, } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { SubmitButton, NavigateHomeButton } from "../components/form/Buttons";
import { PasswordInput } from "../components/form/PasswordInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default function SignUpFirstPart({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex : 1,
      justifyContent : "center",
      backgroundColor: "white",
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
      marginTop:15
    },
    signInText:{
      link:{
        color:'black',
        fontWeight:"bold"
      },
      phrase:{
        color:"gray",
        fontWeight:"bold"
      }
    },
    buttonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:30,
      width:"90%",
    },
    titleText:{
      fontSize: 30,
      fontWeight:"bold",
      marginBottom:30
    },
    errorText: {
      color: "#A10000",
    },
  });

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (values)=>{
    console.log(values);
    handleDismissKeyboard();
    setIsLoading(true);
    navigation.navigate("SignUpSecondPart")

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const initialValues = {email: "",name:"",phoneNumber:"",password:"", confirmPassword:"",}

  foundError = false;
  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <View style={styles.container}>

        <Text style={styles.titleText}>Kayıt Ol</Text>  

      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({handleSubmit, errors, touched}) => (
        <>
            <Field
            component={CustomInput}
            name="name"
            placeholder="Name"
            />
            <Field
            component={CustomInput}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            />
            <Field
            component={CustomInput}
            name="phoneNumber"
            placeholder="PhoneNumber"
            keyboardType="numeric"
            />
            <Field
            component={PasswordInput}
            name="password"
            placeholder="Password"
            />
            <Field
            component={PasswordInput}
            name="confirmPassword"
            placeholder="Confirm Password"
            />

              {
                (() => {
                  for (const fieldName of Object.keys(errors)) {
                    if (touched[fieldName]) {
                      return (
                        <Text key={fieldName} style={styles.errorText}>
                          {errors[fieldName]}
                        </Text>
                      );
                      break
                    }
                  }
                  return null; // Return null if there are no errors or after finding the first error
                })()
              }
            

            <View style={styles.navigationTextContainer}>
              <Text style={styles.signInText.phrase} >Bir hesaba sahipsen  </Text>
              <Text 
                style={styles.signInText.link} onPress={() => navigation.navigate("SignIn")}>
                  Giriş Yap
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <SubmitButton handleSubmit={handleSubmit} loading={isLoading}>Devam Et</SubmitButton>
            </View>
          </>
        )}
      </Formik>
    </View>
    </TouchableWithoutFeedback>

  );
}
