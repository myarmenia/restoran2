import React from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import MainDishes from '../../components/UI/MainDishes';
import SimpleHeader from '../../components/headers/SimpleHeader';

const MainDishesScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <SimpleHeader title={'Основные Блюда'} right={-40} />
      <MainDishes restId={route.params.restId} navigation={navigation} />
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
    color: '#FFFFFF',
    fontSize: 17,
  },
  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 8,
  },
});

export default MainDishesScreen;
