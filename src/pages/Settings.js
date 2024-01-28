import {
  Icon,
  IconButton,
  Text,
} from "react-native-paper";
import AppbarHeader from "../components/AppbarHeader";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import usePreferences from "../contexts/usePreferences";

export default function Settings({ navigation }) {
  const { theme, isThemeDark, toggleTheme } = usePreferences();
    {/* <Icon
      source={"theme-light-dark"}
      size={45}
      color={isThemeDark ? "white" : "black"}
    /> */}
    
    const styles = StyleSheet.create({
      settingsTitle:{
        color:'gray',
        fontSize:16,
        margin:10,
        marginLeft:20
      },
      settingTitleView:{
        flex:1,
        marginLeft:10,
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
      settingView:
      {
        margin:10,
        marginLeft:20,
      }
    })

    const SingleSetting=({iconName, settingName, onPress})=>(
      <TouchableOpacity style={{
        width:'90%',
        flexDirection:'row',
        marginVertical:8,
      }}
      onPress={onPress}
      >
        <View style={styles.settingView}>
          <Icon 
          source={iconName} 
          size={25} 
          color={theme.colors.textColor} 
          />
        </View>
        <View style={styles.settingTitleView}>
          <Text style={styles.settingTitle}>
            {settingName}
          </Text>
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
              Ayarlar
            </Text>
            <IconButton
              icon="arrow-left"
              style={{ position: "absolute", left: 0, top: 0 }}
              size={30}
              onPress={() => navigation.navigate("Home")}
            />
          </>
        }
        headerStyle={{ justifyContent: "flex-start" }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor,
          flexDirection:'column',
        }}
      >
        <View style={{
          width:'100%',
          flexDirection:'column',
        }}>
          <Text style={styles.settingsTitle}>
            Hesap Ayarları
          </Text>
          <SingleSetting iconName={'cellphone'} settingName={'Aktif Cihazlar'} onPress={()=>navigation.navigate('ActiveDevicesPage')}/>
          <SingleSetting iconName={'cellphone'} settingName={'Bildirim Ayarları'} onPress={()=> navigation.navigate('NotificateSettingsPage')}/>
          <SingleSetting iconName={'cellphone'} settingName={'Çıkış Yap'}/>

          <Text style={styles.settingsTitle}>
            Uygulama Ayarları
          </Text>
          <SingleSetting iconName={'cellphone'} settingName={'Tema'}/>
          <SingleSetting iconName={'cellphone'} settingName={'Uygulama Dili'} onPress={() => navigation.navigate("AppLangPage")}/>
          <SingleSetting iconName={'cellphone'} settingName={'Hesabı Kapat'}/>

        </View>
      </View>
    </>
  );
}
