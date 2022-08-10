import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CloseSvg from '../../assets/svg/CloseSvg';

const AddedCartModal = ({setOpenModal, dishName}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginHorizontal: 40,
        position: 'absolute',
        top: '40%',
        backgroundColor: '#17181B',
        zIndex: 100,
        transform: [{translateY: -50}],
      }}>
      <View style={styles.modal}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            setOpenModal(false);
          }}>
          <CloseSvg />
        </TouchableOpacity>
        <Text style={styles.text}>
          "{dishName}" успешно добавлено в корзину
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#17181B',
    width: '100%',
    elevation: 10,
    borderRadius: 10,
  },
  close: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 80,
    textAlign: 'center',
    marginTop: 33,
    marginBottom: 50,
  },
});

export default AddedCartModal;
