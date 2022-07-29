import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import EditSvg from '../../assets/svg/edit/EditSvg';
import {signOut} from '../../store/reducers/auth/slice';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileUpdate} from '../../store/reducers/auth/action';
import * as ImagePicker from 'react-native-image-crop-picker';
import LoadingComponent from '../../components/loadingComponent';
import RNPickerSelect from 'react-native-picker-select';
import MainButton from '../../components/UI/buttons/MainButton';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(({auth}) => auth);
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [number, setNumber] = useState(user?.phone_number);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setAvatar({mime: image.mime, data: image.data});
      setShowModal(false);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setAvatar({mime: image.mime, data: image.data});
      setShowModal(false);
    });
  };

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      {showModal ? (
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
                top: 0.3 * Dimensions.get('screen').height,
                marginHorizontal: 30,
              }}>
              <View style={styles.panel}>
                <Text style={styles.panelTitle}>
                  Выберите фотографию для профиля
                </Text>
                <View style={styles.panelButton}>
                  <MainButton
                    goTo={takePhotoFromCamera}
                    style={styles.panelButtonTitle}
                    textBtn={'Сфотографироваться'}
                  />
                </View>
                <View style={styles.panelButton}>
                  <MainButton
                    goTo={choosePhotoFromLibrary}
                    style={styles.panelButtonTitle}
                    textBtn={'Выбрать из галереи'}
                  />
                </View>
                <View style={styles.panelButton}>
                  <MainButton
                    goTo={() => setShowModal(false)}
                    style={styles.panelButtonTitle}
                    textBtn={'Отменить'}
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
                  avatar
                    ? {uri: `data:${avatar.mime};base64,${avatar.data}`}
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
                {gender?.label ? gender.label : gender ? gender : 'Мужской'},{' '}
                {age || '18'}
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
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{flex: 2}}>
              <Image
                source={
                  avatar?.mime
                    ? {uri: `data:${avatar.mime};base64,${avatar.data}`}
                    : avatar
                }
                style={{width: 88, height: 88, borderRadius: 45}}
              />
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
                  onValueChange={value => setGender(value)}
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
                  defaultValue={'' + age || '18'}
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
                    gender: gender,
                    phone_number: number,
                    avatar: avatar.mime
                      ? `data:${avatar.mime};base64,${avatar.data}`
                      : avatar,
                  }),
                );
                setLoading(false);
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
      <View style={{backgroundColor: '#17181B', height: 1.5, marginTop: 55}} />
      <TouchableOpacity
        onPress={() => {
          dispatch(signOut());
        }}>
        <Text
          style={{
            color: '#5F6368',
            fontSize: 18,
            marginTop: 15,
            marginLeft: 40,
            marginBottom: 80,
          }}>
          Выход
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
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
