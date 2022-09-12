import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
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
import CloseSvg from '../../assets/svg/CloseSvg';

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
  const [openModal, setOpenModal] = useState(false);
  const [viewHeight, setViewHeight] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wrongDateModal, setWrongDateModal] = useState('');
  const dispatch = useDispatch();
  const {restaurant} = useSelector(({restaurant}) => restaurant);
  console.log('rest', restaurant);

  const validDayRequest = async withoutMenu => {
    if (withoutMenu) {
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
      setOpenModal(true);
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
  };

  const validDay = withoutMenu => {
    const workDay = restaurant.days.find(
      el => weekday[date.getDay()].toLowerCase() === el.day.toLowerCase(),
    );
    const workDayStart = workDay.start
      .split(':')
      .reduce(
        (last, next, index, array) =>
          last + next * Math.pow(60, array.length - index - 1),
        0,
      );
    const workDayEnd = workDay.end
      .split(':')
      .reduce(
        (last, next, index, array) =>
          last + next * Math.pow(60, array.length - index - 1),
        0,
      );
    const endDay = '23:59:59'
      .split(':')
      .reduce(
        (last, next, index, array) =>
          last + next * Math.pow(60, array.length - index - 1),
        0,
      );
    console.log('date ---> ', date.getHours());
    const currentDate = date.getHours() * 3600 + date.getMinutes() * 60;
    if (workDay) {
      if (workDayStart < workDayEnd) {
        console.log('mta1', workDayStart, currentDate, workDayEnd);
        if (workDayStart <= currentDate && currentDate <= workDayEnd) {
          console.log('mta2');
          validDayRequest(withoutMenu);
        } else {
          console.log('mta3');
          setWrongDateModal('time');
        }
      } else if (
        restaurant.days.find(
          el =>
            weekday[date.getDay() - 1].toLowerCase() === el.day.toLowerCase(),
        )
      ) {
        console.log('mta4', currentDate <= workDayEnd, currentDate, workDayEnd);
        if (
          (currentDate >= 0 && currentDate <= workDayEnd) ||
          (workDayStart <= currentDate && currentDate <= endDay)
        ) {
          console.log('mta5');
          validDayRequest(withoutMenu);
        } else {
          console.log('mta6');
          setWrongDateModal('time');
        }
      } else {
        console.log('mta7');
        setWrongDateModal('date');
      }
    } else if (
      restaurant.days.find(
        el => weekday[date.getDay() - 1].toLowerCase() === el.day.toLowerCase(),
      )
    ) {
      console.log('mta8');
      if (
        (currentDate >= 0 && currentDate <= workDayEnd) ||
        (workDayStart <= currentDate && currentDate <= endDay)
      ) {
        console.log('mta9');
        validDayRequest(withoutMenu);
      } else {
        console.log('mta10');
        setWrongDateModal('time');
      }
    } else {
      console.log('mta11');
      setWrongDateModal('date');
    }
    setLoading(false);
  };

  const componentData = () => {
    return (
      <>
        {loading ? <LoadingComponent /> : <></>}
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
                borderRadius: 30,
              }}>
              <View style={styles.modal}>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => {
                    setOpenModal(false);
                    navigation.navigate('Home');
                  }}>
                  <CloseSvg />
                </TouchableOpacity>
                <Text style={styles.textModal}>Ваш заказ в обработке</Text>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
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
                {console.log('date', date)}
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
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            setViewHeight(height);
          }}
          style={{
            paddingHorizontal: 25,
            justifyContent: 'space-between',
            height: '80%',
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
                <Text
                  style={{color: '#5F6368', fontSize: 16, fontWeight: '700'}}>
                  -
                </Text>
              </TouchableOpacity>
              <View style={{padding: 15, backgroundColor: '#17181B'}}>
                <Text
                  style={{color: '#5F6368', fontSize: 16, fontWeight: '700'}}>
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
                <Text
                  style={{color: '#5F6368', fontSize: 16, fontWeight: '700'}}>
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
                await validDay(false);
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
<<<<<<< HEAD
              await validDay(true);
=======
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
                    .reduce((last, next, index, array) => {
                      if (index === 0 && restaurant.days
                        .find(
                          el =>
                            weekday[date.getDay()].toLowerCase() ===
                            el.day.toLowerCase(),
                        ).start.split(':')[0][index] > next) 
                        return (
                          last + (24 + next) * Math.pow(60, array.length - index - 1)
                        );
                      return (
                        last + next * Math.pow(60, array.length - index - 1)
                      );
                    }, 0) >
                    date.getHours() * 3600 +
                      date.getMinutes() * 60 +
                      date.getSeconds()
                )
              ) {
                console.log(
                  'oh noooo',
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
                    ),
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
                    ),
                  date.getHours() * 3600 +
                    date.getMinutes() * 60 +
                    date.getSeconds(),
                );
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
                setOpenModal(true);
              }
>>>>>>> d7eb35e752f95a0955e30c5e1888181b76eea0c5
            }}
          />
        </View>
      </>
    );
  };

  return viewHeight < Dimensions.get('screen').height ? (
    <View
      style={{
        minHeight: 0.8 * Dimensions.get('screen').height - 100,
        backgroundColor: '#000000',
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
        height: '100%',
      }}>
      {componentData()}
    </View>
  ) : (
    <ScrollView style={{paddingTop: Platform.OS === 'ios' ? 30 : 0}}>
      {componentData()}
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
  modal: {
    marginHorizontal: 20,
  },
  close: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  textModal: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 33,
    marginBottom: 40,
  },
});

export default OrderTypeScreen;
