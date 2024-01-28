import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image, Dimensions } from "react-native";
import { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";


export default function SendMoneyPage({ navigation }) {
  const {toggleTheme, isThemeDark, theme} = usePreferences();
  const [payment, setpayment] = useState();
  
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
            marginBottom:0
        }}  >
            <Text style={{
                fontSize:20,
                letterSpacing:1,
                fontWeight:700,
            }}
            onPress={()=> navigation.navigate("TransDecpPage")}
            >
                Geri
            </Text>
        </TouchableOpacity>

        <View style={{
            width:'100%',
            flexDirection:'row',
            justifyContent:'center',
            marginTop:30
        }}>
            <Text style={{
            fontSize: 30,
            fontWeight:"bold",
            color:theme.colors.textColor,
            }}>
                Para Gönder
            </Text>
        </View>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            marginVertical:30
        }} >
            <View style={{
                borderRadius:100,
                width:100,
                height:100,
                overflow:'hidden',
                marginRight:20
            }}> 
                <Image source={placeHolderImg} style={{
                    width:100,
                    height:100
                }}/>
            </View>

            <Text style={{
                fontSize:20,
                fontWeight:700,
                letterSpacing:1,
            }}>
                Kullanıcı İsmi
            </Text>
        </View>

        <TextInput
        style={{
            height: 50,
            marginBottom: 8,
            backgroundColor:theme.colors.backgroundColor,
            width:200,
            fontSize:30,
        }}
        keyboardType="numeric"
        activeOutlineColor='black'
        value={payment}
        onChangeText={(text) => setpayment(text)}
        textColor={theme.colors.textColor}
        />
        <Text>
            Kalan Bakiyeniz 453,11
        </Text>

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
        onPress={()=> navigation.navigate("ConfirmPayment")}
        >
            <Text style={{color:'white'}} onPress={()=> navigation.navigate("ConfirmPayment")} >Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
    </TouchableWithoutFeedback>

  );
}
