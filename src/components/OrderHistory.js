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

const OrderHistory = ({navigation}) => {
  const {orders, restaurants} = useSelector(({restaurant}) => restaurant);
  console.log('lorak', restaurants);
  return orders?.length &&
    orders.reduce((last, next) => {
      if (
        new Date(next.coming_date.split(' ')[0]).setHours(
          next.coming_date.split(' ')[1].split(':')[0],
          next.coming_date.split(' ')[1].split(':')[1],
        ) <= +Date.now()
      ) {
        return true;
      } else {
        return last;
      }
    }, false) ? (
    <FlatList
      data={[...orders].reverse()}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return new Date(item?.coming_date.split(' ')[0]).setHours(
          item?.coming_date.split(' ')[1].split(':')[0],
          item?.coming_date.split(' ')[1].split(':')[1],
        ) <= +Date.now() ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CurrentOrder', {
                  menu: item?.menus,
                  restId: item?.restaurant_id,
                });
              }}
              disabled={!item.menus.length}
              style={styles.container}>
              <View style={styles.subContainer} activeOpacity={0.7}>
                <View style={{marginRight: 15}}>
                  <Image
                    style={styles.img}
                    resizeMode="cover"
                    source={
                      item?.rest?.images[0]?.path
                        ? {
                            uri: `https://back.tap-table.ru/get_file?path=/${item?.rest?.images[0]?.path}`,
                          }
                        : require('../assets/img/home/restaurants/1.png')
                    }
                  />
                </View>
                <View
                  style={{
                    textAlign: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.name}>{item?.rest?.name}</Text>
                  <Text style={styles.categories}>
                    {restaurants.filter(el => el.id === item?.rest?.id)[0].desc}
                  </Text>
                  <Text style={styles.desc}>
                    Вы забронировали столик для {item?.people_nums}{' '}
                    {item?.people_nums >= 1 && item?.people_nums <= 4
                      ? 'человекa'
                      : 'человек'}{' '}
                    {item?.menus?.length ? '+ меню' : ''}
                  </Text>
                  <Text style={styles.date}>{item?.coming_date}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
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
        height: Dimensions.get('window').height - 80,
      }}>
      <Text style={{color: '#fff'}}>История заказов пуста</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },

  subContainer: {
    flexDirection: 'row',
    paddingLeft: 30,
  },
  img: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  name: {
    color: '#fff',
    fontSize: 17,
  },
  categories: {
    fontSize: 12,
    color: '#5F6368',
  },
  desc: {
    fontSize: 9,
    color: '#5F6368',
  },
  date: {
    fontSize: 9,
    color: '#fff',
  },

  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 3,
  },
});

export default OrderHistory;
