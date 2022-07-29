import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapMarkerSvg from '../../assets/svg/homeScreen/MapMarkerSvg';
import {useSelector} from 'react-redux';
import {TouchableOpacity as GestureTouchableOpacity} from 'react-native-gesture-handler';
import SearchComponent from '../../components/searchComponent';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';

const TitleBlock = ({navigation}) => {
  const {restaurants, restaurant} = useSelector(state => state.restaurant);
  console.log(
    typeof restaurant.floor_planes[0].data_json === 'string'
      ? JSON.parse(restaurant.floor_planes[0].data_json)
      : restaurant.floor_planes[0].data_json,
  );
  const scaleHeight = (source, desiredWidth) => {
    let height = 1,
      width = 1;
    Image.getSize(
      source,
      (widthImg, heightImg) => {
        height = heightImg;
        width = widthImg;
      },
      error => console.error(error),
    );
    return (desiredWidth / width) * height;
  };
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
              <View
                style={{
                  paddingTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MapMarkerSvg />
                <Text style={styles.address}>{restaurant?.address}</Text>
              </View>
            </View>
          </View>
          <Text style={{color: '#FFFFFF', fontSize: 16, marginTop: 20}}>
            Выбрать посадочное место
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Image
              resizeMode="contain"
              source={{
                uri: `https://back.tap-table.ru/get_file?path=/${restaurant?.floor_planes[0]?.img}`,
                width: 0.9 * Dimensions.get('screen').width,
                height:
                  scaleHeight(
                    `https://back.tap-table.ru/get_file?path=/${restaurant?.floor_planes[0]?.img}`,
                    0.9 * Dimensions.get('screen').width,
                  ) || 100,
              }}
            />
            {restaurant?.floor_planes &&
              restaurant.floor_planes[0]?.data_json &&
              (typeof restaurant.floor_planes[0].data_json === 'string'
                ? JSON.parse(restaurant.floor_planes[0].data_json)
                : restaurant.floor_planes[0].data_json
              ).map((el, ind) =>
                Platform.OS === 'ios' ? (
                  el?.img ? (
                    <GestureTouchableOpacity
                      onPress={() => {
                        navigation.navigate('OrderTypeScreen', {
                          restId: restaurant?.id,
                          tableId: ind,
                        });
                      }}
                      style={{
                        position: 'absolute',
                        zIndex: 100,
                        top: +el?.y * 20,
                        right: +el?.x * 20,
                      }}
                      key={ind}>
                      <Image
                        resizeMode={'stretch'}
                        source={{
                          uri: `https://back.tap-table.ru/get_file?path=/public/restaurant/images-tables/${el?.img}`,
                        }}
                        style={styles.imgTable}
                      />
                      <Text style={styles.text}>{el?.quantity_chair}</Text>
                    </GestureTouchableOpacity>
                  ) : (
                    <></>
                  )
                ) : el?.img ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OrderTypeScreen', {
                        restId: restaurant?.id,
                        tableId: ind,
                        restX: +el?.x,
                        restY: +el?.y,
                      });
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: 100,
                      top: +el?.y * 20,
                      right: +el?.x * 20,
                    }}
                    key={ind}>
                    {console.log('mta')}
                    <Image
                      resizeMode={'stretch'}
                      source={{
                        uri: `https://back.tap-table.ru/get_file?path=/public/restaurant/images-tables/${el?.img}`,
                      }}
                      style={styles.imgTable}
                    />
                    <Text style={styles.text}>{el?.quantity_chair}</Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                ),
              )}
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
  imgTable: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
    color: '#6b6363',
    fontSize: 18,
  },
});

export default TitleBlock;
