import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Button, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput.js";
import { PasswordInput } from "../components/form/PasswordInput.js";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../components/form/SubmitButton.js";
import usePreferences from "../contexts/usePreferences.js";
import { ProfileUpdateSchema } from "../validations/ProfileUpdateValidation.js.js";


export default function ProfileUpdate({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {toggleTheme, isThemeDark, theme} = usePreferences();

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
      justifyContent : "center",
      backgroundColor: theme.colors.backgroundColor,
      alignItems: "center",
    },
    navigationTextContainer:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      marginTop:15
    },
    signInText:{
      link:{
        color:isThemeDark ? "white" : "black",
        fontWeight:"bold"
      },
      phrase:{
        color:isThemeDark ? "gray" : "#383838",
        fontWeight:"bold"
      }
    },
    titleText:{
      fontSize: 30,
      fontWeight:"bold",
      color:theme.colors.textColor,
      bottom:70
    },
    errorText: {
      color: "#e45735",
    },
    safeAreaView: {
      flex: 1,
      backgroundColor:theme.colors.backgroundColor,
      justifyContent:"center",
    },
    button: {
      backgroundColor: isThemeDark? "#212124" : "#1e1e1e",
      borderColor: isThemeDark? "#212124" : "#1e1e1e",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth:2,
      borderRadius:20,
      minWidth:110,
      alignItems:"center",
      alignContent:"center",
    },
    buttonStyle:{
      minWidth:150,
      width:"40%",
      backgroundColor: 'black',
      borderWidth:2,
      borderRadius:30,
      margin:10,
      },
  });

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (values) => {
    console.log(values);
    handleDismissKeyboard();
    setIsLoading(true);
    navigation.navigate("Profile")

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

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

  const initialValues = {phoneNumber:"",email:"",password:"", confirPassword:""}
  initialTouched={ phoneNumber: false, email: false,password: false, confirPassword: false}
  const fields = ['phoneNumber','email', 'password', 'confirPassword'];  


  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard} accessible={false}>
    <>
    <StatusBar style={isThemeDark ? "light" : "dark"} backgroundColor={theme.colors.backgroundColor}/>
    <SafeAreaView style={styles.safeAreaView} >
      <Formik
          validationSchema={ProfileUpdateSchema}
          initialValues={initialValues}
          initialTouched={initialTouched}
          onSubmit={onSubmit}
          >
           {({handleSubmit, errors, touched,}) => (
            <View style={styles.container}>
              <View style={{ }}>
                <Text style={styles.titleText}>Kullanıcı Bilgileri</Text> 
              </View> 
              
                <Field
                component={CustomInput}
                name="phoneNumber"
                placeholder="Telefon Numarası"
                />
                <Field
                component={CustomInput}
                name="email"
                placeholder="Email"
                />
                <Field
                component={PasswordInput}
                name="password"
                placeholder="Şifre"
                />
                <Field
                component={PasswordInput}
                name="confirmPassword"
                placeholder="Doğrulama Şifresi"
                />

              {errorText(errors, touched)}

                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-around'
                }}>
                  <SubmitButton 
                  onPress={handleSubmit}
                  isLoading={isLoading}
                  style={styles.buttonStyle}
                  >
                    Güncelle
                  </SubmitButton>
                  <Button 
                  style={styles.buttonStyle}
                  onPress={()=> navigation.navigate("Profile")}
                  textColor="white"
                  >
                    Geri
                  </Button>
                </View>
            </View>
          )}
          </Formik>
    </SafeAreaView>
    </>
    </TouchableWithoutFeedback>

  );
}
