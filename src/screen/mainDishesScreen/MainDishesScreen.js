import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MainDishes from '../../components/UI/MainDishes';
import SimpleHeader from '../../components/headers/SimpleHeader';
import LoadingComponent from '../../components/loadingComponent';

const MainDishesScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      <SimpleHeader title={'Основные Блюда'} right={-40} />
      <MainDishes
        restId={route.params.restId}
        navigation={navigation}
        setLoading={setLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
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
