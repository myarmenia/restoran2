import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';

const OrderHistory = ({state}) => {
  const {orders} = useSelector(({restaurant}) => restaurant);
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
            <View style={styles.container}>
              <View style={styles.subContainer} activeOpacity={0.7}>
                <View style={{flex: 2, marginRight: 15}}>
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
                <View style={{flex: 7}}>
                  <Text style={styles.name}>{item?.rest?.name}</Text>
                  <Text style={styles.categories}>{item?.desc}</Text>
                  <Text style={styles.categories}>
                    Вы забронировали столик для {item?.people_nums}{' '}
                    {item?.people_nums >= 1 && item?.people_nums <= 4
                      ? 'человекa'
                      : 'человек'}
                  </Text>
                  <Text style={styles.name}>{item?.coming_date}</Text>
                </View>
              </View>
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  subContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  name: {
    color: '#fff',
    fontSize: 17,
    marginBottom: 0,
  },
  categories: {
    fontSize: 9,
    color: '#5F6368',
  },

  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 3,
  },
});

export default OrderHistory;
