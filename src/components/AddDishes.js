import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MainButton from '../components/UI/buttons/MainButton';
import CallSvg from '../assets/svg/callSvg/CallSvg';
import DeleteSvg from '../assets/svg/DeleteSvg';
import DeleteModal from '../components/UI/DeleteModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  MenusByMenuID,
  Orders,
  orderStore, Preference,
  Preferences,
} from "../store/reducers/restaurant/action";
import {broneRest} from '../store/reducers/restaurant/slice';
import LikeComponent from './UI/LikeComponent';

const AddDishes = ({restId, setLoading, menu, menuDesc, data, navigation}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [productsArray, setProductsArray] = useState(menu);
  const {phoneNumbers} = useSelector(({restaurant}) => restaurant);
  const [sum, setSum] = useState(0);
  const {preference} = useSelector(({restaurant}) => restaurant);
  const [choosed, setChoosed] = useState([]);
  useEffect(() => {
    const newVal = preference?.map(el => el?.id);
    setChoosed(newVal);
  }, [preference]);

  useEffect(() => {
    setProductsArray(menu);
  }, [menu, productsArray]);

  useEffect(() => {
    setSum(
      menuDesc.reduce(
        (last, next, index) =>
          last +
          +next?.price *
            +(
              Array.isArray(productsArray)
                ? productsArray
                : Object.values(productsArray)
            )[index]?.count,
        0,
      ),
    );
  }, [productsArray]);

  return (
    <View>
      <View>
        {openModal && (
          <DeleteModal
            productsArray={productsArray}
            setProductsArray={setProductsArray}
            index={index}
            setOpenModal={setOpenModal}
            restId={restId}
          />
        )}
      </View>

      {productsArray?.length ? (
        <>
          <FlatList
            data={
              Array.isArray(productsArray)
                ? productsArray
                : Object.values(productsArray)
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
            renderItem={({item, index}) => (
              <View>
                <View style={styles.container}>
                  <View style={styles.subContainer} activeOpacity={0.7}>
                    <View style={{flex: 2, marginRight: 15}}>
                      <TouchableOpacity>
                        <Image
                          style={styles.img}
                          resizeMode="cover"
                          source={
                            item?.img ||
                            require('../assets/img/home/dishes/1.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 7}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity>
                          <Text style={styles.name}>
                            {menuDesc[index]?.name}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
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
                            await dispatch(Preferences({id: item?.id}));
                            await dispatch(Preference());
                            await setLoading(false);
                          }}>
                          <LikeComponent choosed={choosed.includes(item?.id)} />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.categories}>
                        {menuDesc[index]?.desc}
                      </Text>
                      <Text style={styles.name}>
                        {menuDesc[index]?.price} руб. х {item?.count} порции,{' '}
                      </Text>
                      {item.isMenuSelected ? null : (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 5,
                          }}>
                          <TouchableOpacity
                            onPress={async () => {
                              setLoading(true);
                              await dispatch(MenusByMenuID(item?.id));
                              await setLoading(false);
                              navigation.navigate('NameDishScreen', {
                                restId: restId,
                              });
                            }}
                            style={styles.opacity}>
                            <Text style={{color: '#FFFFFF', marginRight: 5}}>
                              Подробнее >>
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 4,
                              }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setIndex(+item?.id);
                              setOpenModal(true);
                            }}>
                            <DeleteSvg />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.line} />
              </View>
            )}
          />

          {/* <View style={[styles.line, {marginTop: 10}]} /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 30,
              marginTop: 15,
            }}>
            <Text style={{color: '#5F6368', fontSize: 14, marginRight: 10}}>
              Общее:
            </Text>
            <Text style={{color: '#5F6368', fontSize: 14}}>{sum} рублей</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 30,
              marginTop: 10,
            }}>
            <Text style={{color: '#5F6368', fontSize: 14, marginRight: 10}}>
              Оплата за обслуживание Х%:{' '}
            </Text>
            <Text style={{color: '#5F6368', fontSize: 14}}>
              {(0.1 * sum).toFixed(1)} рублей
            </Text>
          </View>

          <View style={[styles.line, {marginTop: 15}]} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <Text style={{color: '#FFFFFF', fontSize: 20, flex: 3}}>
              К оплате {(0.1 * sum + sum).toFixed(1)} рублей
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phoneNumbers[restId]}`)}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 12, color: '#5F6368', marginRight: 15}}>
            Для обратной связи.
          </Text>
          <CallSvg />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 20, marginHorizontal: 10, marginTop: 25}}>
        <MainButton
          goTo={async () => {
            setLoading(true);
            await dispatch(
              orderStore({
                ...data,
                menus: Array.isArray(productsArray)
                  ? productsArray
                  : Object.values(productsArray),
              }),
            )
            await dispatch(Orders());
            await dispatch(broneRest([restId]));
            await setLoading(false);
            navigation.navigate('Home');
          }}
          textBtn={'Добавить меню к бронированию'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'row',
    marginTop: 8,
  },

  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 5,
  },
  categories: {
    fontSize: 11,
    color: '#5F6368',
  },
  opacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 3,
  },
});

export default AddDishes;
