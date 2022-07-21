import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {initialState1} from './UI/RestaurantsData';
import MoreSvg from '../assets/svg/MoreSvg';

const BookingRestaurants = ({orders}) => {
  return orders?.length ? (
    <FlatList
      data={initialState1}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TouchableOpacity style={styles.mark} />
          <View style={styles.subContainer} activeOpacity={0.7}>
            <Image style={styles.img} resizeMode="cover" source={item.img} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.categories}>{item.bookDate}</Text>
            <Text style={styles.categories}>{item.isMenuSelected}</Text>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={{color: '#FFFFFF', marginRight: 5}}>Подробнее</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}>
              <MoreSvg />
              <MoreSvg />
            </View>
          </TouchableOpacity>
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
  },
});

export default BookingRestaurants;
