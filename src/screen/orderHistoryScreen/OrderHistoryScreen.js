import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import OrderHistory from '../../components/OrderHistory';
import SimpleHeader from '../../components/headers/SimpleHeader';

const OrderHistoryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SimpleHeader title={'История заказов'} />
      <View style={styles.line} />
      <OrderHistory navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    height: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  line: {
    backgroundColor: '#17181B',
    width: '100%',
    height: 1.5,
    marginBottom: 8,
  },

  header: {
    height: 70,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#17181B',
  },
  add: {
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#17181B',
    marginBottom: 5,
  },
});

export default OrderHistoryScreen;
