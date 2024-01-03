import React, { useEffect, useState } from 'react'
import AppbarHeader from '../components/AppbarHeader'
import { StatusBar } from 'expo-status-bar'
import usePreferences from '../contexts/usePreferences'
import { Appbar, Text, TextInput } from 'react-native-paper'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import usePastActions from '../usePastActions'

const AccountHistory = ({navigation}) => {
    const{toggleTheme, isThemeDark, theme} = usePreferences();
    const {search, setSearch, filteredDataSource} = usePastActions();

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const PastActivity = ({label, type, amount, hour, color}) => (
        <View style={[styles.pastActivityView, {backgroundColor:theme.colors.backgroundColor}]}>
            
            <View style={{...styles.pastActivityColorView, backgroundColor:color}}/>
            <View>
                <Text style={[styles.pastActivityText, {fontSize:20}]}
                >{label}
                </Text>
                <Text style={{...styles.pastActivityText, color:'gray', fontSize:12}}>
                {type}
                </Text>
            </View>
            <View style={{
                marginStart:'auto'
            }}>
                <Text style={{...styles.pastActivityText,fontSize:25, color: amount>0 ? 'green' : 'red'}}>
                    {amount}TL
                </Text>
                <Text style={{...styles.pastActivityText, marginStart:'auto', color:'gray'}}>
                    {hour}
                </Text>
            </View>
        </View>
    )

  return (
    <>
    <StatusBar style={isThemeDark ? 'light' : 'black'} backgroundColor={theme.colors.backgroundColor}/>
    
    <AppbarHeader
    headerStyle={{ backgroundColor:theme.colors.backgroundColor}}
    show={true}
    content={
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.AppbarViewStyle}>
        <Text onPress={()=> navigation.navigate("Home")} style={{...styles.headerText, color:theme.colors.textColor}} >
            Geri
        </Text>
        <Appbar.Action
            icon="download"
            color={theme.colors.textColor}
            size={30}
        />
        </View>
        </TouchableWithoutFeedback>
    }
    />
    
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <View style={{...styles.container, backgroundColor:theme.colors.backgroundColor,}} >
        <Text style={{...styles.title, color:theme.colors.textColor,}}
        >
            Hesap Hareketleri
        </Text>

        <TextInput style={{
            width:'85%',
            height:50,
            marginBottom:20,
        }}
        mode='outlined'
        outlineStyle={{borderRadius:25}}
        placeholder='Arama Yap'
        value={search}
        onChangeText={(text) => setSearch(text)}
        />

        {Object.entries(filteredDataSource).map(([date, options, index]) => {
            // Splitting the date string into day, month, and year parts
            const [month, day, year] = date.split('/');

            // Creating a new Date object with the correct format
            const temp = new Date(year,month,day);
            
            // Checking if the date is valid before formatting
            const formattedDate = temp instanceof Date && !isNaN(temp)
                ? temp.toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })
                : 'Erişilemeyen Tarih';

            return (
                <View style={{
                    flexDirection:'column',
                    key:index
                }}>
                    <Text style={{...styles.pastActivityText,
                        marginTop:20
                    }} >
                        {formattedDate}
                    </Text>
                    {options.map(el =>(
                        <PastActivity
                        key={el.id}
                        label={el.title}
                        type={el.type}
                        amount={el.amount}
                        hour={el.hour}
                        color={el.color}
                    />
                    ))}
                    
                </View>
            )
        })}

    </View>
    </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
    headerText:{
        color:'white',
        fontSize:18,
        margin:10,
        fontWeight:"800",
    },
    AppbarViewStyle:{
        flexDirection:'row',
        width:'100%',
        justifyContent:"space-between",
        marginTop:10,
    },
    container:{
        flex:1,
        alignItems:'center'
    },
    title:{
        fontSize:30,
        fontWeight:'900',
        letterSpacing:0.6,
        marginBottom:20,
    },
    pastActivityText:{
        fontSize:16,
        fontWeight:900
    },
    pastActivityView:{
        flexDirection:'row',
        alignItems:'center',
        width:'85%',
        borderBottomColor:'gray',
        borderBottomWidth:1,
        marginVertical:5
    },
    pastActivityColorView:{
        borderRadius:100,
        width:40,
        height:40,
        marginRight:10,
    }

})
export default AccountHistory
