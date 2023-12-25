import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const AgreementCheckbox = ({ children, ...props }) => {
  return (
    <View>
      <View>
        <CheckBox
          {...props}
        />
        <Text>{children}</Text>
      </View>
    </View>
  );
};

export default AgreementCheckbox;