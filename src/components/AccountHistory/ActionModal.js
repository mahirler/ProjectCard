import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Modal, Text } from 'react-native-paper'
import usePreferences from '../../contexts/usePreferences'

const ActionModal = ({isVisible, closeModal, transactionData}) => {
  const{toggleTheme, isThemeDark, theme} = usePreferences();


  const styles = StyleSheet.create({
      viewContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      view:{
        backgroundColor:theme.colors.backgroundColor, 
        width:330,
        minHeight:300,
        maxHeight:350,
        alignItems: 'center',
        borderRadius:25,
        flexGrow: 1, // Allow the content to grow
      }


  })

    const InfoLine = ({dataLabel, dataInfo}) => (
      <View style={{flexDirection:'row',  margin:3, width:'auto'}}>
        <Text style={{marginRight:4}} >{dataLabel}:</Text>
        <Text style={{textAlign:'right', flex:1}} >{dataInfo}</Text>
      </View>
  )

  return (
    <Modal visible={isVisible} 
    onDismiss={closeModal}
    dismissableBackButton={true}
    >

    <View style={styles.viewContainer} >
      <View style={styles.view}>
        <Text style={{
          fontSize:20,
          margin:15
        }}>
          İşlem Detayları
        </Text>
        <View style={{width:'90%', marginBottom:20}} >
          <InfoLine dataLabel={"İşlem Tarihi"} dataInfo={"Boş Tarih"} />
          <InfoLine dataLabel={"Tutar"} dataInfo={"Boş Veri"} />
          <InfoLine dataLabel={"Kalan Bakiye"} dataInfo={"Boş Veri"} />
          <InfoLine dataLabel={"Açıklama"} dataInfo={"Boş Veri fsdfsdsdfsdfdfsdfsdf"} />
        </View>

        <Button
          mode='contained' 
          buttonColor='#4c0099' 
          onPress={() => console.log}  
          style={{width:'80%', marginVertical:10}}
          textColor='white'
        >
          Dekont
        </Button>

        <Button 
          mode='contained' 
          buttonColor='#ba0000' 
          onPress={closeModal} 
          style={{width:'80%'}}
          textColor='white'
        >
          Geri
        </Button>
      </View>
    </View>

    </Modal>
  )
}

export default ActionModal
