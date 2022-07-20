import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoveChecktedSvg from '../../assets/svg/LoveChecktedSvg';


const LoveCheckComponent = ({state}) => {
  return (
    <View>        
           <LoveChecktedSvg/>            
                </View>
    );
};

const styles = StyleSheet.create({
  img: {
    marginBottom: 10,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
});

export default LoveCheckComponent;
