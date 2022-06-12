import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MainButton from "../../components/UI/buttons/MainButton";
import CustomInput from "../../components/UI/inputs/CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../store/reducers/restaurant/action";
import { Login } from "../../store/reducers/auth/action";
import { axiosInstance } from "../../request";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationRouteContext } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const goToHomePage = useCallback(async () => {
    setShowError(false);
    await dispatch(Login({ email, password }));
    //dispatch(Menu(45));
    const token = await AsyncStorage.getItem("token");
    console.log("lalala ---> ", token);
    if (token) {
      navigation.replace("Home");
    } else {
      setShowError(true);
    }
  }, [email, password, dispatch]);

  

  const goToRegistrationScreen = () => {
    navigation.replace("register");
  };

  
  return (
    <View style={{ backgroundColor: "#000000" }}>
      <Text style={styles.titleText}>Вход</Text>
      <View style={{ marginBottom: -5 }}>
        <CustomInput value={email} onChangeText={setEmail} />
      </View>
      <CustomInput
        placeholder={"Пароль"}
        value={password}
        onChangeText={setPassword}
        textType="default"
        secureTextEntry
      />
      {showError && (
        <Text style={styles.error}>
          Неправильно введены электронная почта или пароль
        </Text>
      )}
      <View style={{ marginTop: 50, paddingHorizontal: 40 }}>
        <MainButton textBtn={"Войти"} goTo={goToHomePage} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.text}>Еще нет аккаунта? Пройдите</Text>
      </View>
      <TouchableOpacity
        style={{ marginBottom: 150 }}
        onPress={goToRegistrationScreen}
      >
        <Text style={[styles.text, { color: "#648E00", marginBottom: 180 }]}>
          регистрацию
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    color: "#FFFFFF",
    marginTop: 150,
    textAlign: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
    color: "#5F6368",
    textAlign: "center",
  },
  error: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
});

export default LoginScreen;

