import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MainButton from "../../components/UI/buttons/MainButton";
import CustomInput from "../../components/UI/inputs/CustomInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../store/reducers/restaurant/action";
import { Login } from "../../store/reducers/auth/action";
import { axiosInstance } from "../../request";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const { user, token, auth } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const goTo = useCallback(async () => {
    setShowError(false);
    await dispatch(Login({ email, password }));
    await goToHomePage();
  }, [email, password, dispatch]);

  const goToHomePage = () => {
      console.log(auth, user?.phone_number)
      if(email && password) {
          if(!auth && !user?.phone_number) {
              navigation.navigate("sendNumber");
          } else {
              setShowError(true);
          }
      } else {
          setShowError(true);
      }
  }

  const goToRegistrationScreen = () => {
    navigation.replace("register");
  };

  return (
    <View style={styles.container}>
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
        <MainButton textBtn={"Войти"} goTo={goTo} />
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
    container: {
        backgroundColor: "#000000",
        minHeight: Dimensions.get('window').height,
//        paddingHorizontal: 46
    },
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

