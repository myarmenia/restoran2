import React from 'react';
import {Platform, StyleSheet, View, TextInput} from 'react-native';

const TextArea = ({placeholder, horizontal, onChangeText, text}) => {
  return (
    <View style={styles.MainContainer}>
      <TextInput
        multiline
        style={styles.TextInputStyleClass}
        value={text}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        placeholder={placeholder ? placeholder : 'Email'}
        placeholderTextColor="#5F6368"
        keyboardType={'default'}
        // numberOfLines={10}
        marginHorizontal={horizontal ? horizontal : 20}
        textAlignVertical={'top'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    margin: 20,
    height: 300,
  },

  TextInputStyleClass: {
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: '#202124',
    fontSize: 18,
    paddingHorizontal: 30,
    color: '#fff',
    height: '100%',
  },
});

export default TextArea;
