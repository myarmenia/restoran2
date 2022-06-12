import React, {memo, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
// import {mainStyles} from '../../globalStyles/mainStyles';
import MainButton from '../UI/buttons/MainButton';

const SendCode = () => {
  const [value, setValue] = useState('');

  return (
    <View>
      <Text>Введите код подтверждения</Text>
      <TextInput
        style={mainStyles.simpleInput}
        value={value}
        textContentType="telephoneNumber"
        dataDetectorTypes="phoneNumber"
        keyboardType="phone-pad"
        autoCompleteType="cc-number"
        placeholder="код из SMS"
        placeholderTextColor={'#5F6368'}
        maxLength={4}
        onChangeText={text => {
          setValue(text);
        }}
      />
      <Text>
        на номер +7 XXX XXXX XXX отправлен код подтверждения
      </Text>
      <MainButton text={'Войти'} horizontal={100} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(SendCode);
