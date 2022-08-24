import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const TextArea = ({placeholder, horizontal, onChangeText, text}) => {
  return (
    <View style={styles.MainContainer}>
      <TextInput
        multiline
        style={styles.TextInputStyleClass}
        value={text}
        blurOnSubmit={true}
        returnKeyType="done"
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        placeholder={placeholder ? placeholder : 'Email'}
        placeholderTextColor="#5F6368"
        keyboardType={'default'}
        marginHorizontal={horizontal ? horizontal : 0}
        textAlignVertical={'top'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    height: 300,
    marginVertical: 20,
  },

  TextInputStyleClass: {
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: '#202124',
    fontSize: 18,
    paddingHorizontal: 30,
    paddingTop: 30,
    color: '#fff',
    height: '100%',
  },
});

export default TextArea;
