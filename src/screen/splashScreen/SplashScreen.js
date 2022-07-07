import React, {useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('welcome');
    }, 500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
  },
});

export default SplashScreen;
