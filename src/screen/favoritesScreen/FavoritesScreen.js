import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import Favorites from '../../components/Favorites';
import {useSelector} from 'react-redux';

const FavoritesScreen = () => {
  const {restaurants} = useSelector(state => state.home);

  return (
    <View style={styles.container}>
      <SimpleHeader title={'Актуальные брони'} />
      <Favorites state={restaurants} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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

export default FavoritesScreen;
