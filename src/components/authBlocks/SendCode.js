import React, {memo, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MainButton from '../UI/buttons/MainButton';
import {SendCodeNum, SendPhone} from '../../store/reducers/auth/action';
import {useDispatch} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

const SendCode = ({route}) => {
  const [value, setValue] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(301);
  const dispatch = useDispatch();

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft]);

  const clockify = () => {
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayMins,
      displaySecs,
    };
  };

  const goToLoginPage = async () => {
    dispatch(
      SendCodeNum({
        phone_number: route.params.phone_number,
        code: value,
      }),
    );
  };

  const sendCodeAgain = async () => {
    await dispatch(
      SendPhone({
        phone_number: route.params.phone_number,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите код подтверждения</Text>
      <TextInput
        style={styles.input}
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
      <Text style={styles.sendText}>
        на номер +{route.params.phone_number} отправлен код подтверждения
      </Text>

      {secondsLeft ? (
        <Text style={styles.timerText}>
          Осталось {clockify().displayMins}:{clockify().displaySecs}
        </Text>
      ) : (
        <></>
      )}
      <MainButton goTo={goToLoginPage} textBtn={'Войти'} />

      {!secondsLeft ? (
        <TouchableOpacity disabled={!secondsLeft} onPress={sendCodeAgain}>
          <Text
            style={[
              styles.sendText,
              {
                paddingBottom: 35,
                paddingTop: 10,
                textAlign: 'center',
                color: 'green',
              },
            ]}>
            Повторно отправить код
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
  },
  timerText: {
    color: '#5F6368',
    fontSize: 16,
    lineHeight: 14,
    paddingBottom: 35,
    paddingTop: 20,
    textAlign: 'center',
  },
  panel: {
    padding: 20,
    backgroundColor: '#000',
    paddingTop: 20,
    borderRadius: 20,
  },
  panelTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  panelButton: {
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textModal: {
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 80,
    textAlign: 'center',
    marginTop: 33,
    marginBottom: 50,
  },
});

export default memo(SendCode);
