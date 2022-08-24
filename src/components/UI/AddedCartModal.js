import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CloseSvg from '../../assets/svg/CloseSvg';

const AddedCartModal = ({setOpenModal, dishName}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 200,
          backgroundColor: 'rgba(0,0,0)',
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: 0.3 * Dimensions.get('screen').height,
            marginHorizontal: 40,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
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
