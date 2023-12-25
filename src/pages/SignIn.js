import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Text, useTheme,} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { PasswordInput } from "../components/form/PasswordInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInValidationSchema } from "../validations/SignInValidations";
import SubmitButton from "../components/form/SubmitButton";


export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

export default function SignUp({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
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
    safeAreaView: {
      flex: 1,
      backgroundColor:"white",
      justifyContent:"center",
    },
    button: {
      backgroundColor: themeColor,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth:2,
      borderRadius:30,
      minWidth:100,
      alignItems:"center",
      alignContent:"center",
    },
    buttonText: {
      color: textColor,
      fontSize: 16,
    },
    textHeader: {
      fontSize: 36,
      marginBottom: 24,
      marginStart: 12,
      marginTop: 0,
      fontWeight: 'bold',
    },
    titleContainer:{
      display:"flex",
      flexDirection:"row",
      width:"90%",
      marginBottom: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    agreementContainer: {
      flexDirection:'column',
      justifyContent:'center',
      width:'90%',
      marginTop:15
    },
    agreementView: {
      flexDirection:'row',
      maxWidth:'90%',
      margin:5,
    },
    buttonStyle:{
      minWidth:150,
      width:"90%",
      backgroundColor: 'black',
      borderWidth:2,
      borderRadius:30,
      margin:10,
      },
  });


  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (values)=>{
    console.log(values);
    handleDismissKeyboard();
    setIsLoading(true);
    navigation.navigate("Home")

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const errorText = ( errorObject, touchedObject ) => (
    Object.keys(errorObject).map((fieldName) => {
      if (touchedObject[fieldName]) {
        return (
          <Text key={fieldName} style={styles.errorText}>
            {errorObject[fieldName]}
          </Text>
        );
      }
      return null;
    })
  );

  const initialValues = {name:"",password:"",}
  initialTouched={ name: false, password: false,}
  const fields = ['name','password'];  


  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeAreaView} >
      <Formik
          validationSchema={SignInValidationSchema}
          initialValues={initialValues}
          initialTouched={initialTouched}
          onSubmit={onSubmit}
          >
           {({handleSubmit, errors, touched,}) => (
            <View style={styles.container}>
            <Text style={styles.titleText}>Kullanıcı Bilgileri</Text>  
                <Field
                component={CustomInput}
                name="name"
                placeholder="Name"
                />
                <Field
                component={PasswordInput}
                name="password"
                placeholder="Password"
                />

              {errorText(errors, touched)}
                
                <View style={styles.navigationTextContainer}>
                  <Text style={styles.signInText.phrase} >Hesabın yoksa  </Text>
                  <Text 
                    style={styles.signInText.link} onPress={() => navigation.navigate("SignUp")}>
                      Kayıt ol
                  </Text>
                </View>

                <SubmitButton 
                onPress={handleSubmit}
                isLoading={isLoading}
                style={styles.buttonStyle}
                >
                  Giriş yap
                </SubmitButton>
            </View>
          )}
          </Formik>
    </SafeAreaView>
    </>
    </TouchableWithoutFeedback>

  );
}
