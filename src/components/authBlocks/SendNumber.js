import React, {memo, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import MainButton from '../UI/buttons/MainButton';
import {useDispatch} from 'react-redux';
import {SendPhone} from '../../store/reducers/auth/action';

const SendNumber = ({navigation}) => {
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const goToCodeInputPage = async () => {
    await dispatch(
      SendPhone({
        phone_number: number,
      }),
    );
    navigation.navigate('sendCode', {
      phone_number: number,
      navigation: navigation
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш номер телефона</Text>
      <TextInput
        value={number}
        style={styles.input}
        textContentType="telephoneNumber"
        dataDetectorTypes="phoneNumber"
        keyboardType="phone-pad"
        autoCompleteType="cc-number"
        placeholder="+7 XXX XXX XX XXX"
        placeholderTextColor={'#5F6368'}
        onChangeText={text => {
          setNumber(text);
        }}
      />
      <Text style={styles.sendText}>
        Отправим на этот номер код подтверждения
      </Text>
      <MainButton goTo={goToCodeInputPage} textBtn={'Получить SMS с кодом'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingHorizontal: 46,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    fontSize: 18,
    paddingLeft: 30,
    backgroundColor: '#202124',
    color: 'white',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 40,
  },
  sendText: {
    color: '#5F6368',
    fontSize: 12,
    lineHeight: 14,
    paddingBottom: 35,
  },
});

export default memo(SendNumber);
