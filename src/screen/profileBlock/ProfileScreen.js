import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput, Platform,
} from "react-native";
import EditSvg from '../../assets/svg/edit/EditSvg';
import AddImageSvg from '../../assets/svg/AddImageSvg';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileUpdate, SignOut} from '../../store/reducers/auth/action';
import LoadingComponent from '../../components/loadingComponent';
import RNPickerSelect from 'react-native-picker-select';
import MainButton from '../../components/UI/buttons/MainButton';
import * as DocumentPicker from 'react-native-document-picker';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(({auth}) => auth);
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [number, setNumber] = useState(user?.phone_number);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      console.log(res[0]);
      setAvatar(res[0]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setError(
          'Увы, но добавить фото не удалось, попробуйте другую фотографию',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
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
                , {age}
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
                <TextInput
                  defaultValue={age ? '' + age : ''}
                  onChangeText={e => {
                    setAge(e);
                  }}
                  style={{
                    fontSize: 12,
                    color: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: 'white',
                    flex: 1,
                    borderRadius: 15,
                    padding: 5,
                    paddingLeft: 20,
                  }}
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={async () => {
                setLoading(true);
                setChanges(prev => !prev);
                await dispatch(
                  ProfileUpdate({
                    email: email,
                    name: name,
                    age: age,
                    gender: gender.toString() === 'Мужской' ? 'male' : 'female',
                    phone_number: number,
                    avatar: avatar?.uri ? avatar?.uri : '',
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
                      setAge(user?.age);
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
          <TextInput
            defaultValue={email}
            onChangeText={e => {
              setEmail(e);
            }}
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              marginTop: 8,
              marginBottom: 30,
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
      <View style={{backgroundColor: '#17181B', height: 1.5, marginTop: 40}} />
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
      <View style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}} />
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
      <View style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}} />
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
      <View style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}} />
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
      <View style={{backgroundColor: '#17181B', height: 1.5, marginTop: 15}} />
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
