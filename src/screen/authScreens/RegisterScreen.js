import React, {useState, useRef} from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";
import MainButton from "../../components/UI/buttons/MainButton";
import CustomInput from "../../components/UI/inputs/CustomInput";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useDispatch} from "react-redux";
import {Registration} from "../../store/reducers/auth/action";
import Checkbox from "../../components/UI/checkbox/Checkbox";

const RegisterScreen = ({navigation}) => {
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
    const [error, setError] = useState("");

    const goToLoginPage = () => {
        console.log(pass, passRegExpRef.current.test(pass))
        setError("")
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
            navigation.navigate("login");
        } else {
            if (!emailRegExpRef.current.test(email)) {
                setError("email")
            } else if (pass !== pass1) {
                setError("passEqual")
            } else if (!passRegExpRef.current.test(pass)) {
                setError("pass")
            } else if (!passRegExpRef.current.test(pass1)) {
                setError("pass1")
            }
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Регистрация</Text>
            <CustomInput placeholder={"Имя"} value={name} onChangeText={setName}/>
            <CustomInput
                placeholder={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            {error === "email" ?
                <Text style={{color: 'red', textAlign: 'center', fontSize: 12, marginHorizontal: 25}}>Неверно введена
                    электронная
                    почта</Text> : <></>}
            <CustomInput
                placeholder={"Пароль"}
                value={pass}
                onChangeText={setPass}
                secureTextEntry
            />
            {error === "pass" ?
                <Text style={{color: 'red', textAlign: 'center', fontSize: 12, marginHorizontal: 25}}>Пароль должен быть
                    длинной 6 и может состоять из английских букв, чисел и знаков.</Text> : <></>}
            <CustomInput
                placeholder={"Подтвердить пароль"}
                value={pass1}
                onChangeText={setPass1}
                secureTextEntry
            />
            {error === "passEqual" ?
                <Text style={{color: 'red', textAlign: 'center', fontSize: 12, marginHorizontal: 25}}>Пароли не
                    совпадают</Text> : <></>}
            {error === "pass1" ?
                <Text style={{color: 'red', textAlign: 'center', fontSize: 12, marginHorizontal: 25}}>Пароль должен быть
                    длинной 6 и может состоять из английских букв, чисел и знаков.</Text> : <></>}
            <View style={{marginTop: 30}}>
                <Checkbox text={"Запомнить"}/>
            </View>
            <View style={{marginTop: 50, marginHorizontal: 40}}>
                <MainButton textBtn={"Зарегистрироватся"} goTo={goToLoginPage}/>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                }}
            >
                <Text style={[styles.text, {marginRight: 5}]}>Зарегистрированы?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('login')
                }}>
                    <Text style={[styles.text, {color: "#648E00"}]}>Войти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        minHeight: Dimensions.get('screen').height,
//        paddingHorizontal: 46
    },
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
