import * as React from 'react';
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
import {useState} from 'react';
import {ProfileUpdate} from '../../store/reducers/auth/action';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(({auth}) => auth);
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user?.name);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [number, setNumber] = useState(user?.phone_number);
  const [email, setEmail] = useState(user?.email);

  return (
    <View style={styles.container}>
      {/*{showModal ? (*/}
      {/*  <View>*/}

      {/*  </View>*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
      {!changes ? (
        <View>
          <View style={{flexDirection: 'row', marginHorizontal: 40}}>
            <View style={{flex: 2}}>
              <Image
                source={
                  user?.avatar || require('../../assets/png/profileImg.png')
                }
                style={{
                  width: 88,
                  height: 88,
                }}
              />
            </View>
            <View style={{flex: 4, marginTop: 8}}>
              <Text style={{fontSize: 18, color: '#FFFFFF', marginBottom: 8}}>
                {name}
              </Text>
              <Text style={{fontSize: 12, color: '#FFFFFF'}}>
                {gender || 'Мужской'}, {age || '18'}
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
                  user?.avatar || require('../../assets/png/profileImg.png')
                }
                style={{width: 88, height: 88}}
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
                  borderRadius: 25,
                  padding: 5,
                  paddingLeft: 20,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  defaultValue={gender || 'Мужской'}
                  onChangeText={e => {
                    setGender(e);
                  }}
                  style={{
                    fontSize: 12,
                    color: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: 'white',
                    flex: 1,
                    borderRadius: 25,
                    padding: 5,
                    paddingLeft: 20,
                  }}
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
                    borderRadius: 25,
                    padding: 5,
                    paddingLeft: 20,
                  }}
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('Изменения сохранены');
                setChanges(prev => !prev);
                dispatch(
                  ProfileUpdate({
                    email: email,
                    name: name,
                    age: age,
                    gender: gender,
                    phone_number: number,
                    avatar: '',
                  }),
                );
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
              borderRadius: 25,
              padding: 5,
              paddingLeft: 20,
              marginRight: 30,
            }}
          />
          <TextInput
            defaultValue={email}
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              marginTop: 8,
              marginBottom: 30,
              marginLeft: 40,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 25,
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
      <TouchableOpacity onPress={() => dispatch(signOut())}>
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
});

export default ProfileScreen;
