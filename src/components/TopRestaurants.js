import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import MarkSvg from '../assets/svg/homeScreen/MarkSvg';
import {useDispatch, useSelector} from 'react-redux';
import {Favorites, Restaurants} from '../store/reducers/restaurant/action';
import LoadingComponent from './loadingComponent';

const TopRestaurants = ({navigation, state}) => {
  const {favorite} = useSelector(({restaurant}) => restaurant);
  const [choosed, setChoosed] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const newVal = favorite?.map(el => el?.id);
    setChoosed(newVal);
  }, [favorite]);

  return (
    <>
      {loading ? <LoadingComponent /> : <></>}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={state}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container}
            onPress={async () => {
              await dispatch(Restaurants(item?.id));
              navigation.navigate('RestTitle');
            }}
            activeOpacity={0.7}>
            <TouchableOpacity
              style={styles.mark}
              onPress={async () => {
                setLoading(true);
                setChoosed(prev => {
                  const arr = prev;
                  if (!arr.includes(item?.id)) {
                    arr.push(item?.id);
                  } else {
                    return arr.filter(el => el !== item?.id);
                  }
                  return arr;
                });
                await dispatch(Favorites({id: item?.id}));
                setLoading(false);
              }}>
              <MarkSvg choosed={choosed.includes(item?.id)} />
            </TouchableOpacity>
            <View style={styles.subContainer}>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={
                  item?.images[0]?.path
                    ? {
                        uri: `https://back.tap-table.ru/get_file?path=/${item?.images[0]?.path}`,
                      }
                    : require('../assets/img/home/restaurants/1.png')
                }
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.categories}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202124',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 15,
    marginVertical: 7,
    padding: 5,
    width: 0.43 * Dimensions.get('screen').width,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  mark: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  categories: {
    fontSize: 14,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default TopRestaurants;
