import {
    IconButton,
    Text,
  } from "react-native-paper";
  import AppbarHeader from "../components/AppbarHeader";
  import { StyleSheet, TouchableOpacity, View } from "react-native";
  import usePreferences from "../contexts/usePreferences";
  import AgreementCheckBox from "../components/form/AgreementCheckBox";
  import { useState } from "react";


const NotificateSettingsPage = ({navigation}) => {
    const { theme, isThemeDark, toggleTheme } = usePreferences();
    const [ permissions, setPermissions] = useState({
        'email': true,
        'sms': false,
    });

    const togglePermission=(type)=>{
        setPermissions(prev=>({
            ...prev,
            [type]:!prev[type],
        }))
    }

    const styles = StyleSheet.create({
        settingTitleView:{
          flex:1,
          borderBottomWidth:1,
          borderBottomColor:theme.colors.textColor,
          paddingVertical:15,
          paddingBottom:20,
        },
        settingTitle:{
          fontSize:16,
          letterSpacing:0.6,
          textAlignVertical:'center',
          fontWeight:700,
          color:isThemeDark? 'white' : '#080808'
        },
      })
  
      const SingleOption=({ optionName, isChecked, onPress})=>(
        <TouchableOpacity style={{
          width:'100%',
          flexDirection:'row',
          marginVertical:8,
          paddingLeft:20,
          alignItems:'center'
        }}
        onPress={onPress}
        >
          <View style={styles.settingTitleView}>
            <Text style={styles.settingTitle}>
              {optionName}
            </Text>
          </View>  
          <View style={{
            margin:15
          }}>
            <AgreementCheckBox isChecked={isChecked}onClick={onPress} />
          </View>
        </TouchableOpacity>
      )

  return (
    <>
    <AppbarHeader
        show={true}
        content={
          <>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
              }}
            >
              Uygulama Dili
            </Text>
            <IconButton
              icon="arrow-left"
              style={{ position: "absolute", left: 0, top: 0 }}
              size={30}
              onPress={()=> navigation.navigate("Settings")}
            />
          </>
        }
        headerStyle={{ justifyContent: "flex-start" }}
      />
      <View style={{
        flex:1,
        backgroundColor:theme.colors.backgroundColor,
      }}>
        <SingleOption optionName={'E-posta almak istiyorum'} isChecked={permissions['email']} onPress={()=>togglePermission('email')} />
        <SingleOption optionName={'SMS almak istiyorum'} isChecked={permissions['sms']} onPress={()=>togglePermission('sms')} />
      </View>
    </>
  )
}

export default NotificateSettingsPage
