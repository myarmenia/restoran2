import React from 'react';
import {Text, StyleSheet, View, Dimensions, ScrollView,TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import MainDishes from '../../components/UI/MainDishes';
import SimpleHeader from '../../components/headers/SimpleHeader'


const MainDishesScreen = () => {
  const {restaurants} = useSelector(state => state.restaurant);

  return (
    <View style={styles.container}>
      <ScrollView>
      <SimpleHeader title={'Основные Блюда'} right={-40}/>
        <MainDishes />
      </ScrollView>
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
