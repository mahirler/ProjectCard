import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import usePreferences from "../contexts/usePreferences";


export default function TransDecpPage({ navigation }) {
  const {toggleTheme, isThemeDark, theme} = usePreferences();
  const [decp, setDecp] = useState();

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
            onPress={()=> navigation.navigate("Home")}
            >
                Geri
            </Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>Açıklama</Text>
        <Text style={{
            marginTop:40,
            marginBottom:15
        }}>
            Para gönderim işleminde açıklama ekleyebilirsin
        </Text>

        <TextInput
        mode='outlined'
        style={{
            height: 50,
            marginBottom: 8,
            backgroundColor: isThemeDark ? "#212124" : "#ebebe4",
            minWidth:250,
            width:'80%',
        }}
        outlineStyle={{borderRadius:10}}
        outlineColor={theme.colors.textColor}
        activeOutlineColor={theme.colors.textColor}
        value={decp}
        onChangeText={(text) => setDecp(text)}
        placeholder="Açıklama(tercihe bağlı)"
        />

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
        onPress={()=> navigation.navigate("SendMoneyPage")}
        >
            <Text style={{color:'white'}}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
    </TouchableWithoutFeedback>

  );
}
