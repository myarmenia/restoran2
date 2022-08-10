import React from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import BookingRestaurants from '../../components/BookingRestaurants';

const SelectMenuScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BookingRestaurants navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
