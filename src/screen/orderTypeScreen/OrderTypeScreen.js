import React, {useEffect, useState} from 'react';
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
import {
  Menus,
  Orders,
  orderStore,
} from '../../store/reducers/restaurant/action';
import {addRest} from '../../store/reducers/restaurant/slice';
import LoadingComponent from '../../components/loadingComponent';

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const weekdaysTranslate = {
  sunday: {
    en: 'Sunday',
    ru: 'Воскресение',
  },
  monday: {
    en: 'Monday',
    ru: 'Понедельник',
  },
  tuesday: {
    en: 'Tuesday',
    ru: 'Вторник',
  },
  wednesday: {
    en: 'Wednesday',
    ru: 'Среда',
  },
  thursday: {
    en: 'Thursday',
    ru: 'Четверг',
  },
  friday: {
    en: 'Friday',
    ru: 'Пятница',
  },
  saturday: {
    en: 'Saturday',
    ru: 'Суббота',
  },
};

const OrderTypeScreen = ({navigation, route}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wrongDateModal, setWrongDateModal] = useState('');
  const dispatch = useDispatch();
  const {restaurant} = useSelector(({restaurant}) => restaurant);

  return (
    <ScrollView>
      {loading ? <LoadingComponent /> : <></>}
      {wrongDateModal ? (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            zIndex: 100,
          }}>
          <View
            style={{
              zIndex: 200,
              backgroundColor: 'rgba(0,0,0)',
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0)',
                top: 0.3 * Dimensions.get('screen').height,
                paddingHorizontal: 50,
              }}>
              <View style={styles.panel}>
                <Text style={styles.panelTitle}>
                  {wrongDateModal === 'day'
                    ? 'Наш рабочий график'
                    : 'Мы работаем'}
                </Text>
                <Text style={styles.panelTitle}>
                  {wrongDateModal === 'day'
                    ? restaurant.days.reduce((last, next, index) => {
                        return (
                          last +
                          weekdaysTranslate[next.day.toLowerCase()].ru +
                          (index !== restaurant.days.length - 1 ? ', ' : '.')
                        );
                      }, '')
                    : ''}
                  {wrongDateModal === 'time'
                    ? `С ${
                        restaurant.days.find(
                          el =>
                            weekday[date.getDay()].toLowerCase() ===
                            el.day.toLowerCase(),
                        ).start
                      } до ${
                        restaurant.days.find(
                          el =>
                            weekday[date.getDay()].toLowerCase() ===
                            el.day.toLowerCase(),
                        ).end
                      }`
                    : ''}
                </Text>
                <View style={styles.panelButton}>
                  <MainButton
                    goTo={() => setWrongDateModal('')}
                    style={styles.panelButtonTitle}
                    textBtn={'Хорошо'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      <SimpleHeader title={'Назад'} />
      <View
        style={{
          width: '100%',
          minHeight: 0.8 * Dimensions.get('screen').height - 50,
          backgroundColor: '#000000',
          height: '100%',
          paddingHorizontal: 25,
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
              setLoading(true);
              if (
                !restaurant.days.reduce((last, next) => {
                  if (
                    weekday[date.getDay()].toLowerCase() ===
                    next.day.toLowerCase()
                  ) {
                    return true;
                  }
                  return last;
                }, false)
              ) {
                await setLoading(false);
                setWrongDateModal('day');
              } else if (
                !(
                  restaurant.days
                    .find(
                      el =>
                        weekday[date.getDay()].toLowerCase() ===
                        el.day.toLowerCase(),
                    )
                    .start.split(':')
                    .reduce(
                      (last, next, index, array) =>
                        last + next * Math.pow(60, array.length - index - 1),
                      0,
                    ) <
                    date.getHours() * 3600 +
                      date.getMinutes() * 60 +
                      date.getSeconds() &&
                  restaurant.days
                    .find(
                      el =>
                        weekday[date.getDay()].toLowerCase() ===
                        el.day.toLowerCase(),
                    )
                    .end.split(':')
                    .reduce(
                      (last, next, index, array) =>
                        last + next * Math.pow(60, array.length - index - 1),
                      0,
                    ) >
                    date.getHours() * 3600 +
                      date.getMinutes() * 60 +
                      date.getSeconds()
                )
              ) {
                await setLoading(false);
                setWrongDateModal('time');
              } else {
                await dispatch(
                  addRest([
                    {
                      restaurant_id: route.params.restId,
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
                          id: route.params.hall,
                          table_id: route.params.tableId,
                        },
                      ],
                      menus: [],
                    },
                    restaurant?.phoneNumber,
                    route.params.tableId,
                  ]),
                );
                await dispatch(Menus(route.params.restId));
                await setLoading(false);
                navigation.navigate('MenuCategoriesScreen');
              }
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
            setLoading(true);
            if (
              !restaurant.days.reduce((last, next) => {
                if (
                  weekday[date.getDay()].toLowerCase() ===
                  next.day.toLowerCase()
                ) {
                  return true;
                }
                return last;
              }, false)
            ) {
              await setLoading(false);
              setWrongDateModal('day');
            } else if (
              !(
                restaurant.days
                  .find(
                    el =>
                      weekday[date.getDay()].toLowerCase() ===
                      el.day.toLowerCase(),
                  )
                  .start.split(':')
                  .reduce(
                    (last, next, index, array) =>
                      last + next * Math.pow(60, array.length - index - 1),
                    0,
                  ) <
                  date.getHours() * 3600 +
                    date.getMinutes() * 60 +
                    date.getSeconds() &&
                restaurant.days
                  .find(
                    el =>
                      weekday[date.getDay()].toLowerCase() ===
                      el.day.toLowerCase(),
                  )
                  .end.split(':')
                  .reduce(
                    (last, next, index, array) =>
                      last + next * Math.pow(60, array.length - index - 1),
                    0,
                  ) >
                  date.getHours() * 3600 +
                    date.getMinutes() * 60 +
                    date.getSeconds()
              )
            ) {
              await setLoading(false);
              setWrongDateModal('time');
            } else {
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
                      id: route.params.hall,
                      table_id: route.params.tableId,
                    },
                  ],
                }),
              );
              await dispatch(Orders());
              await setLoading(false);
              navigation.navigate('Home');
            }
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
  panel: {
    padding: 20,
    backgroundColor: '#000',
    paddingTop: 20,
    borderRadius: 20,
  },
  panelTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  panelButton: {
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OrderTypeScreen;
