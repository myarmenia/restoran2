import { Platform, StyleSheet, View, TextInput } from "react-native";
import React from 'react';

export default TextArea = ({ placeholder, horizontal, height }) => {
  return (
    <View style={styles.MainContainer}>
      <TextInput
        style={styles.TextInputStyleClass}
        underlineColorAndroid="transparent"
        placeholder={placeholder ? placeholder : "Email"}
        placeholderTextColor="#5F6368"
        numberOfLines={10}
        multiline={false}
        marginHorizontal={horizontal ? horizontal : 10}
        height={height ? height : 130}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    justifyContent: "center",
    margin: 20,   
  },

  TextInputStyleClass: {
    borderColor: "#9E9E9E",
    borderRadius: 10,
    backgroundColor: "#202124",
    fontSize: 18,
  },
});
