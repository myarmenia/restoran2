import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import CallSvg from '../../assets/svg/callSvg/CallSvg';
import {useDispatch, useSelector} from 'react-redux';
import {
  Preferences,
  Preference,
} from '../../store/reducers/restaurant/action';
import LikeComponent from '../../components/UI/LikeComponent';
import LoadingComponent from '../../components/loadingComponent';
import SimpleHeader from '../../components/headers/SimpleHeader';

const CurrentOrderScreen = ({route}) => {
  const dispatch = useDispatch();
  const {preference, restaurants} = useSelector(
    ({restaurant}) => restaurant,
  );
  const [sum, setSum] = useState(0);
  const [choosed, setChoosed] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const newVal = preference?.map(el => el?.id);
    setChoosed(newVal);
  }, [preference]);

  useEffect(() => {
    setSum(
      route.params.menu.reduce(
        (last, next) => last + +next?.price * +next?.count,
        0,
      ),
    );
  }, []);
  return (
    <View style={styles.outerContainer}>
      {loading ? <LoadingComponent /> : <></>}
      <SimpleHeader title={'Заказ'} />
      {route.params.menu?.length ? (
        <View>
          <FlatList
            data={
              Array.isArray(route.params.menu)
                ? route.params.menu
                : Object.values(route.params.menu)
            }
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <>
                <View style={styles.container}>
                  <View style={styles.subContainer} activeOpacity={0.7}>
                    <View style={{flexGrow: 2, marginRight: 15}}>
                      <TouchableOpacity>
                        <Image
                          style={styles.img}
                          resizeMode="cover"
                          source={
                            item?.img ||
                            require('../../assets/img/home/dishes/1.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flexGrow: 7}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity>
                          <Text style={styles.name}>
                            {route.params.menu[index]?.name}
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
                        {route.params.menu[index]?.desc}
                      </Text>
                      <Text style={styles.name}>
                        {route.params.menu[index]?.price} руб. х {item?.count}{' '}
                        порции,{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.line} />
              </>
            )}
          />
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
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <View style={{flex: 1}} />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `tel://${
                    restaurants.filter(el => el.id === route.params.restId)[0]
                      .phone_number
                  }`,
                )
              }
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
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('screen').height - 100,
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    paddingBottom: 300,
  },
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

export default CurrentOrderScreen;
