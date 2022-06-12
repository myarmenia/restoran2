import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';


const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('welcome');
    }, 500);
  }, [navigation]);

  return (
    <View>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

export default SplashScreen;
