import { TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { Animated, Easing } from 'react-native'

const SubmitButton =({ onPress, isLoading, children, style }) => {
  const scaleValue = new Animated.Value(1)

  const startScaleAnimation= () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue:1.02,
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

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
        borderWidth: 2,
        borderRadius: 30,
        margin: 10,
        transform:[{scale:scaleValue}],
        ...style,
      }}
      activeOpacity={1}
      onPress={onPress}
      onPressIn={startScaleAnimation}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={{ color: 'white', fontSize: 16 }}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

export default SubmitButton
