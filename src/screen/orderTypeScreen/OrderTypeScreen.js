import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DatePicker from '../../components/UI/datePicker/DatePicker';
import MainButton from '../../components/UI/buttons/MainButton';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../components/headers/SimpleHeader';
import {useDispatch, useSelector} from 'react-redux';
import {Menus, orderStore} from '../../store/reducers/restaurant/action';
import {addDish, addRest} from '../../store/reducers/restaurant/slice';

const OrderTypeScreen = ({navigation, route}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  // const [time, setTime] = useState(new Date(Date.now()));
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const {restaurant} = useSelector(({restaurant}) => restaurant);
  return (
    <ScrollView>
      <SimpleHeader title={'Назад'} />
      <View
        style={{
          width: '100%',
          minHeight: Dimensions.get('screen').height - 200,
          backgroundColor: '#000000',
          height: '100%',
          padding: 25,
          justifyContent: 'space-between',
          paddingBottom: 0.2 * Dimensions.get('screen').height,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              marginTop: 20,
              marginHorizontal: 25,
            }}>
            Дата
          </Text>
          <View style={{marginTop: 13}}>
            <DatePicker
              mode={'date'}
              date={date}
              setDate={setDate}
              openModal={datePicker}
              setOpenModal={setDatePicker}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              marginTop: 20,
              marginHorizontal: 25,
            }}>
            Время
          </Text>
          <View style={{marginTop: 13}}>
            <DatePicker
              mode={'time'}
              date={date}
              setDate={setDate}
              openModal={timePicker}
              setOpenModal={setTimePicker}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              marginTop: 20,
              marginHorizontal: 25,
            }}>
            Количество чел.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 13,
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              disabled={count <= 1}
              onPress={() => setCount(prev => --prev)}
              style={{
                padding: 15,
                backgroundColor: '#202124',
                borderRadius: 45,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }}>
              <Text style={{color: '#5F6368', fontSize: 16, fontWeight: '700'}}>
                -
              </Text>
            </TouchableOpacity>
            <View style={{padding: 15, backgroundColor: '#17181B'}}>
              <Text style={{color: '#5F6368', fontSize: 16, fontWeight: '700'}}>
                {count}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setCount(prev => ++prev)}
              style={{
                padding: 15,
                backgroundColor: '#202124',
                borderRadius: 45,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}>
              <Text style={{color: '#5F6368', fontSize: 16, fontWeight: '700'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              marginTop: 20,
              marginHorizontal: 25,
            }}>
            Хотите заказать блюда?
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await dispatch(
                addRest([{
                  restaurant_id: restaurant?.id,
                  coming_date:
                    `${date.getFullYear()}-` +
                    `0${date.getMonth() + 1}`.slice(-2) +
                    '-' +
                    `0${date.getDate()}`.slice(-2) +
                    ' ' +
                    `0${date.getHours()}`.slice(-2) +
                    ':' +
                    `0${date.getMinutes()}`.slice(-2),  
                  people_nums: count,
                  floors: [
                    {
                      id: restaurant?.floor_planes?.data_json[
                        route.params.tableId
                      ].id
                        ? restaurant?.floor_planes?.data_json[
                            route.params.tableId
                          ].id
                        : route.params.tableId + 1,
                      x: 1,
                      y: 1,
                    },
                  ],
                  menus: [],
                }, restaurant?.phoneNumber]),
              );
              await dispatch(Menus(route.params.restId));
              navigation.navigate('MenuCategoriesScreen');
            }}>
            <LinearGradient
              colors={['#648E00', '#005100']}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}
              style={{
                borderRadius: 45,
                padding: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Меню</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <MainButton
          textBtn={'Забронировать'}
          goTo={async () => {
            await dispatch(
              orderStore({
                restaurant_id: restaurant?.id,
                coming_date:
                  `${date.getFullYear()}-` +
                  `0${date.getMonth() + 1}`.slice(-2) +
                  '-' +
                  `0${date.getDate()}`.slice(-2) +
                  ' ' +
                  `0${date.getHours()}`.slice(-2) +
                  ':' +
                  `0${date.getMinutes()}`.slice(-2),
                people_nums: count,
                floors: [
                  {
                    id: restaurant?.floor_planes?.data_json[
                      route.params.tableId
                    ].id
                      ? restaurant?.floor_planes?.data_json[
                          route.params.tableId
                        ].id
                      : route.params.tableId + 1,
                    x: 1,
                    y: 1,
                  },
                ],
              }),
            );
            navigation.navigate('Home');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#202124',
    borderRadius: 45,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#000000',
    borderRadius: 45,
  },
});

export default OrderTypeScreen;
