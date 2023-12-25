import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { Text, useTheme,} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { PasswordInput } from "../components/form/PasswordInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModalView from "../components/form/CustomModalView";
import CheckBox from "react-native-check-box";


export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

export default function SignUp({ navigation }) {
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
  });

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
  const firstProgressStep = {
    ...progressStep,
    onPrevious: () => navigation.navigate("Home"),
    previousBtnText: 'Vazgeç',
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (values)=>{
    console.log(values);
    handleDismissKeyboard();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

  const initialValues = {email: "",name:"",phoneNumber:"",password:"", confirmPassword:"",userAgreement:false}
  initialTouched={ name: false, email: false, phoneNumber: false, password: false, confirmPassword: false, userAgreement:false }
  const firstStepFields = ['name','email'];  
  const secondStepFields = ['phoneNumber', 'password'];
  const lastStepFields = ['confirmPassword', 'userAgreement'];

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeAreaView} >
      <Formik
          validationSchema={SignUpValidationSchema}
          initialValues={initialValues}
          initialTouched={initialTouched}
          onSubmit={onSubmit}
          validateOnMount
          >
           {({handleSubmit, errors, touched, setTouched, handleChange, values, setFieldValue}) => (
            <ProgressSteps {...progressSteps} >

            <ProgressStep {...firstProgressStep} 
              errors={firstStepFields.some(field => errors[field])}
              onNext={() => {
                setTouched({"name" : true})
                setTouched({"email" : true})
              }}
            >
              <View style={styles.container}>
              <Text style={styles.titleText}>Kimlik Bilgileri</Text>  
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

                {errorText(errors, touched)}
                  
                  <View style={styles.navigationTextContainer}>
                    <Text style={styles.signInText.phrase} >Bir hesaba sahipsen  </Text>
                    <Text 
                      style={styles.signInText.link} onPress={() => navigation.navigate("SignIn")}>
                        Giriş Yap
                    </Text>
                  </View>
                </>
              </View>
            </ProgressStep>

            <ProgressStep {...progressStep} 
              errors={secondStepFields.some(field => errors[field])}
              onNext={() => {
                setTouched({"phoneNumber" : true})
                setTouched({"password": true})
              }}
            >
              <View style={styles.container}>
              <Text style={styles.titleText}>İletişim Bilgileri</Text>  
              <>
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
                  {errorText(errors, touched)}
                  <View style={styles.navigationTextContainer}>
                    <Text style={styles.signInText.phrase} >Bir hesaba sahipsen  </Text>
                    <Text 
                      style={styles.signInText.link} onPress={() => navigation.navigate("SignIn")}>
                        Giriş Yap
                    </Text>
                  </View>
                </>
              </View>
            </ProgressStep>            

            <ProgressStep nextBtnLoading={isLoading} onSubmit={handleSubmit} nextBtnDisabled={isLoading} 
              {...progressStep}
              errors={lastStepFields.some(field => errors[field])}
              onNext={handleSubmit}
            >
              <View style={styles.container}>
                <Text style={styles.titleText}>Şifre Belirleme</Text>  
                <>
                  <Field
                  component={PasswordInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  />

              <View style={{
                width:'80%',
                flexDirection:'row',
                alignItems:'center',
              }}
               >
                <CheckBox
                isChecked={values.userAgreement}
                onClick={()=> {
                  setFieldValue('userAgreement', !values.userAgreement)
                }}
                style={{marginEnd:'auto'}}
                />
                <CustomModalView/>
              </View>

                    {errorText(errors, touched)}

                    <View style={styles.navigationTextContainer}>
                      <Text style={styles.signInText.phrase} >Bir hesaba sahipsen  </Text>
                      <Text 
                        style={styles.signInText.link} onPress={() => navigation.navigate("SignIn")}>
                          Giriş Yap
                      </Text>
                    </View>
                  </>
              </View>
            </ProgressStep>
            
          </ProgressSteps>
          )}
          </Formik>
    </SafeAreaView>
    </>
    </TouchableWithoutFeedback>

  );
}
