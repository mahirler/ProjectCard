import { StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";


const styles = StyleSheet.create({
buttonStyle:{
  style:{
    minWidth:150,
    width:"90%",
    backgroundColor: 'black',
    borderWidth:2,
    borderRadius:30,
    margin:10,
    },
  textColor:"white",
},
backButton:{
  margin:0,
  marginEnd:"25%"
},
  });

  export const SubmitButton = ({handleSubmit, children, loading}) => (
    <Button
     mode="contained" {...styles.buttonStyle}
     onPress={handleSubmit} type="Submit"
     loading={loading}
     >
      {children}
    </Button>
  )

  export const NavigateHomeButton = ({navigation}) => (
    <IconButton 
    iconColor="black" icon="arrow-left" size={25} style={styles.backButton} 
    onPress={() => navigation.navigate("Home")}
    />
 )