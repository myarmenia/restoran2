import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import MapMarkerSvg from '../../assets/svg/homeScreen/MapMarkerSvg';
import {useSelector} from 'react-redux';
import {TouchableOpacity as GestureTouchableOpacity} from 'react-native-gesture-handler';
import SearchComponent from '../../components/searchComponent';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';
import CloseSvg from '../../assets/svg/CloseSvg';

const TitleBlock = ({navigation}) => {
  const {restaurants, restaurant, orders} = useSelector(
    state => state.restaurant,
  );
  const [openModal, setOpenModal] = useState(false);
  const [hall, setHall] = useState(0);

  useEffect(() => {
    setHall(0);
  }, [restaurant]);

  return (
    <View
      style={{
        backgroundColor: '#000',
        minHeight: Dimensions.get('screen').height - 100,
        height: '100%',
      }}>
      {openModal ? (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 40,
              backgroundColor: '#17181B',
            }}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.close}
                onPress={() => {
                  setOpenModal(false);
                }}>
                <CloseSvg />
              </TouchableOpacity>
              <Text style={styles.textModal}>
                Вы уже забронировали в данном ресторане
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      <ScrollView>
        <View
          style={{
            marginBottom: 20,
          }}>
          <SearchComponent data={restaurants} navigation={navigation} />
        </View>
        <DismissKeyboard>
          <View
            style={{
              padding: 25,
              marginTop: Platform.OS === 'ios' ? 65 : 35,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={
                  restaurant?.images[0]?.path
                    ? {
                        uri: `https://back.tap-table.ru/get_file?path=/${restaurant?.images[0]?.path}`,
                      }
                    : require('../../assets/img/home/restaurants/1.png')
                }
              />
              <View style={{paddingLeft: 20, flex: 3}}>
                <Text style={styles.name}>{restaurant?.name}</Text>
                <Text style={styles.categories}>{restaurant?.desc}</Text>
                <View
                  style={{
                    paddingTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MapMarkerSvg />
                  <Text style={styles.address}>{restaurant?.address}</Text>
                </View>
              </View>
            </View>
            <Text style={{color: '#FFFFFF', fontSize: 16, marginVertical: 20}}>
              Выбрать посадочное место
            </Text>
            {restaurant?.floor_planes ? (
              <View>
                <Text
                  style={{color: '#FFFFFF', fontSize: 16, marginVertical: 10}}>
                  Залы
                </Text>
                <FlatList
                  horizontal={true}
                  contentContainerStyle={{
                    marginBottom: 20,
                  }}
                  data={restaurant.floor_planes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={el => (
                    <TouchableOpacity
                      key={el.index}
                      style={[
                        styles.btn,
                        hall !== el.index && hall !== -1
                          ? {opacity: 0.5}
                          : {opacity: 1},
                      ]}
                      onPress={() => setHall(el.index)}>
                      <Text style={{color: 'white'}}>{el.item?.hall_name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <></>
            )}
            {restaurant?.floor_planes &&
            restaurant.floor_planes[hall]?.tables ? (
              <>
                <Text
                  style={{color: '#FFFFFF', fontSize: 16, marginVertical: 10}}>
                  Столики
                </Text>
                <FlatList
                  numColumns={3}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={{paddingBottom: 80}}
                  keyExtractor={(item, index) => index.toString()}
                  data={
                    typeof restaurant.floor_planes[hall].tables === 'string'
                      ? JSON.parse(restaurant.floor_planes[hall].tables)
                      : restaurant.floor_planes[hall].tables
                  }
                  renderItem={el =>
                    Platform.OS === 'ios' ? (
                      <GestureTouchableOpacity
                        style={{
                          margin: 5,
                          backgroundColor: !el.item.free
                            ? '#008f02'
                            : '#8f0000',
                          borderRadius: 15,
                          justifyContent: 'center',
                          padding: 10,
                          alignItems: 'flex-start',
                        }}
                        disabled={el.item.free}
                        onPress={() => {
                          const arr = orders
                            ? orders.map(elem => {
                                if (
                                  new Date(
                                    elem.coming_date.split(' ')[0],
                                  ).setHours(
                                    elem.coming_date
                                      .split(' ')[1]
                                      .split(':')[0],
                                    elem.coming_date
                                      .split(' ')[1]
                                      .split(':')[1],
                                  ) >= +Date.now()
                                ) {
                                  if (elem?.rest?.id !== restaurant?.id) {
                                    return true;
                                  }
                                  return false;
                                } else {
                                  return true;
                                }
                              })
                            : [];
                          if (arr ? arr.every(elem => elem === true) : true) {
                            navigation.navigate('OrderTypeScreen', {
                              restId: restaurant?.id,
                              tableId: el.item.id,
                              hall: restaurant?.floor_planes[hall].id,
                            });
                          } else {
                            setOpenModal(true);
                          }
                        }}
                        key={+el.index}>
                        <Text style={styles.text}>Столик №{+el.item.id}</Text>
                        <Text style={styles.text}>{el.item.position}</Text>
                        <Text style={styles.text}>
                          Кол. чел: {+el.item.count}
                        </Text>
                      </GestureTouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          margin: 10,
                          backgroundColor: !el.item.free
                            ? '#008f02'
                            : '#8f0000',
                          borderRadius: 10,
                          justifyContent: 'center',
                          padding: 10,
                          alignItems: 'flex-start',
                        }}
                        disabled={el.item.free}
                        onPress={() => {
                          const arr = orders.length
                            ? orders.map(elem => {
                                if (
                                  new Date(
                                    elem.coming_date.split(' ')[0],
                                  ).setHours(
                                    elem.coming_date
                                      .split(' ')[1]
                                      .split(':')[0],
                                    elem.coming_date
                                      .split(' ')[1]
                                      .split(':')[1],
                                  ) >= +Date.now()
                                ) {
                                  if (elem?.rest?.id !== restaurant?.id) {
                                    return true;
                                  }
                                  return false;
                                } else {
                                  return true;
                                }
                              })
                            : [];
                          if (
                            arr.length ? arr.every(item => item === true) : true
                          ) {
                            navigation.navigate('OrderTypeScreen', {
                              restId: restaurant?.id,
                              tableId: el.item.id,
                              hall: restaurant?.floor_planes[hall].id,
                            });
                          } else {
                            setOpenModal(true);
                          }
                        }}
                        key={+el.index}>
                        <Text style={styles.text}>Столик №{+el.item.id}</Text>
                        <Text style={styles.text}>{el.item.position}</Text>
                        <Text style={styles.text}>
                          Кол. чел: {+el.item.count}
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                />
              </>
            ) : (
              <></>
            )}
          </View>
        </DismissKeyboard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  categories: {
    fontSize: 16,
    lineHeight: 19,
    color: '#5F6368',
    paddingBottom: 20,
  },
  address: {
    fontSize: 12,
    color: '#5F6368',
    paddingLeft: 3,
  },
  name: {
    color: '#fff',
    fontSize: 20,
  },
  img: {
    flex: 2,
  },
  imgTable: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  modal: {
    backgroundColor: '#17181B',
    width: '100%',
    elevation: 10,
    borderRadius: 10,
  },
  close: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  textModal: {
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 80,
    textAlign: 'center',
    marginTop: 33,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: '#202124',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 80,
  },
});

export default TitleBlock;
