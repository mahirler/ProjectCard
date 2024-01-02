import React, { useState } from 'react'
import {  Button, Text } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import Modal from 'react-native-paper/src/components/Modal'
import { Portal } from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import {  Animated, Easing } from 'react-native'
import usePreferences from '../../contexts/usePreferences'

const CustomModalView = ({children, labelText}) => {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const [modalVisible, setModalVisible]= useState(false);
  const scaleValue = new Animated.Value(1)

  const openModal = () => {
    setModalVisible(true);
  }
  const closeModal = () => {
    setModalVisible(false);
  }

  const startScaleAnimation= () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue:1.05,
        duration:170,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleValue, {
        toValue:1,
        duration:100,
        useNativeDriver:true,
        easing: Easing.ease,
      }),
    ]).start()
  }
  
  const styles= StyleSheet.create({
    button: {
      backgroundColor: isThemeDark? "#212124" : "#1e1e1e",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderWidth:2,
      borderRadius:15,
      minWidth:100,  
      width:'85%',
      minHeight:50,
      transform:[{scale:scaleValue}],
    },
    textStyle:{
      color: theme.colors.textColor,
      fontWeight: 'bold',
    },
    modalStyle:{
      backgroundColor: 'rgba(0, 0, 0, 0.85)', 
      flex: 1, 
      justifyContent: 'start', 
      alignItems: 'center' 
    },
    modalContainer:{
      margin: 20,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 20,
      width:'80%',
      height:'80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    ScrollView:{
      padding:15,
      paddingStart:10,
      height:'auto',
      width:'auto'
    },
    ModalTitleView:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:20,
      paddingBottom:13,
      minHeight:30,
      minWidth:'99%',
      borderBlockEndColor:'gray',
      borderBottomWidth:1,
    },
    ModalFooter:{
      flexDirection:'row',
      justifyContent:'center',
      marginBottom:15,
      paddingTop:10,
      minHeight:30,
      minWidth:'99%',
      borderBlockStartColor:'gray',
      borderTopWidth:1,
    },
    ModalTitle:{
      fontWeight:'bold',
      fontSize:20,
    }
  })
  return(
  <>
  <Portal>
    <Modal
      visible={modalVisible}
      style={styles.modalStyle}
      onDismiss={closeModal}
      dismissableBackButton={true}
    >
      <StatusBar backgroundColor={modalVisible ? 'rgba(0, 0, 0, 0.85)' : 'transparent'} translucent />
      <View style={styles.modalContainer}>
        <View style={styles.ModalTitleView}>
          <Text style={styles.ModalTitle}>
            {labelText}
          </Text>
        </View>
        <ScrollView style={styles.ScrollView}>
          <Text>djkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfjdjkafhlkasdhflkajdhklfjashdfkjadshflasdjfhlaskdjflaksjdfhlkajsdfhlkajsdfhlasdfjkahlsdf
            sadflaksjdfhlasjkdfhlajsdfhlakjsdfhlaksjdfhlkasjdfhlkajsdfhlkajsdfhlkajsdfhlasjdfhlaskdjf
            dfhlaksdjhflksjdfhlkajdfhlkajsdfhlkasjdfhlkasdjfhlaksdjfhlakjsdfhlkajsdfhlkajsdfhlf
            asdfhalskjdfhlkasjdfahslkdjfhlsdkjfas
            false
            akjsdfhlkasdfhlkasdfj
          </Text>
        </ScrollView>
        <View style={styles.ModalFooter}>
          <Button rippleColor={isThemeDark? "#212124" : "#1e1e1e"} onPressIn={startScaleAnimation} style={styles.button} textColor={"white"} onPress={closeModal}>Kapat</Button>
        </View>
      </View>
    </Modal>
  </Portal>
    <Text onPress={openModal} style={styles.textStyle}>{children}</Text>
  </>
  )}

export default CustomModalView