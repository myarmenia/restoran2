import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MainButton from "../../components/UI/buttons/MainButton";
import CustomInput from "../../components/UI/inputs/CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Registration } from "../../store/reducers/auth/action";
import Checkbox from "../../components/UI/checkbox/Checkbox";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const passRegExpRef = useRef(
    new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})")
  );
  const emailRegExpRef = useRef(
    new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}")
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");

  const goToLoginPage = () => {
    const data = {
      name,
      email,
      password: pass,
    };
    if (
      passRegExpRef.current.test(pass) &&
      passRegExpRef.current.test(pass1) &&
      emailRegExpRef.current.test(email) &&
      pass === pass1 &&
      name
    ) {
      dispatch(Registration(data));
      navigation.navigate("sendNumber");
    } else {
      console.log("Wrong Data");
    }
  };


  return (
    <View style={{ backgroundColor: "#000000" }}>
      <Text style={styles.titleText}>Регистрация</Text>
      <View style={{ marginBottom: -8 }}>
        <CustomInput placeholder={"Имя"} value={name} onChangeText={setName} />
      </View>
      <View style={{ marginBottom: -8 }}>
        <CustomInput
          placeholder={"Email"}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={{ marginBottom: -8 }}>
        <CustomInput
          placeholder={"Пароль"}
          value={pass}
          onChangeText={setPass}
          secureTextEntry
        />
      </View>
      <CustomInput
        placeholder={"Подтвердить пароль"}
        value={pass1}
        onChangeText={setPass1}
        secureTextEntry
      />
      <View style={{ marginTop: 30 }}>
        <Checkbox text={"Запомнить"} />
      </View>
      <View style={{ marginTop: 50, marginHorizontal: 40 }}>
        <MainButton textBtn={"Зарегистрироватся"} goTo={goToLoginPage} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 150,
        }}
      >
        <Text style={[styles.text, { marginRight: 5 }]}>Зарегистрированы?</Text>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('login')
        }}>
          <Text style={[styles.text, { color: "#648E00" }]}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    color: "#FFFFFF",
    marginTop: 90,
    textAlign: "center",
    marginBottom: 25,
  },
  text: {
    fontSize: 12,
    color: "#5F6368",
    textAlign: "center",
  },
});

export default RegisterScreen;
