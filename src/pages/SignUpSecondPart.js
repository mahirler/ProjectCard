import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { SubmitButton, NavigateHomeButton } from "../components/form/Buttons";
import { PasswordInput } from "../components/form/PasswordInput";

export default function SignUpSecondPart({ navigation }) {
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
    titleContainer:{
      display:"flex",
      flexDirection:"row",
      width:"90%",
      marginBottom: 20
    },
    titleText:{
      fontSize: 30,
      fontWeight:"bold"
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

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <NavigateHomeButton navigation={navigation}/>
        <Text style={styles.titleText}>Kayıt Ol</Text>  
      </View>

      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({handleSubmit, errors, touched}) => (
        <>
           
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

            {Object.keys(errors).map((fieldName) => (
              touched[fieldName] && (
                <Text key={fieldName} style={styles.errorText}>
                  {errors[fieldName]}
                </Text>
              )
            ))}
            

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