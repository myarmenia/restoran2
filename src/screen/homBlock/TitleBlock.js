import React, {useRef} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import MapMarkerSvg from '../../assets/svg/homeScreen/MapMarkerSvg';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchComponent from '../../components/searchComponent';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';

const TitleBlock = ({navigation}) => {
  const {restaurants, restaurant} = useSelector(state => state.restaurant);
  console.log(restaurant);
  return (
    <View
      style={{
        backgroundColor: '#000',
        minHeight: Dimensions.get('screen').height,
        height: '100%',
        flex: 1,
      }}>
      <View
        style={{
          marginBottom: 20,
        }}>
        <SearchComponent data={restaurants} navigation={navigation} />
      </View>
      <DismissKeyboard>
        <View style={{padding: 25, marginTop: 60}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={
                restaurant?.images[0]?.path
                  ? {
                      uri: `https://back.tap-table.ru/get_file?path=/${restaurant?.images[0]?.path}`,
                    }
                  : require('../../assets/img/home/restaurants/1.png')
              }
            />
            <View style={{paddingLeft: 20, flex: 3}}>
              <Text style={styles.name}>{restaurant?.name}</Text>
              <Text style={styles.categories}>{restaurant?.desc}</Text>
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
                  }}>
                  <MapMarkerSvg />
                  <Text style={styles.address}>{restaurant?.address}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 20}}>
            Выбрать посадочное место
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {restaurant?.floor_planes &&
              restaurant?.floor_planes?.data_json &&
              restaurant?.floor_planes?.data_json?.length &&
              (typeof restaurant?.floor_planes?.data_json === 'string'
                ? JSON.parse(restaurant?.floor_planes?.data_json)
                : restaurant?.floor_planes?.data_json
              )?.map((el, ind) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log('Hiiiii');
                    navigation.navigate('OrderTypeScreen', {
                      restId: restaurant?.id,
                      tableId: ind,
                    });
                  }}
                  key={ind}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 20,
                      padding: 10,
                      margin: 10,
                      backgroundColor: '#ddd',
                      borderRadius: 15,
                    }}
                    key={ind}>
                    {ind + 1}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </DismissKeyboard>
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
  },
  name: {
    color: '#fff',
    fontSize: 20,
  },
  img: {
    flex: 2,
  },
});

export default TitleBlock;
