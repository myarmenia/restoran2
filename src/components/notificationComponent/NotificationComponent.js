import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CloseSvg from '../../assets/svg/CloseSvg';

const NotificationComponent = ({notification, setNotification}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: 0.3 * Dimensions.get('screen').height,
          marginHorizontal: 40,
        }}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => {
              setNotification(null);
            }}
            style={styles.close}>
            <CloseSvg />
          </TouchableOpacity>
          <Text style={styles.text}>{notification?.data?.cause?.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 25,
              marginBottom: 33,
              justifyContent: 'space-between',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: 'rgba(0,0,0,0.4)',
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

export default NotificationComponent;
