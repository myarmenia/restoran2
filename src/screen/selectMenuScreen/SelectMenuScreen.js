import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import BookingRestaurants from '../../components/BookingRestaurants';
import {useSelector} from 'react-redux';

const SelectMenuScreen = () => {
  const {restaurants} = useSelector(state => state.home);

  return (
    <View style={styles.container}>
      <SimpleHeader title={'Актуальные брони'} />
      <BookingRestaurants state={restaurants} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 10,
  },
});

export default SelectMenuScreen;
