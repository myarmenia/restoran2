import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, ScrollView} from 'react-native';
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
  const [viewHeight, setViewHeight] = useState(1);
  const {status} = useSelector(({support}) => support);
  const dispatch = useDispatch();

  useEffect(() => {
    if (+status === 200) {
      navigation.navigate('Home');
    }
  }, [status]);

  const componentData = () => {
    return (
      <>
        <SimpleHeader title={'Обратная связь'} />
        <View
          style={styles.container}
          onLayout={event => {
            const {x, y, width, height} = event.nativeEvent.layout;
            setViewHeight(height);
          }}>
          {loading ? <LoadingComponent /> : <></>}
          <DismissKeyboard>
            <Text style={styles.text}>
              Свяжитесь с нами, если есть проблема
            </Text>
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
            <View style={{marginTop: 30}}>
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
      </>
    );
  };
  return viewHeight < Dimensions.get('screen').height ? (
    <View
      style={{
        minHeight: 0.8 * Dimensions.get('screen').height - 100,
        backgroundColor: '#000000',
        height: '100%',
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
      }}>
      {componentData()}
    </View>
  ) : (
    <ScrollView
      style={{
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
      }}>
      {componentData()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  text: {
    marginTop: 30,
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 35,
  },
  error: {
    fontSize: 14,
    color: '#930000',
    textAlign: 'center',
  },
});

export default FeedBackScreen;
