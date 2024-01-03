import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Field, Formik } from "formik";
import { CustomInput } from "../components/form/CustomInput";
import { PasswordInput } from "../components/form/PasswordInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInValidationSchema } from "../validations/SignInValidations";
import SubmitButton from "../components/form/SubmitButton";
import usePreferences from "../contexts/usePreferences";

export default function SignUp({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toggleTheme, isThemeDark, theme } = usePreferences();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: theme.colors.backgroundColor,
      alignItems: "center",
    },
    navigationTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    },
    signInText: {
      link: {
        color: isThemeDark ? "white" : "black",
        fontWeight: "bold",
      },
      phrase: {
        color: isThemeDark ? "gray" : "#383838",
        fontWeight: "bold",
      },
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold",
      color: theme.colors.textColor,
      marginBottom: 30,
    },
    errorText: {
      color: "#e45735",
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      justifyContent: "center",
    },
    button: {
      backgroundColor: isThemeDark ? "#212124" : "#1e1e1e",
      borderColor: isThemeDark ? "#212124" : "#1e1e1e",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderWidth: 2,
      borderRadius: 20,
      minWidth: 110,
      alignItems: "center",
      alignContent: "center",
    },
    buttonStyle: {
      minWidth: 150,
      width: "90%",
      backgroundColor: "black",
      borderWidth: 2,
      borderRadius: 30,
      margin: 10,
    },
  });

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (values) => {
    console.log(values);
    handleDismissKeyboard();
    setIsLoading(true);
    navigation.navigate("Home");

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const errorText = (errorObject, touchedObject) =>
    Object.keys(errorObject).map((fieldName) => {
      if (touchedObject[fieldName]) {
        return (
          <Text key={fieldName} style={styles.errorText}>
            {errorObject[fieldName]}
          </Text>
        );
      }
      return null;
    });

  const initialValues = { name: "", password: "" };
  initialTouched = { name: false, password: false };
  const fields = ["name", "password"];

  return (
    <TouchableWithoutFeedback
      onPress={handleDismissKeyboard}
      accessible={false}
    >
      <>
        <StatusBar
          style={isThemeDark ? "light" : "dark"}
          backgroundColor={theme.colors.backgroundColor}
        />
        <SafeAreaView style={styles.safeAreaView}>
          <Formik
            validationSchema={SignInValidationSchema}
            initialValues={initialValues}
            initialTouched={initialTouched}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, errors, touched }) => (
              <View style={styles.container}>
                <Text style={styles.titleText}>Kullanıcı Bilgileri</Text>
                <Field component={CustomInput} name="name" placeholder="Name" />
                <Field
                  component={PasswordInput}
                  name="password"
                  placeholder="Password"
                />

                {errorText(errors, touched)}

                <View style={styles.navigationTextContainer}>
                  <Text style={styles.signInText.phrase}>Hesabın yoksa </Text>
                  <Text
                    style={styles.signInText.link}
                    onPress={() => navigation.navigate("SignUp")}
                  >
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
