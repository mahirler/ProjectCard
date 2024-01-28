import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Text } from "react-native-paper";
import usePreferences from "../contexts/usePreferences";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { PasswordInput } from "../components/form/PasswordInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomModalView from "../components/form/CustomModalView";
import AgreementCheckBox from "../components/form/AgreementCheckBox";


export default function SignUp({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toggleTheme, isThemeDark, theme } = usePreferences();

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
    buttonContainer:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:30,
      width:"90%",
    },
    titleText:{
      color: theme.colors.textColor,
      fontSize: 30,
      fontWeight:"bold",
      marginBottom:30
    },
    errorText: {
      color: "#e45735",
    },
    safeAreaView: {
      flex: 1,
      backgroundColor:'white',
      justifyContent:"center",
    },
    button: {
      backgroundColor: isThemeDark? "#212124" : "black",
      borderColor: isThemeDark? "#212124" : "black",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth:2,
      borderRadius:20,
      minWidth:110,
      alignItems:"center",
      alignContent:"center",
    },
    buttonText: {
      color: "white",
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

  });

  const progressSteps = {
  borderWidth: 3,
  activeStepIconBorderColor: theme.colors.textColor,
  completedProgressBarColor: theme.colors.textColor,
  activeStepIconColor: theme.colors.textColor,
  disabledStepIconColor:isThemeDark ? "#212124" : "#ebebe4",
  completedStepIconColor: theme.colors.textColor,
  progressBarColor: isThemeDark ? "#212124" : "#ebebe4",
  activeLabelColor: theme.colors.textColor,
  activeStepNumColor: theme.colors.backgroundColor,
  completedCheckColor: theme.colors.backgroundColor,
  containerStyles:{
    backgroundColor:theme.colors.backgroundColor,
  }
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

  const initialValues = {email: "",name:"",phoneNumber:"",password:"", confirmPassword:"",userAgreement:false, kvkk:false, dataAgreement:false}
  initialTouched={ name: false, email: false, phoneNumber: false, password: false, confirmPassword: false, userAgreement:false, kvkk:false, dataAgreement:false }
  const firstStepFields = ['name','email', 'password', 'confirmPassword'];  
  const secondStepFields = ['phoneNumber',];
  const lastStepFields = ['userAgreement', 'kvkk', 'dataAgreement'];


  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <>
    <StatusBar style={isThemeDark ? "light" : "dark"} backgroundColor={theme.colors.backgroundColor}/>
    <SafeAreaView style={styles.safeAreaView} >
      <Formik
          validationSchema={SignUpValidationSchema}
          initialValues={initialValues}
          initialTouched={initialTouched}
          onSubmit={onSubmit}
          validateOnMount
          >
           {({handleSubmit, errors, touched, setTouched, values, setFieldValue}) => (
            <ProgressSteps {...progressSteps} >

            <ProgressStep {...firstProgressStep} 
              errors={firstStepFields.some(field => errors[field])}
              onNext={() => {
                setTouched({"name" : true})
                setTouched({"email" : true})
                setTouched({"password" : true})
                setTouched({"confirmPassword" : true})
              }}
            >
              <View style={styles.container}>
              <Text style={styles.titleText}>Kullanıcı Bilgileri</Text>  
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
                  component={PasswordInput}
                  name="password"
                  placeholder="Password"
                  />
                  <Field
                  component={PasswordInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
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
              }}
            >
              <View style={styles.container}>
              <Text style={styles.titleText}>İletişim Bilgileri</Text>  
              <>
                  <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
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

            <ProgressStep nextBtnLoading={isLoading} onSubmit={handleSubmit}
              {...progressStep}
              errors={lastStepFields.some(field => errors[field])}
              nextBtnDisabled={ isLoading}
              onNext={() => {
                setTouched({"userAgreement" : true})
                setTouched({"kvkk": true})
                setTouched({"dataAgreement": true})
              }}
            >
              <View style={{...styles.container, width:'auto'}}>
                <Text style={styles.titleText}>Şifre Belirleme</Text>  

                  <View style={styles.agreementContainer}>
                    <View style={styles.agreementView}>
                      <AgreementCheckBox isChecked={values.userAgreement} onClick={()=> {
                      setFieldValue('userAgreement', !values.userAgreement)
                      }} />
                      
                      <View style={{marginTop:8}}>
                        <Text>
                        <CustomModalView labelText="Kullanıcı Sözleşmesi">Kullanıcı sözleşmesini{' '}</CustomModalView>
                         okudum, kabul ediyorum.
                        </Text>
                      </View>

                    </View>
                    <View style={styles.agreementView}>
                      <AgreementCheckBox isChecked={values.kvkk} onClick={()=> {
                      setFieldValue('kvkk', !values.kvkk)
                      }} />

                      <View style={{marginTop:8}}>
                        <Text>
                        <CustomModalView labelText="KVKK Aydınlatma Metni" >KVKK aydınlatma formunu </CustomModalView>
                        okudum, aydınlatma formunu onaylıyorum.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.agreementView}>
                      <AgreementCheckBox isChecked={values.dataAgreement} onClick={()=> {
                      setFieldValue('dataAgreement', !values.dataAgreement)
                      }} />

                      <View style={{marginTop:8}}>
                        <Text>
                        <CustomModalView labelText="Verilerin İşlenmesi Sözleşmesi" >Verilerimin işlenmesini </CustomModalView>
                        ve bildirim yollanmasını kabul ediyorum
                        </Text>
                      </View>
                    </View>
                  </View>

                  {errorText(errors, touched)}

                  <View style={styles.navigationTextContainer}>
                    <Text style={styles.signInText.phrase} >Bir hesaba sahipsen  </Text>
                    <Text 
                      style={styles.signInText.link} onPress={() => navigation.navigate("SignIn")}>
                        Giriş Yap
                    </Text>
                  </View>
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
