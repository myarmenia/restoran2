import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EyeOffSvg from "../../../assets/svg/EyeOffSvg";
import EyeOnSvg from "../../../assets/svg/EyeOnSvg";

const UselessTextInput = ({
  horizontal,
  placeholder,
  value,
  onChangeText,
  textType = "default",
  secureTextEntry = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <SafeAreaView style={{ position: "relative" }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        keyboardType={textType}
        marginHorizontal={horizontal ? horizontal : 40}
        placeholder={placeholder ? placeholder : "Email"}
        placeholderTextColor="#5F6368"
        secureTextEntry={secureTextEntry ? passwordVisible : false}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setPasswordVisible((prev) => !prev)}
        >
          {passwordVisible ? <EyeOnSvg /> : <EyeOffSvg />}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 57,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    fontSize: 18,
    paddingLeft: 30,
    backgroundColor: "#202124",
    color: "white",
  },
  eye: {
    position: "absolute",
    right: 52,
    top: 30,
  },
});

export default UselessTextInput;
