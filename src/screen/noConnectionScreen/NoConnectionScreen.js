import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import logoImg from '../../assets/png/logo.png';
import * as Progress from 'react-native-progress';

const NoConnectionScreen = () => {
  return (
    <View style={styles.container}>
      <Progress.Circle
        animated={true}
        size={105}
        borderWidth={5}
        color={'#BCF11D'}
        indeterminate={true}>
        <View style={styles.logo}>
          <Image source={logoImg} />
        </View>
      </Progress.Circle>
      <Text>Отсутсвует интернет подключение</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    padding: 4,
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
});

export default NoConnectionScreen;
