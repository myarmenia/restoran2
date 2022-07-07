import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import VirtualizedView from "../../utils/VirtualizedView";
import SimpleHeader from '../../components/headers/SimpleHeader';
import BookingRestaurants from '../../components/BookingRestaurants';
import {useSelector} from 'react-redux';

const SelectMenuScreen = () => {
  const {restaurants} = useSelector(state => state.home);

  return (
    <View>
      <LinearGradient colors={['black', 'black']}>
        {/*<VirtualizedView>*/}
        <SimpleHeader title={'Актуальные брони'} />
        <BookingRestaurants state={restaurants} />
        {/*</VirtualizedView>*/}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 10,
  },
});

export default SelectMenuScreen;
