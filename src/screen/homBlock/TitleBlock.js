import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import MapMarkerSvg from '../../assets/svg/homeScreen/MapMarkerSvg';
import {useSelector} from 'react-redux';
import SearchHeader from '../../components/headers/SearchHeader';

const TitleBlock = () => {
  const {restaurant} = useSelector(state => state.restaurant);
  console.log(restaurant);
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#000',
        minHeight: Dimensions.get('screen').height,
        height: '100%',
      }}>
      <View
        style={{
          marginBottom: 20,
        }}>
        <SearchHeader placeholder={'Поиск'} />
      </View>
      <View style={{padding: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={
              restaurant[0]?.main_image ||
              require('../../assets/img/home/restaurants/1.png')
            }
          />
          <View style={{paddingLeft: 20}}>
            <Text style={styles.name}>{restaurant[0]?.name}</Text>
            <Text style={styles.categories}>{restaurant[0]?.desc}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  paddingTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <MapMarkerSvg />
                <Text style={styles.address}>{restaurant[0]?.address}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 20}}>
          Выбрать посадочное место
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  categories: {
    fontSize: 16,
    lineHeight: 19,
    color: '#5F6368',
    paddingBottom: 20,
  },
  address: {
    fontSize: 12,
    color: '#5F6368',
    paddingLeft: 3,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  name: {
    color: '#fff',
    fontSize: 20,
  },
});

export default TitleBlock;
