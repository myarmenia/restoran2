import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarSvg from '../../../assets/svg/calendar';
import ClockSvg from '../../../assets/svg/Clock';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({mode, setDate, date, openModal, setOpenModal}) => {
  function showDatePicker() {
    setOpenModal(true);
  }

  function onDateSelected(event, value) {
    setOpenModal(false);
    setDate(value);
  }

  return (
    <View style={styleSheet.MainContainer}>
      {openModal ? (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 200,
          }}>
          <View
            style={{
              margin: 30,
              zIndex: 300,
            }}>
            <DateTimePicker
              value={date}
              mode={mode}
              display={
                Platform.OS === 'ios'
                  ? mode === 'date'
                    ? 'inline'
                    : 'spinner'
                  : 'default'
              }
              is24Hour={true}
              onChange={onDateSelected}
              onCancel={() => setOpenModal(false)}
              themeVariant={'dark'}
              textColor={'white'}
              accentColor={'grey'}
              negativeButtonLabel={'Отменить'}
              positiveButtonLabel={'Выбрать'}
              locale="ru-RU"
              minimumDate={new Date()}
              animation={true}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity onPress={showDatePicker} style={styleSheet.container}>
        {mode === 'date' ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalendarSvg />
            <Text style={styleSheet.text}>
              {`0${date.getDate()}`.slice(-2)}.
              {`0${date.getMonth() + 1}`.slice(-2)}.{date.getFullYear()}
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ClockSvg />
            <Text style={styleSheet.text}>
              {`0${date.getHours()}`.slice(-2)}:
              {`0${date.getMinutes()}`.slice(-2)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  container: {
    padding: 15,
    backgroundColor: '#202124',
    borderRadius: 45,
  },

  text: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
    marginLeft: 20,
  },

  datePicker: {
    position: 'absolute',
    width: '100%',
    zIndex: 200,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default DatePicker;
