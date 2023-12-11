import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";


const styles = StyleSheet.create({
backButton:{
  margin:0,
  marginEnd:"25%"
},
  });


  export const NavigateHomeButton = ({navigation}) => (
    <IconButton 
    iconColor="black" icon="arrow-left" size={25} style={styles.backButton} 
    onPress={() => navigation.navigate("Home")}
    />
 )