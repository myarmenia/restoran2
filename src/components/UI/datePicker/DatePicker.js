
import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';





const DatePicker = () =>{
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    function showDatePicker() {
        setDatePicker(true);
      };
     
      function showTimePicker() {
        setTimePicker(true);
      };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(true);
  };
 
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(true);
  };
    return(
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styleSheet.MainContainer}>
   
          <Text style={styleSheet.text}>Date = {date.toDateString()}</Text>
   
          <Text style={styleSheet.text}>Time = {time.toLocaleTimeString('en-US')}</Text>
   
          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
              style={styleSheet.datePicker}
            />
          )}
   
          {timePicker && (
            <DateTimePicker
              value={time}
              mode={'time'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={onTimeSelected}
              style={styleSheet.datePicker}
            />
          )}
   
          {!datePicker && (
            <View style={{ margin: 10 }}>
              <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
            </View>
          )}
   
          {!timePicker && (
            <View style={{ margin: 10 }}>
              <Button title="Show Time Picker" color="green" onPress={showTimePicker} />
            </View>
          )}
   
        </View>
      </SafeAreaView>
    )
}

const styleSheet = StyleSheet.create({

    MainContainer: {
      flex: 1,
      padding: 46,
      alignItems: 'center',
      backgroundColor: 'silver'
    },
  
    text: {
      fontSize: 25,
      color: 'pink',
      padding: 3,
      marginBottom: 10,
      textAlign: 'center'
    },
  
    
    datePicker: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 320,
      height: 260,
      display: 'flex',
    },
  
  });
export default DatePicker;