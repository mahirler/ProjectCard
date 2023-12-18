import { View, StyleSheet, Keyboard, TouchableOpacity,TouchableWithoutFeedback, ScrollView } from "react-native";
import { useState } from "react";
import { Checkbox, Modal, Text, useTheme, } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { SignUpValidationSchema } from "../validations/SignUpValidation";
import { SubmitButton, NavigateHomeButton } from "../components/form/Buttons";
import { PasswordInput } from "../components/form/PasswordInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";

export const themeColor = '#1e1e1e';
export const textColor = '#ffffffdd';

export default function SignUp({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
    }, 3000);
  }

  const initialValues = {email: "",name:"",phoneNumber:"",password:"", confirmPassword:"",}
  initialTouched={ name: false, email: false, phoneNumber: false, password: false, confirmPassword: false }
  const firstStepFields = ['name',];
  const secondStepFields = ['email', 'phoneNumber'];
  const lastStepFields = ['password', 'confirmPassword'];

  const styless = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  })

  const unCompletedStep = () => (
    <ProgressStep  
                {...progressStep}
                errors={true} >
                  <View style={styless.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styless.centeredView}>
                      <View style={styless.modalView}>
                        <Text style={styless.modalText}>Hello World!</Text>
                        <Pressable
                          style={[styless.button, styless.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styless.textStyle}>Hide Modal</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                  <Pressable
                    style={[styless.button, styless.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styless.textStyle}>Show Modal</Text>
                  </Pressable>
                </View>
              </ProgressStep>
  )

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
           {({handleSubmit, errors, touched, setTouched}) => (
            <ProgressSteps {...progressSteps} >

              

              <ProgressStep {...firstProgressStep} 
                errors={firstStepFields.some(field => errors[field])}
                onNext={() => {
                  setTouched({"name" : true})
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
                  
                  {Object.keys(errors).map((fieldName) => {
                          if (touched[fieldName]) {
                            return (
                              <Text key={fieldName} style={styles.errorText}>
                                {errors[fieldName]}
                              </Text>
                            );
                          }
                          return null; // Return null if there are no errors or after finding the first error
                        })}
                    
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
                  setTouched({"email" : true})
                  setTouched({"phoneNumber" : true})
                }}
              >
               <View style={styles.container}>
                      
                  {console.log(touched["email"])}
                <Text style={styles.titleText}>İletişim Bilgileri</Text>  
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
                      {Object.keys(errors).map((fieldName) => {
                          if (touched[fieldName]) {
                            return (
                              <Text key={fieldName} style={styles.errorText}>
                                {errors[fieldName]}
                              </Text>
                            );
                          }
                          return null;
                        })}

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
                            return null;
                          })()
                        }
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
