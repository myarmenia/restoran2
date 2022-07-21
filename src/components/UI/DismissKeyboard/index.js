import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Keyboard} from 'react-native';
import React from 'react';

export const DismissKeyboard = ({children, close}) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
      if (close) {
        close();
      }
    }}>
    {children}
  </TouchableWithoutFeedback>
);
