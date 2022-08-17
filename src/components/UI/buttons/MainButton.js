import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainButton = ({
  textBtn,
  horizontal,
  vertical,
  width,
  background,
  goTo,
  fontSize = 20,
  disable = false,
}) => {
  return (
    <TouchableOpacity onPress={goTo} activeOpacity={0.9} disabled={disable}>
      <LinearGradient
        style={styles.btnContainer}
        marginHorizontal={horizontal ? horizontal : 0}
        paddingVertical={vertical ? vertical : 14}
        backgroundColor={background ? background : '#648E00'}
        width={width ? width : '100%'}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={disable ? ['#444E40', '#404e40'] : ['#648E00', '#005100']}>
        <Text style={[styles.text, {fontSize: fontSize}]}>{textBtn}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
  },
});

export default MainButton;
