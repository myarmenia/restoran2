import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import FavoriteComp from '../../components/Favorites';
import {useSelector} from 'react-redux';
import SearchComponent from '../../components/searchComponent';

const FavoritesScreen = ({navigation}) => {
  const {favorite, restaurants} = useSelector(state => state.restaurant);

  return (
    <View style={styles.container}>
      <SearchComponent data={favorite} navigation={navigation} />
      <View style={{marginTop: 60}}>
        <FavoriteComp state={favorite} />
      </View>
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
