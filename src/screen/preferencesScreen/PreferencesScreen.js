import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import SimpleHeader from '../../components/headers/SimpleHeader';
import PreferencesComp from '../../components/UI/Preferences';

const PreferencesScreen = () => {
  return (
    <View style={styles.container}>
      <SimpleHeader title={'Предпочтения'} />
      <PreferencesComp />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height - 100,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
});

export default PreferencesScreen;
