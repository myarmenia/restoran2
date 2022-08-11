import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, StyleSheet, View, Text, Platform} from 'react-native';
import BackArrowSvg from '../../assets/svg/header/BackArrowSvg';

const SimpleHeader = ({title, right}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowSvg />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: '#646464',
            textAlign: 'center',
            marginLeft: 10,
          }}>
          {title}
        </Text>
      </View>
      <View style={{backgroundColor: '#17181B', width: '100%', height: 1.5}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingVertical: 20,
    backgroundColor: '#000000',
    flexDirection: 'row',
    borderBottomColor: '#17181B',
    alignItems: 'center',
    paddingLeft: 30,
  },
  back: {
    backgroundColor: '#000000',
  },
});

export default memo(SimpleHeader);
