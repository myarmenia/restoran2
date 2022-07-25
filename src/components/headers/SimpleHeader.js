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
          <View style={{marginRight: right ? right : -20}}>
            <BackArrowSvg />
          </View>
        </TouchableOpacity>
        <Text style={{fontSize: 16, color: '#646464'}}>{title}</Text>
      </View>
      <View style={{backgroundColor: '#17181B', width: '100%', height: 1.5}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#000000',
    flexDirection: 'row',
    borderBottomColor: '#17181B',
  },
  back: {
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
});

export default memo(SimpleHeader);
