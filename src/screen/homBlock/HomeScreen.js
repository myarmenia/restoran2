import React, {useEffect} from 'react';
import {Text, StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CategoriesBlock from '../../screen/homBlock/CategoriesBlock';
import TopRestaurants from '../../components/TopRestaurants';
import SearchHeader from '../../components/headers/SearchHeader';
import {
  Favorite,
  Favorites,
  Kitchen,
  Menu,
  Orders,
  Preference,
  Restaurant,
  Restaurants,
} from '../../store/reducers/restaurant/action';

const HomeScreen = ({navigation}) => {
  const {restaurants} = useSelector(state => state.restaurant);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Restaurant());
    dispatch(Favorite());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 80}}>
        <SearchHeader />
        <Text style={styles.text}>Категории</Text>
        <CategoriesBlock />
        <Text style={styles.text}>Топ рестораны</Text>
        <TopRestaurants state={restaurants} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height,
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 10,
  },
});

export default HomeScreen;
