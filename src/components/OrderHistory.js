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
  return orders?.length ? (
    <FlatList
      data={orders}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <View>
          <View style={styles.container}>
            <View style={styles.subContainer} activeOpacity={0.7}>
              <View style={{flex: 2, marginRight: 15}}>
                <Image
                  style={styles.img}
                  resizeMode="cover"
                  source={
                    item?.img || require('../assets/img/home/dishes/1.png')
                  }
                />
              </View>
              <View style={{flex: 7}}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.categories}>{item.desc}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      )}
    />
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height - 80,
      }}>
      <Text style={{color: '#fff'}}>У вас нет избранных ресторанов</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('screen').height,
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
