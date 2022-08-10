import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import CustomInput from '../../components/UI/inputs/CustomInput';
import TextArea from '../../components/UI/textArea/TextArea';
import MainButton from '../../components/UI/buttons/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {Feedback} from '../../store/reducers/support/action';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';
import LoadingComponent from '../../components/loadingComponent';

const FeedBackScreen = ({navigation}) => {
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const {status} = useSelector(({support}) => support);
  const dispatch = useDispatch();

  useEffect(() => {
    if (+status === 200) {
      navigation.navigate('Home');
    }
  }, [status]);

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      <DismissKeyboard>
        <SimpleHeader title={'Обратная связь'} />
        <Text style={styles.text}>Свяжитесь с нами, если есть проблема</Text>
        <View style={{marginBottom: -12}}>
          <CustomInput placeholder={'Тема'} onChangeText={setTheme} />
          {error?.theme ? (
            <Text style={styles.error}>{error.theme}</Text>
          ) : (
            <></>
          )}
        </View>
        <TextArea
          placeholder={'Сообщение'}
          text={message}
          onChangeText={setMessage}
        />
        {error?.message ? (
          <Text style={styles.error}>{error.message}</Text>
        ) : (
          <></>
        )}
        <View style={{marginTop: 30, marginHorizontal: 40}}>
          <MainButton
            textBtn={'Отправить'}
            goTo={async () => {
              setError({});
              setLoading(true);
              await dispatch(
                Feedback({
                  theme,
                  message,
                }),
              ).then(res => {
                setError(res.payload);
              });
              await setLoading(false);
            }}
          />
        </View>
      </DismissKeyboard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height,
    height: '100%',
  },
  text: {
    marginTop: 30,
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 35,
    marginLeft: 40,
  },
  error: {
    fontSize: 14,
    color: '#930000',
    textAlign: 'center',
  },
});

export default FeedBackScreen;
