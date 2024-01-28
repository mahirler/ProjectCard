import React, { useState } from 'react'
import AppbarHeader from '../components/AppbarHeader'
import { StatusBar } from 'expo-status-bar'
import usePreferences from '../contexts/usePreferences'
import { Appbar, Button, Portal, Text, TextInput } from 'react-native-paper'
import { Image, TouchableOpacity, View } from 'react-native'
import image from '../../assets/images/cat_img.jpg'

const InvitationPage = ({navigation}) => {
    const{toggleTheme, isThemeDark, theme} = usePreferences();

    const onCancel= () => {
        navigation.navigate("Home");
    }

  return (
    <>
    <AppbarHeader
    headerStyle={{
        justifyContent:"space-between",
        marginTop:10,
        backgroundColor:theme.colors.backgroundColor
    }}
    show={true}
    content={
        <>
        <Text 
          onPress={onCancel}
          style={{
            margin:10,
            fontSize:23,
            letterSpacing:0.3,
            fontWeight:700,
            color:theme.colors.textColor
          }}
         >
            Geri
        </Text>
        
        <Appbar.Action
            icon="information"
            color={theme.colors.iconColor}
            size={30}
        />
        </>
    }
     />
     <View style={{
      flex:1,
      flexDirection:'column',
      backgroundColor:theme.colors.backgroundColor,
      alignItems:'center'
     }}>
      <Text style={{
        fontSize:32,
        fontWeight:400,
        marginTop:20,
        letterSpacing:1,
        fontWeight:700,
        color:theme.colors.textColor
      }}
      >
        Arkadaşını Davet Et
      </Text>

      <View style={{
        width:'100%',
        marginTop:25,
        alignItems:'center'
      }}>
        <TouchableOpacity style={{
          width:'89%',
        }}>
          <Text style={{
            fontSize:18,
            textAlign:'center',
            letterSpacing:0.3,
            fontWeight:600,
            color:theme.colors.textColor
          }}>
            Davet ettiğin bir arkadaşın BenBuy'a kayıt olup harcama yapmaya başlarsa ikiniz de X Tl nakit kazanırsınız. Detaylı bilgi için sağ üstteki ikona tıklayabilirsiniz.
          </Text>
        </TouchableOpacity>
        
        <Image source={image} style={{
          width:250,
          height:200,
          marginTop:50
        }}/>

      </View>


        <Button style={{
          width:'80%',
          backgroundColor:'black',
          marginTop:130,
          height:40,
        }}
        textColor='white'
        >
          Davet Et
        </Button>
     </View>
    </>
  )
}

export default InvitationPage
