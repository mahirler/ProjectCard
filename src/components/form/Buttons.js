import { StyleSheet } from "react-native";
import { View, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
buttonStyle:{
      minWidth:150,
      backgroundColor: 'white',
      borderWidth:2,
      borderColor: 'black',
      borderRadius:10,
      borderColor: 'gray',
      margin:10,
      justifyContent:"center",
      alignItems:"center",
},
cancelButton:{
  backgroundColor:"red",
},
  });

  export const SubmitButton = ({handleSubmit, children, loading}) => (
    <View style={styles.buttonStyle} >
      {loading 
      ? <ActivityIndicator size="small" color="green" />
      : <Button mode="contained" onPress={handleSubmit} type="Submit" >{children}</Button>
      }
    </View>
  )

  export const NavigateHomeButton = ({navigation}) => (
    <Button 
    style={[styles.buttonStyle, styles.cancelButton]}
    mode="contained" onPress={() => navigation.navigate("Home")}>
      Home
    </Button>
  )