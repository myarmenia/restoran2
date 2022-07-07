import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import AddSvg from '../../assets/svg/AddSvg';
import OrderHistory from '../../components/OrderHistory';
import SimpleHeader from '../../components/headers/SimpleHeader';

const OrderHistoryScreen = () => {
  const {restaurants} = useSelector(state => state.home);

  return (
    <View>
      <LinearGradient colors={['black', 'black']}>
        <SimpleHeader title={'История заказов'} />
        <View style={styles.line} />
        <OrderHistory />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
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
