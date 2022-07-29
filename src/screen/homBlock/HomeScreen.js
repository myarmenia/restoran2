import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CategoriesBlock from '../../screen/homBlock/CategoriesBlock';
import TopRestaurants from '../../components/TopRestaurants';
import {
  Favorite,
  Kitchen,
  Orders,
  Preference,
  Preferences,
  Restaurant,
} from '../../store/reducers/restaurant/action';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';
import SearchComponent from '../../components/searchComponent';

const HomeScreen = ({navigation}) => {
  const {restaurants} = useSelector(state => state.restaurant);
  const [rest, setRest] = useState(restaurants);
  const [title, setTitle] = useState('Топ Ресторанов');

  const dispatch = useDispatch();

  useEffect(() => {
    setRest(restaurants);
  }, [restaurants]);

  useEffect(() => {
    dispatch(Restaurant());
    dispatch(Favorite());
    dispatch(Kitchen());
    dispatch(Orders());
    dispatch(Preference());
  }, []);

  return (
    <>
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
    paddingTop: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default HomeScreen;
