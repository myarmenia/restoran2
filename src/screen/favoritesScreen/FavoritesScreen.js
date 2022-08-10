import React, {useState} from 'react';
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import FavoriteComp from '../../components/Favorites';
import {useSelector} from 'react-redux';
import LoadingComponent from '../../components/loadingComponent';
import SimpleHeader from '../../components/headers/SimpleHeader';

const FavoritesScreen = () => {
  const {favorite} = useSelector(state => state.restaurant);
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      {loading ? <LoadingComponent /> : <></>}
      <SimpleHeader title={'Избранные рестораны'} />
      <FavoriteComp state={favorite} setLoading={setLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
});

export default FavoritesScreen;
