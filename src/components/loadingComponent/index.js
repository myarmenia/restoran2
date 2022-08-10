import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    zIndex: 100,
  },
});

export default LoadingComponent;
