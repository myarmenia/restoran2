import React, {useState} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import CustomInput from '../../components/UI/inputs/CustomInput';
import TextArea from '../../components/UI/textArea/TextArea';
import MainButton from '../../components/UI/buttons/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {Feedback} from '../../store/reducers/support/action';

const FeedBackScreen = ({navigation}) => {
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');
  const {status} = useSelector(({support}) => support);
  const dispatch = useDispatch();

  const navigateToHome = () => {
    if (+status === 200) {
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <SimpleHeader title={'История заказов'} />
      <Text style={styles.text}>Свяжитесь с нами, если есть проблема</Text>
      <View style={{marginBottom: -12}}>
        <CustomInput placeholder={'Тема'} onChangeText={setTheme} />
      </View>
      <TextArea placeholder={'Сообщение'} text={message} onChangeText={setMessage} />
      <View style={{marginTop: 30, marginHorizontal: 40}}>
        <MainButton
          textBtn={'Отправить'}
          goTo={async () => {
            await dispatch(
              Feedback({
                theme,
                message,
              }),
            );
            await navigateToHome();
          }}
        />
      </View>
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
});

export default FeedBackScreen;
