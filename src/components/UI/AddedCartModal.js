import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import CloseSvg from '../../assets/svg/CloseSvg';

const AddedCartModal = ({setOpenModal, dishName}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 40,
          backgroundColor: '#17181B',
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    zIndex: 100,
  },
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
