import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import MainButton from '../../components/UI/buttons/MainButton';
import CustomInput from '../../components/UI/inputs/CustomInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Registration} from '../../store/reducers/auth/action';
import Checkbox from '../../components/UI/checkbox/Checkbox';
import LoadingComponent from '../../components/loadingComponent';
import {clearError} from '../../store/reducers/auth/slice';

const RegisterScreen = ({navigation, route}) => {
  const {emailError} = useSelector(({auth}) => auth);
  const [checked, setChecked] = useState(route?.params?.checked || false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const passRegExpRef = useRef(
    new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'),
  );
  const emailRegExpRef = useRef(
    new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'),
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass1, setPass1] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setChecked(route?.params?.checked);
  }, [route?.params?.checked]);

  useEffect(() => {
    setError('');
  }, []);

  useEffect(() => {
    if (!error && email && pass && pass1 && name) {
      navigation.navigate('login');
    } else if (email && pass && pass1 && name) {
      setError('emailError');
    }
    return () => {
      setEmail('');
      setPass('');
      setPass1('');
      setName('');
      setChecked(false);
    };
  }, [emailError]);

  const goToLoginPage = async () => {
    setError('');
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
      setLoading(true);
      await dispatch(Registration(data));
      await setLoading(false);
      await checkEmail();
    } else {
      if (!emailRegExpRef.current.test(email)) {
        setError('email');
      } else if (pass !== pass1) {
        setError('passEqual');
      } else if (!passRegExpRef.current.test(pass)) {
        setError('pass');
      } else if (!passRegExpRef.current.test(pass1)) {
        setError('pass1');
      }
    }
  };

  const checkEmail = () => {
    if (!emailError) {
      navigation.navigate('login');
    } else {
      setError('emailError');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      <Text style={styles.titleText}>Регистрация</Text>
      <CustomInput placeholder={'Имя'} value={name} onChangeText={setName} />
      <CustomInput
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      {error === 'email' ? (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            fontSize: 12,
            marginHorizontal: 25,
          }}>
          Неверно введена электронная почта
        </Text>
      ) : (
        <></>
      )}
      {error === 'emailError' ? (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            fontSize: 12,
            marginHorizontal: 25,
          }}>
          Данная электронная почта уже существует
        </Text>
      ) : (
        <></>
      )}
      <CustomInput
        placeholder={'Пароль'}
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      {error === 'pass' ? (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            fontSize: 12,
            marginHorizontal: 25,
          }}>
          Пароль должен быть длинной 6 и может состоять из английских букв,
          чисел и знаков.
        </Text>
      ) : (
        <></>
      )}
      <CustomInput
        placeholder={'Подтвердить пароль'}
        value={pass1}
        onChangeText={setPass1}
        secureTextEntry
      />
      {error === 'passEqual' ? (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            fontSize: 12,
            marginHorizontal: 25,
          }}>
          Пароли не совпадают
        </Text>
      ) : (
        <></>
      )}
      {error === 'pass1' ? (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            fontSize: 12,
            marginHorizontal: 25,
          }}>
          Пароль должен быть длинной 6 и может состоять из английских букв,
          чисел и знаков.
        </Text>
      ) : (
        <></>
      )}
      <View style={{marginTop: 10}}>
        <Checkbox
          text={'Политика Конфиденциальности'}
          goTo={() =>
            navigation.navigate('PrivacyPolicyScreen', {
              checked: checked,
            })
          }
          checked={checked}
          setChecked={setChecked}
        />
      </View>
      <View style={{marginTop: 20}}>
        <MainButton
          disable={!(name && pass && pass1 && email && checked)}
          textBtn={'Зарегистрироватся'}
          goTo={goToLoginPage}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={[styles.text, {marginRight: 5}]}>Зарегистрированы?</Text>
        <TouchableOpacity
          onPress={() => {
            setName('');
            setEmail('');
            setPass('');
            setPass1('');
            setError('');
            navigation.navigate('login');
          }}>
          <Text style={[styles.text, {color: '#648E00'}]}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingHorizontal: 40,
  },
  titleText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 90,
    textAlign: 'center',
    marginBottom: 25,
  },
  text: {
    fontSize: 12,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default RegisterScreen;
