import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import FavoriteComp from '../../components/Favorites';
import {useSelector} from 'react-redux';
import SearchHeader from "../../components/headers/SearchHeader";

const FavoritesScreen = () => {
  const {favorite} = useSelector(state => state.restaurant);

  return (
    <View style={styles.container}>
      {/*<SimpleHeader title={'Актуальные брони'} />*/}
      <SearchHeader />
      <FavoriteComp state={favorite} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height,
    height: '100%',
    padding: 20,
  },
});

export default FavoritesScreen;
