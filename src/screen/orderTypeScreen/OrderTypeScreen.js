import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FeedBackSvg from '../../assets/svg/FeedBackSvg';
import {axiosInstance} from '../../request';
// import CustomDataPicker from '../../components/UI/customDataPicker/CustomDataPicker';

const OrderTypeScreen = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 750,
        backgroundColor: '#000000',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 25,
        }}>
        <View style={{marginRight: 10, marginTop: 3}}>
          <FeedBackSvg />
        </View>
        <Text style={{fontSize: 16, color: '#5F6368'}}>назад</Text>
      </View>

      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#17181B',
          marginTop: 20,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          color: '#FFFFFF',
          marginTop: 20,
          marginHorizontal: 25,
        }}>
        Дата
      </Text>
      {/* <View style={{marginTop: 13}}>
        <CustomDataPicker />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderTypeScreen;
