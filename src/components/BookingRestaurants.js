import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

const BookingRestaurants = ({navigation}) => {
  const {orders} = useSelector(state => state.restaurant);

  return orders?.length &&
    orders.reduce((last, next) => {
      return (
        new Date(next.coming_date.split(' ')[0]).setHours(
          next.coming_date.split(' ')[1].split(':')[0],
          next.coming_date.split(' ')[1].split(':')[1],
        ) >= +Date.now() || last
      );
    }, false) ? (
    <FlatList
      data={[...orders].reverse()}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={{justifyContent: 'center'}}
      renderItem={({item}) => {
        return new Date(item.coming_date.split(' ')[0]).setHours(
          item.coming_date.split(' ')[1].split(':')[0],
          item.coming_date.split(' ')[1].split(':')[1],
        ) >= +Date.now() ? (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate('CurrentOrder', {
                menu: item?.menus,
                restId: item?.restaurant_id,
              });
            }}
            disabled={!item.menus.length}>
            <View style={styles.subContainer} activeOpacity={0.7}>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={
                  item?.rest?.images[0]?.path
                    ? {
                        uri: `https://tap-table.ru/get_file?path=/${item.rest.images[0].path}`,
                      }
                    : require('../assets/img/home/restaurants/1.png')
                }
              />
              <Text style={styles.name}>{item.rest.name}</Text>
              <Text style={styles.categories}>Бронь в {item.coming_date}</Text>
              <Text style={styles.categories}>
                {item.menus.length ? 'Меню выбрана' : 'Меню не выбрана'}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        );
      }}
    />
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height - 170,
      }}>
      <Text style={{color: '#fff'}}>У вас нет заказов</Text>
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
  },
  categories: {
    fontSize: 14,
    color: '#5F6368',
    textAlign: 'center',
  },
});

export default BookingRestaurants;
