import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import MainButton from '../../components/UI/buttons/MainButton';
import CustomInput from '../../components/UI/inputs/CustomInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Login} from '../../store/reducers/auth/action';

const LoginScreen = ({navigation}) => {
  const {user, auth} = useSelector(({auth}) => auth);
  const passRegExpRef = useRef(
    new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'),
  );
  const emailRegExpRef = useRef(
    new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'),
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const goTo = useCallback(async () => {
    setShowError(false);
    if (
      passRegExpRef.current.test(password) &&
      emailRegExpRef.current.test(email)
    ) {
      await dispatch(Login({email, password}));
    } else {
      setShowError(true);
    }
    await goToHomePage();
  }, [email, password, dispatch]);

  const goToHomePage = () => {
    if (email && password) {
      if (!auth && !user?.phone_number) {
        navigation.navigate('sendNumber');
      } else {
        setShowError(true);
      }
    } else {
      setShowError(true);
    }
  };

  const goToRegistrationScreen = () => {
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Вход</Text>
      <View style={{marginBottom: -5}}>
        <CustomInput value={email} onChangeText={setEmail} />
      </View>
      <CustomInput
        placeholder={'Пароль'}
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
      <View style={{marginTop: 50, paddingHorizontal: 40}}>
        <MainButton textBtn={'Войти'} goTo={goTo} />
      </View>

      <View style={{marginTop: 10}}>
        <Text style={styles.text}>Еще нет аккаунта? Пройдите</Text>
      </View>
      <TouchableOpacity
        style={{marginBottom: 150}}
        onPress={goToRegistrationScreen}>
        <Text style={[styles.text, {color: '#648E00', marginBottom: 180}]}>
          регистрацию
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('screen').height,
    //        paddingHorizontal: 46
  },
  titleText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 150,
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
    color: '#5F6368',
    textAlign: 'center',
  },
  error: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginScreen;
