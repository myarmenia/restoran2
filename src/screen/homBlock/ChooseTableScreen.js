import React from 'react';
import {View, StyleSheet} from 'react-native';
import TitleBlock from './TitleBlock';

const ChooseTableScreen = ({navigation}) => {
  // const {item} = route.params

  return (
    <View>
      <TitleBlock navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChooseTableScreen;
