import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CalendarSvg from '../../../assets/svg/calendar';
import ClockSvg from '../../../assets/svg/Clock';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComp = ({mode, setDate, date, openModal, setOpenModal}) => {
  function showDatePicker() {
    setOpenModal(true);
  }

  function onDateSelected(value) {
    setOpenModal(false);
    setDate(prev => {
      const next = new Date(prev);
      console.log(prev, new Date(value.nativeEvent.timestamp));
      if (Platform.OS === 'ios') {
        if (mode === 'date') {
          next.setFullYear(+value.getFullYear());
          next.setMonth(+value.getMonth());
          next.setDate(+value.getDate());
        } else {
          next.setHours(+value.getHours());
          next.setMinutes(+value.getMinutes());
        }
        return next;
      } else if (Platform.OS === 'android') {
        if (value.type !== 'dismissed') {
          return new Date(value.nativeEvent.timestamp);
        } else {
          console.log(prev);
          return prev;
        }
      }
    });
  }

  return (
    <View style={styleSheet.MainContainer}>
      {Platform.OS === 'ios' ? (
        <DatePicker
          modal
          androidVariant={'iosClone'}
          is24hourSource="locale"
          open={Boolean(openModal)}
          date={date}
          mode={mode}
          onConfirm={onDateSelected}
          onCancel={() => {
            setOpenModal(false);
          }}
          minimumDate={new Date()}
          locale="ru-RU"
          textColor={'white'}
          theme={'dark'}
          cancelText={'Отменить'}
          confirmText={'Выбрать'}
          title={mode === 'date' ? 'Выберите Дату' : 'Выберите Время'}
        />
      ) : (
        openModal && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onDateSelected}
            minimumDate={new Date()}
          />
        )
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
export default DatePickerComp;
