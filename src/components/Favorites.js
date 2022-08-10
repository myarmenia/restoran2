import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MarkSvg from '../assets/svg/homeScreen/MarkSvg';
import {useDispatch} from 'react-redux';
import {Favorites} from '../store/reducers/restaurant/action';

const FavoriteComp = ({state, setLoading}) => {
  const [choosed, setChoosed] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const newVal = state?.map(el => el?.id);
    setChoosed(newVal);
  }, [state]);

  return state.length ? (
    <FlatList
      data={state}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item}) => (
        <View style={styles.container}>
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
              await setLoading(false);
            }}>
            <MarkSvg choosed={choosed.includes(item?.id)} />
          </TouchableOpacity>

          <View style={styles.subContainer} activeOpacity={0.7}>
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
            {/*<Text style={styles.name}>{item.title}</Text>*/}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.categories}>{item.desc}</Text>
          </View>
        </View>
      )}
    />
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height - 170,
      }}>
      <Text style={{color: '#fff'}}>У вас нет избранных ресторанов</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202124',
    paddingHorizontal: 5,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
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
    top: 10,
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

export default FavoriteComp;
