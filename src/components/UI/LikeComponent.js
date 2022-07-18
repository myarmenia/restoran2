import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import LoveSvg from '../../assets/svg/LoveSvg';
import LoveChecktedSvg from '../../assets/svg/LoveChecktedSvg';


const LikeComponent = ({state}) => {
  const [like, setLike] = useState(true);

  return (
    <View>     
            <TouchableOpacity onPress = {() => {
            setLike((prevLike) => !prevLike)
            }}>
            {like?<LoveSvg />:<LoveChecktedSvg />}
            </TouchableOpacity>             
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

export default LikeComponent;
