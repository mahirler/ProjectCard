import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const UnderlinedText = ({ children, style, textStyle, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <Text onPress={onPress} style={[styles.text, textStyle]}>{children}</Text >
      <View style={[styles.underline, { backgroundColor: style.underlineColor || 'black' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  text: {
    fontSize: 16,
    // Add other text styles as needed
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: 'black', // Default underline color
  },
});

export default UnderlinedText;
