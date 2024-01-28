import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";


export default function ConfirmPayment({ navigation }) {
  const {toggleTheme, isThemeDark, theme} = usePreferences();
  const [decp, setDecp] = useState();

  const placeHolderImg = require('../../assets/images/cat_img.jpg')


  const styles = StyleSheet.create({
    container: {
      flex:1,
      width:'100%',
      flexDirection:'column',
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
      marginBottom:30
    },
    safeAreaView: {
      flex: 1,
      backgroundColor:theme.colors.backgroundColor,
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

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard} accessible={false}>

    <SafeAreaView style={styles.safeAreaView} >
    <StatusBar style={isThemeDark ? "light" : "dark"} backgroundColor={theme.colors.backgroundColor}/>
      <View style={styles.container}>
        <TouchableOpacity style={{
            marginRight:'auto',
            margin:25,
        }}  >
            <Text style={{
                fontSize:20,
                letterSpacing:1,
                fontWeight:700
            }}
            onPress={()=> navigation.navigate("SendMoneyPage")}
            >
                Geri
            </Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>İşlemi Onayla</Text>

        <View style={{
            borderRadius:100,
            width:100,
            height:100,
            overflow:'hidden',
            marginBottom:40

        }}> 
            <Image source={placeHolderImg} style={{
                width:100,
                height:100
            }}/>
        </View>

        <View style={{
            width:'100%',
            flexDirection:'row',
            justifyContent:'center'
        }}>
            <Text style={{
                height: 50,
                marginBottom: 8,
                fontSize:30,
                color:theme.colors.textColor,
                borderBottomColor:theme.colors.textColor,
                borderBottomWidth:1
            }}>
                Tutar:  47,56TL
            </Text>
        </View>

        <TouchableOpacity
        style={{
            backgroundColor:'black',
            width:'80%',
            height:40,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20,
            marginTop:80
        }}
        onPress={()=> navigation.navigate("Home")}
        >
            <Text style={{color:'white'}}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
    </TouchableWithoutFeedback>

  );
}
