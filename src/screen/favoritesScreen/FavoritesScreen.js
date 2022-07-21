import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import FavoriteComp from '../../components/Favorites';
import {useSelector} from 'react-redux';
import SearchHeader from '../../components/headers/SearchHeader';
import SearchComponent from '../../components/searchComponent';

const FavoritesScreen = ({navigation}) => {
  const {favorite, restaurants} = useSelector(state => state.restaurant);

  return (
    <View style={styles.container}>
      {/*<SimpleHeader title={'Актуальные брони'} />*/}
      <SearchComponent data={restaurants} navigation={navigation} />
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
