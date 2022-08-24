import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, StyleSheet, View, Text, Platform} from 'react-native';
import BackArrowSvg from '../../assets/svg/header/BackArrowSvg';

const SimpleHeader = ({title, right}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <BackArrowSvg />
          <Text
            style={{
              fontSize: 16,
              color: '#646464',
              textAlign: 'center',
              marginLeft: 10,
            }}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#17181B', width: '100%', height: 1.5}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 70 : 60,
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
    backgroundColor: '#000000',
    flexDirection: 'row',
    borderBottomColor: '#17181B',
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
  },
  back: {
    backgroundColor: '#000000',
  },
});

export default memo(SimpleHeader);
