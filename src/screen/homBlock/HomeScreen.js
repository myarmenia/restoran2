import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CategoriesBlock from '../../screen/homBlock/CategoriesBlock';
import TopRestaurants from '../../components/TopRestaurants';
import SearchHeader from '../../components/headers/SearchHeader';
import {Restaurant, Restaurants} from '../../store/reducers/restaurant/action';

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
  }, []);

  return (
    <View style={styles.container}>
      <SearchHeader />
      <Text style={styles.text}>Категории</Text>
      <CategoriesBlock setTitle={setTitle} update={setRest} />
      <Text style={styles.text}>{title}</Text>
      <TopRestaurants navigation={navigation} state={rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default HomeScreen;
