import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SimpleHeader from '../../components/headers/SimpleHeader';
import PreferencesComp from '../../components/UI/Preferences';
import {useSelector} from 'react-redux';

const PreferencesScreen = () => {
  const {restaurants} = useSelector(state => state.home);

  return (
    <View style={styles.container}>
      <SimpleHeader title={'Предпочтения'} />
      <PreferencesComp />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 10,
  },
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
  },
});

export default PreferencesScreen;
