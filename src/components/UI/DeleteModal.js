import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CloseSvg from '../../assets/svg/CloseSvg';
import MainButton from './buttons/MainButton';
import {useState} from 'react';
import {initialState2} from '../UI/DishData';

const DeleteModal = ({
  setOpenModal,
  index,
  productsArray,
  setProductsArray,
}) => {
  const removeUser = () => {
    console.log('hello ', index, productsArray);
    setProductsArray(products => products.filter((_, ind) => ind !== index));
    setOpenModal(false);
  };

  return (
    <View style={{alignItems: 'center', marginHorizontal: 40}}>
      <View style={styles.modal}>
        <TouchableOpacity
          onPress={() => {
            setOpenModal(false);
          }}
          style={styles.close}>
          <CloseSvg />
        </TouchableOpacity>
        <Text style={styles.text}>
          Вы действительно хотите удалить блюдо из списока?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 25,
            marginBottom: 33,
            justifyContent: 'space-between',
          }}>
          <MainButton
            goTo={() => {
              setOpenModal(false);
            }}
            textBtn={'Отменить'}
            vertical={5}
          />

          <MainButton textBtn={'Удалить'} vertical={4} goTo={removeUser} />
        </View>
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
    marginBottom: 20,
  },
});

export default DeleteModal;
