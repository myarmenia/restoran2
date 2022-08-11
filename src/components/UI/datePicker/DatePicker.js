import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CalendarSvg from '../../../assets/svg/calendar';
import ClockSvg from '../../../assets/svg/Clock';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({mode, setDate, date, openModal, setOpenModal}) => {
  function showDatePicker() {
    setOpenModal(true);
  }

  function onDateSelected(value) {
    setOpenModal(false);
    setDate(prev => {
      const next = new Date(prev);
      if (mode === 'date') {
        next.setFullYear(+value.getFullYear());
        next.setMonth(+value.getMonth());
        next.setDate(+value.getDate());
      } else {
        next.setHours(+value.getHours());
        next.setMinutes(+value.getMinutes());
      }
      return next;
    });
  }

  return (
    <View style={styleSheet.MainContainer}>
      <DateTimePickerModal
        isVisible={openModal}
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
        onConfirm={onDateSelected}
        onCancel={() => setOpenModal(false)}
        themeVariant={'dark'}
        textColor={'white'}
        accentColor={'grey'}
        pickerContainerStyleIOS={{backgroundColor: 'black'}}
        negativeButtonLabel={'Отменить'}
        positiveButtonLabel={'Выбрать'}
        cancelTextIOS={'Отменить'}
        confirmTextIOS={'Выбрать'}
        locale="ru-RU"
        minimumDate={new Date()}
        animation={true}
      />
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
