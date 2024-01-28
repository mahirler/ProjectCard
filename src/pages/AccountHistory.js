import React, { useState } from 'react'
import AppbarHeader from '../components/AppbarHeader'
import { StatusBar } from 'expo-status-bar'
import usePreferences from '../contexts/usePreferences'
import { Appbar, Portal, Text, TextInput } from 'react-native-paper'
import { Keyboard,  StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import usePastActions from '../usePastActions'
import ActionModal from '../components/AccountHistory/ActionModal'
import ActionList from '../components/AccountHistory/ActionList'

const AccountHistory = ({navigation}) => {
    const{toggleTheme, isThemeDark, theme} = usePreferences();
    const {search, setSearch, filteredDataSource} = usePastActions();
    const [isActionModalVisible, setIsActionModalVisible] = useState(false);
    const [currentActionInfo, setCurrentActionInfo] = useState();

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const PastAction = ({label, type, amount, hour, color, onClick}) => (
        <TouchableOpacity 
        style={[styles.PastActionView, {backgroundColor:theme.colors.backgroundColor}]}
        onPress={onClick}  
        >
            
            <View style={{...styles.PastActionColorView, backgroundColor:color}}/>
            <View>
                <Text style={[styles.PastActionText, {fontSize:20}]}
                >{label}
                </Text>
                <Text style={{...styles.PastActionText, color:'gray', fontSize:12}}>
                {type}
                </Text>
            </View>
            <View style={{
                marginStart:'auto'
            }}>
                <Text style={{...styles.PastActionText,fontSize:25, color: amount>0 ? 'green' : 'red'}}>
                    {amount}TL
                </Text>
                <Text style={{...styles.PastActionText, marginStart:'auto', color:'gray'}}>
                    {hour}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const openActionModal = (clickedAction) => {
        setCurrentActionInfo(clickedAction);
        setIsActionModalVisible(true);
    }

    const closeModal = () => {
        setIsActionModalVisible(false);
    }

  return (
    <>
    <StatusBar style={isThemeDark ? 'light' : 'black'} />
    
    <AppbarHeader
    headerStyle={{ backgroundColor:theme.colors.backgroundColor}}
    show={true}
    content={
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.AppbarViewStyle}>
        <Text onPress={()=> navigation.navigate("Home")} style={{
            margin:10,
            fontSize:23,
            letterSpacing:0.3,
            fontWeight:700,
            color:theme.colors.textColor}} >
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

        <ActionList filteredDataSource={filteredDataSource} openActionModal={openActionModal} />

    </View>
    </TouchableWithoutFeedback>
    <Portal>
        <ActionModal 
        isVisible={isActionModalVisible} 
        closeModal={closeModal} 
        transactionData={currentActionInfo}
        />
    </Portal>
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
    PastActionText:{
        fontSize:16,
        fontWeight:900
    },
    PastActionView:{
        flexDirection:'row',
        alignItems:'center',
        width:'85%',
        borderBottomColor:'gray',
        borderBottomWidth:1,
        marginVertical:5
    },
    PastActionColorView:{
        borderRadius:100,
        width:40,
        height:40,
        marginRight:10,
    }

})
export default AccountHistory
