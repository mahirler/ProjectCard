import {
    Icon,
    IconButton,
    Text,
  } from "react-native-paper";
  import AppbarHeader from "../components/AppbarHeader";
  import { StyleSheet, View } from "react-native";
  import usePreferences from "../contexts/usePreferences";
  
const ActiveDevicesPage = ({navigation}) => {
    const { theme, isThemeDark, toggleTheme } = usePreferences();

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

      const exampleObjects=[{
        'deviceName':'M004J17B',
        'lastLogin': '2030-02-02T13:41'
      },
      {
        'deviceName':'M004J17B',
        'lastLogin': '2030-01-02T13:41'
      }
        ]

      const iconTypes={
        'phone':'cellphone',
        'pc':'laptop'
      }
  
      const inputDate = new Date('2030-02-02T13:41:00'); // Assuming this is in UTC

      function formatCustomDate(dateString) {
        const inputDate = new Date(dateString);
      
        const formattedDate = `${inputDate.toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })} ${inputDate.toLocaleTimeString('tr-TR', {
          hour: 'numeric',
          minute: 'numeric',
        })}`;
      
        return formattedDate;
      }

    const SingleSetting=({deviceType, settingName, dateString})=>(
    <View style={{
        width:'90%',
        flexDirection:'row',
        marginVertical:8,
    }}
    >
        <View style={styles.settingView}>
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Icon 
            source={iconTypes[deviceType]} 
            size={25} 
            color={theme.colors.textColor} 
            />
        </View>
        </View>
        <View style={styles.settingTitleView}>
            <Text style={{
                marginBottom:5,
                fontSize:13
            }}>
                {dateString}
            </Text>
            <Text style={styles.settingTitle}>
                {settingName}
            </Text>
        </View>
    </View>
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
                Aktif Cihazlar
              </Text>
              <IconButton
                icon="arrow-left"
                style={{ position: "absolute", left: 0, top: 0 }}
                size={30}
                onPress={() => navigation.navigate("Settings")}
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
            <SingleSetting deviceType={'phone'} settingName={'M004J17B'} dateString={formatCustomDate(exampleObjects[0].lastLogin)}/>
            <SingleSetting deviceType={'pc'} settingName={'Windows'} dateString={formatCustomDate(exampleObjects[1].lastLogin)}/>
        
          </View>
        </View>
      </>
    );
}

export default ActiveDevicesPage
