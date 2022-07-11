import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import MarkSvg from '../assets/svg/homeScreen/MarkSvg';
import {useDispatch, useSelector} from 'react-redux';
import {Favorites} from '../store/reducers/restaurant/action';

const TopRestaurants = ({state}) => {
  const {favorite} = useSelector(({restaurant}) => restaurant);
  const [choosed, setChoosed] = useState(Array(state.length).fill(false));
  const dispatch = useDispatch();

  useEffect(() => {
    const newVal = favorite?.map((el, index) => el?.id === state[index]?.id);
    setChoosed(newVal);
  }, []);

  return (
    <FlatList
      style={{marginHorizontal: 13}}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={state}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item, index}) => (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.mark}
            onPress={() => {
              setChoosed(prev => {
                const arr = prev;
                arr[index] = !prev[index];
                return arr;
              });
              dispatch(Favorites({id: item?.id}));
            }}>
            <MarkSvg choosed={choosed[index]} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={goToTitleBlock}
            style={styles.subContainer}
            activeOpacity={0.7}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={
                item.img || require('../assets/img/home/restaurants/1.png')
              }
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.categories}>{item.desc}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
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
    marginHorizontal: 7,
    marginVertical: 7,
    flex: 0.5,
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
  },
  categories: {
    fontSize: 14,
    color: '#5F6368',
  },
});

export default TopRestaurants;
