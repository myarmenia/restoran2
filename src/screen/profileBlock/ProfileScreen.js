import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import EditSvg from '../../assets/svg/edit/EditSvg';
import AddImageSvg from '../../assets/svg/AddImageSvg';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileUpdate, SignOut} from '../../store/reducers/auth/action';
import LoadingComponent from '../../components/loadingComponent';
import RNPickerSelect from 'react-native-picker-select';
import MainButton from '../../components/UI/buttons/MainButton';
import * as DocumentPicker from 'react-native-document-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(({auth}) => auth);
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [gender, setGender] = useState(user?.gender);
  const [date, setDate] = useState(user?.dob);
  const [year, setYear] = useState(0);
  const [number, setNumber] = useState(user?.phone_number);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const newDate = new Date();
    const dateArr = date.split('-');
    newDate.setMonth(dateArr[1] - 1);
    newDate.setDate(dateArr[2]);
    console.log(newDate.getFullYear());
    setYear(newDate);
  }, [date]);

  function onDateSelected(value) {
    setOpenModal(false);
    setDate(prev => {
      const next = new Date(prev);
      next.setFullYear(+value.getFullYear());
      next.setMonth(+value.getMonth());
      next.setDate(+value.getDate());
      return next;
    });
  }

  useEffect(() => {
    if (gender.toLowerCase() === 'female') {
      setGender('Женский');
    } else {
      setGender('Мужской');
    }
  }, []);

  const docPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setAvatar(res[0]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setAvatar(user?.avatar);
        setError(
          'Увы, но добавить фото не удалось, попробуйте другую фотографию',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      <DateTimePickerModal
        isVisible={openModal}
        value={
          date && year
            ? new Date(year.setFullYear(date.split('-')[0]))
            : new Date()
        }
        mode={'date'}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        onConfirm={onDateSelected}
        onCancel={() => setOpenModal(false)}
        themeVariant={'dark'}
        textColor={'white'}
        accentColor={'grey'}
        pickerContainerStyleIOS={{backgroundColor: 'black'}}
        negativeButtonLabel={'Отменить'}
        positiveButtonLabel={'Выбрать'}
        cancelTextIOS={'Отменить'}
        confirmTextIOS={'Выбрать'}
        locale="ru-RU"
        maximumDate={new Date()}
        animation={true}
      />
      {error ? (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}>
          <View
            style={{
              zIndex: 200,
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: 0.4 * Dimensions.get('screen').height,
                marginHorizontal: 30,
              }}>
              <View style={styles.panel}>
                <Text style={styles.panelTitle}>{error}</Text>
                <View style={styles.panelButton}>
                  <MainButton
                    goTo={() => setError('')}
                    style={styles.panelButtonTitle}
                    textBtn={'Ладно'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {!changes ? (
        <>
          <View>
            <View style={{flexDirection: 'row', marginHorizontal: 40}}>
              <View style={{flex: 2}}>
                <Image
                  source={
                    avatar?.uri
                      ? {uri: avatar.uri}
                      : require('../../assets/png/profileImg.png')
                  }
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 45,
                  }}
                />
              </View>
              <View style={{flex: 4, marginTop: 8}}>
                <Text style={{fontSize: 18, color: '#FFFFFF', marginBottom: 8}}>
                  {name}
                </Text>
                <Text style={{fontSize: 12, color: '#FFFFFF'}}>
                  {gender === 'male'
                    ? 'Мужской'
                    : gender === 'female'
                    ? 'Женский'
                    : gender}
                  ,{' '}
                  {date
                    ? +new Date(year) > +new Date()
                      ? new Date(year).getFullYear() - date.split('-')[0] - 1
                      : new Date(year).getFullYear() - date.split('-')[0]
                    : 'Не обозначено'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setChanges(prev => !prev)}
                style={{flex: 0.5, marginTop: 8}}>
                <EditSvg />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                marginTop: 25,
                marginLeft: 40,
              }}>
              {number}
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                marginTop: 8,
                marginBottom: 30,
                marginLeft: 40,
              }}>
              {email}
            </Text>
          </View>
          <View
            style={{backgroundColor: '#17181B', height: 1.5, marginTop: 40}}
          />
          <Text
            onPress={() => navigation.navigate('OrderHistory')}
            style={{
              color: '#5F6368',
              fontSize: 18,
              marginTop: 15,
              marginLeft: 40,
            }}>
            История заказов
          </Text>
          <View
            style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}}
          />
          <Text
            onPress={() => navigation.navigate('PreferencesScreen')}
            style={{
              color: '#5F6368',
              fontSize: 18,
              marginTop: 15,
              marginLeft: 40,
            }}>
            Предпочтения
          </Text>
          <View
            style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}}
          />
          <Text
            onPress={() => navigation.navigate('Favorites')}
            style={{
              color: '#5F6368',
              fontSize: 18,
              marginTop: 15,
              marginLeft: 40,
            }}>
            Избранные
          </Text>
          <View
            style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}}
          />
          <Text
            onPress={() => navigation.navigate('FeedBack')}
            style={{
              color: '#5F6368',
              fontSize: 18,
              marginTop: 15,
              marginLeft: 40,
            }}>
            Обратная связь
          </Text>
          <View
            style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}}
          />
          <TouchableOpacity
            onPress={async () => {
              await dispatch(SignOut());
            }}>
            <Text
              style={{
                color: '#5F6368',
                fontSize: 18,
                marginTop: 15,
                marginLeft: 40,
              }}>
              Выход
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <View style={{flexDirection: 'row', marginHorizontal: 40}}>
            <TouchableOpacity onPress={() => docPicker(true)} style={{flex: 2}}>
              <Image
                source={
                  avatar?.mime
                    ? {uri: avatar.uri}
                    : avatar
                    ? avatar
                    : require('../../assets/png/profileImg.png')
                }
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 45,
                  opacity: 0.7,
                  marginTop: 15,
                }}
              />
              <View
                style={{
                  width: 33,
                  height: 33,
                  position: 'absolute',
                  zIndex: 500,
                  right: 10,
                  bottom: 0,
                }}>
                <AddImageSvg />
              </View>
            </TouchableOpacity>
            <View style={{flex: 4, marginTop: 8, marginRight: 30}}>
              <TextInput
                defaultValue={name}
                onChangeText={e => {
                  setName(e);
                }}
                style={{
                  fontSize: 18,
                  color: '#FFFFFF',
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 15,
                  padding: 5,
                  paddingLeft: 20,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <RNPickerSelect
                  placeholder={{}}
                  onValueChange={value => {
                    setGender(value);
                  }}
                  value={gender}
                  fixAndroidTouchableBug={true}
                  useNativeAndroidPickerStyle={false}
                  items={[
                    {label: 'Мужской', value: 'male', key: 0},
                    {label: 'Женский', value: 'female', key: 1},
                  ]}
                  style={pickerSelectStyles}
                />
                <TouchableOpacity
                  onPress={setOpenModal}
                  style={styles.dateContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.text}>
                      {date
                        ? date.split('-')[2] +
                          '.' +
                          `0${date.split('-')[1]}`.slice(-2) +
                          '.' +
                          `0${date.split('-')[0]}`.slice(-2)
                        : `0${new Date().getDate()}`.slice(-2) +
                          '.' +
                          `0${new Date().getMonth() + 1}`.slice(-2) +
                          '.' +
                          new Date().getFullYear()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={async () => {
                setLoading(true);
                setChanges(prev => !prev);
                console.log();
                await dispatch(
                  ProfileUpdate({
                    name: name,
                    dob:
                      date.split('-')[0] +
                      '-' +
                      `0${date.split('-')[1]}`.slice(-2) +
                      '-' +
                      `0${date.split('-')[2]}`.slice(-2),
                    gender: gender === 'Мужской' ? 'male' : 'female',
                    phone_number: number,
                    avatar: avatar || '',
                  }),
                )
                  .then(res => {
                    console.log('profile res', res);
                    if (res?.error) {
                      setError(
                        'Увы, но данные не обновились, попробуйте позже',
                      );
                      setGender(user?.gender);
                      setEmail(user?.email);
                      setName(user?.name);
                      setNumber(user?.phone_number);
                      setAvatar(user?.avatar);
                      setDate(user?.dot);
                    }
                  })
                  .catch(err =>
                    setError('Увы, но данные не обновились, попробуйте позже'),
                  );
                await setLoading(false);
              }}
              style={{flex: 0.5, marginTop: 8}}>
              <EditSvg />
            </TouchableOpacity>
          </View>
          <TextInput
            defaultValue={'' + number}
            keyboardType={'numeric'}
            onChangeText={e => {
              setNumber(e);
            }}
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              marginTop: 25,
              marginLeft: 40,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 15,
              padding: 5,
              paddingLeft: 20,
              marginRight: 30,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
  },
  dateContainer: {
    padding: 10,
    borderRadius: 45,
    borderColor: '#fff',
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
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
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 15,
    color: '#fff',
    borderColor: '#fff',
    marginRight: 5,
    padding: 10,
  },
  inputAndroid: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    borderRadius: 15,
    marginRight: 5,
  },
});

export default ProfileScreen;
