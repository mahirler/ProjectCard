import {
    Icon,
    IconButton,
    Text,
  } from "react-native-paper";
  import AppbarHeader from "../components/AppbarHeader";
  import { StyleSheet, TouchableOpacity, View } from "react-native";
  import usePreferences from "../contexts/usePreferences";


const AppLangPage = ({navigation}) => {
    const { theme, isThemeDark, toggleTheme } = usePreferences();


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
  
      const SingleSetting=({iconName, settingName, onPress})=>(
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
              {settingName}
            </Text>
          </View>  
          <View style={{
            margin:15
          }}>
            <Icon 
            source={iconName} 
            size={35} 
            color={theme.colors.textColor} 
            />
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
        <SingleSetting iconName={'cellphone'} settingName={'Turkish'} />
        <SingleSetting iconName={'cellphone'} settingName={'English'} />
      </View>
    </>
  )
}

export default AppLangPage
