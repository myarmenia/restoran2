import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import {useSelector} from 'react-redux';
import SimpleHeader from '../../components/headers/SimpleHeader';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarSvg from '../../assets/svg/calendar';
import ClockSvg from '../../assets/svg/Clock';
import Counter from '../../components/UI/counter/Counter';

const BookScreen = ({item}) => {
  const {restaurants} = useSelector(state => state.home);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, value) => {
    setDate(value);
    setShowDate(false);
  };
  const onChangeTime = (event, value) => {
    setTime(value);
    setShowTime(false);
  };
  return (
    <View style={styles.container}>
      <SimpleHeader title={'назад'} />
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 18,
          marginTop: 30,
          marginLeft: 30,
        }}>
        Дата
      </Text>
      <TouchableOpacity
        onPress={() => setShowDate(true)}
        style={[pickerStyles.inputContainerStyle, {width: '60%'}]}>
        <CalendarSvg />
        {date && (
          <Text style={pickerStyles.textStyle}>
            {`0${date.getDate()}`.slice(-2) +
              '.' +
              `0${date.getMonth()}`.slice(-2) +
              '.' +
              date.getFullYear()}
          </Text>
        )}
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={typeof date !== 'string' ? date : new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          style={{backgroundColor: 'white'}}
        />
      )}
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 18,
          marginTop: 30,
          marginLeft: 30,
        }}>
        Время
      </Text>
      <TouchableOpacity
        onPress={() => setShowTime(true)}
        style={[pickerStyles.inputContainerStyle, {width: '34%'}]}>
        <ClockSvg />
        {time && (
          <Text style={pickerStyles.textStyle}>
            {`0${time.getHours()}`.slice(-2)}:
            {`0${time.getMinutes()}`.slice(-2)}
          </Text>
        )}
      </TouchableOpacity>
      {showTime && (
        <DateTimePicker
          value={time}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
          style={{backgroundColor: 'white'}}
        />
      )}
      <View>
        <Counter />
      </View>
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#202124',
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#5F6368',
    paddingLeft: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height,
  },
  header: {
    flexDirection: 'row',
  },
  categories: {
    fontSize: 20,
    color: '#5F6368',
  },
  address: {
    fontSize: 16,
    color: '#5F6368',
    paddingLeft: 3,
    flexShrink: 1,
  },
});

export default BookScreen;
