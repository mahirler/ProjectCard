import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { PasswordInput } from "../components/form/PasswordInput";
import { SubmitButton, NavigateHomeButton } from "../components/form/Buttons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SignUpFirstPart from "./SignUpFirstPart";

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

export default function SignIn({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:"white",
    },
    button: {
      backgroundColor: themeColor,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    buttonText: {
      color: textColor,
      fontSize: 16,
    },textHeader: {
      fontSize: 36,
      marginBottom: 24,
      marginStart: 12,
      marginTop: 0,
      fontWeight: 'bold',
    },
    container: {
      flex : 1,
      justifyContent : "center",
      backgroundColor: theme.colors.background,
      alignItems: "center",
    },
    titleContainer:{
      display:"flex",
      flexDirection:"row",
      width:"90%",
      marginBottom: 20
    },
    navigationTextContainer:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      marginTop:15,
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
    titleText:{
      fontSize: 30,
      fontWeight:"bold"
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

  const progressSteps = {
    borderWidth: 3,
    activeStepIconBorderColor: themeColor,
    completedProgressBarColor: themeColor,
    activeStepIconColor: themeColor,
    activeLabelColor: themeColor,
    completedStepNumColor: themeColor,
    completedStepIconColor: themeColor,
    activeStepNumColor: textColor,
  };
  const progressStep = {
    nextBtnText: 'Sonraki  >',
    previousBtnText: '<  Önceki',
    finishBtnText: 'Gönder',
    nextBtnStyle: styles.button,
    previousBtnStyle: styles.button,
    nextBtnTextStyle: styles.buttonText,
    previousBtnTextStyle: styles.buttonText,
  };
  // İlk sayfada Önceki butonunun boş olarak görüntülenmemesi için gizliyoruz
  const firstProgressStep = {
    ...progressStep,
    onPrevious: () => navigation.navigate("Home"),
    previousBtnText: 'Geri',
    renderPreviousButton: (state) => (
      <TouchableOpacity
        onPress={state.onPrevious}
        disabled={state.disabled}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{state.previousBtnText}</Text>
      </TouchableOpacity>
    ),
  };
  

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeAreaView}>
        <ProgressSteps {...progressSteps} >
          <ProgressStep label="Sepetim" {...firstProgressStep}>
            <SignUpFirstPart/>
          </ProgressStep>
          <ProgressStep label="Adres" {...progressStep}>
            <Text style={styles.textHeader}>Adres bilgileri</Text>
          </ProgressStep>
          <ProgressStep label="Ödeme" {...progressStep}>
            <Text style={styles.textHeader}>Ödeme bilgileri</Text>
          </ProgressStep>
        </ProgressSteps>
      </SafeAreaView>
    </>
  );
}
