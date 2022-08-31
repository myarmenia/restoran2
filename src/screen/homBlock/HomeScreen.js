import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CategoriesBlock from '../../screen/homBlock/CategoriesBlock';
import TopRestaurants from '../../components/TopRestaurants';
import {
  Favorite,
  Kitchen,
  Orders,
  Preference,
  Restaurant,
} from '../../store/reducers/restaurant/action';
import {GetProfileData} from '../../store/reducers/auth/action';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';
import SearchComponent from '../../components/searchComponent';
import Echo from 'laravel-echo';
import PusherNative from 'pusher-js/react-native';
import LoadingComponent from '../../components/loadingComponent';

window.Echo = Echo;
window.Pusher = PusherNative;

const HomeScreen = ({navigation}) => {
  const {restaurants} = useSelector(state => state.restaurant);
  const [rest, setRest] = useState(restaurants);
  const [title, setTitle] = useState('Топ Ресторанов');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setRest(restaurants);
  }, [restaurants]);

  useEffect(() => {
    setLoading(true);
    getDates();
  }, []);

  // useEffect(() => {
  //   if (user?.id) {
  //     listenMessages();
  //   }
  // }, [user?.id]);

  const getDates = async () => {
    await dispatch(GetProfileData());
    await dispatch(Restaurant());
    await dispatch(Favorite());
    await dispatch(Kitchen());
    await dispatch(Orders());
    await dispatch(Preference());
    setLoading(false);
  };

  return (
    <>
      {loading ? <LoadingComponent /> : <></>}
      <SearchComponent data={restaurants} navigation={navigation} />
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={[styles.text, {paddingTop: 50}]}>Категории</Text>
          <CategoriesBlock setTitle={setTitle} update={setRest} />
          <Text style={styles.text}>{title}</Text>
          <TopRestaurants navigation={navigation} state={rest} />
        </View>
      </DismissKeyboard>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default HomeScreen;
