import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Restaurants} from '../../store/reducers/restaurant/action';
import SearchComponent from '../../components/searchComponent';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapScreen = ({navigation}) => {
  const {restaurants} = useSelector(({restaurant}) => restaurant);
  const [initCoords, setInitCoords] = useState({});
  const [geoAuth, setGeoAuth] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    requestPermissions();
  }, []);

  async function requestPermissions() {
    let auth;
    if (Platform.OS === 'ios') {
      auth = await Geolocation.requestAuthorization('whenInUse');
    }
    if (Platform.OS === 'android') {
      auth = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    setGeoAuth(auth === 'granted');
    if (auth === 'granted') {
      getCurrentPosition();
    }
  }

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setCanShow(true);
        setInitCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        mapRef.current.animateToRegion(
          {
            latitude: initCoords?.latitude,
            longitude: initCoords?.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
          1000,
        );
      },
      error => {
        setCanShow(true);
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Не удалось получить ваше местоположение. Пожалуйста, проверьте службу определения местоположения вашего устройства!!',
            ToastAndroid.SHORT,
          );
        } else {
          AlertIOS.alert(
            'Не удалось получить ваше местоположение. Пожалуйста, проверьте службу определения местоположения вашего устройства!!',
          );
        }
        console.log(error.message);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  const needToShowMarker = (lat1, lon1) => {
    const latitude = initCoords?.latitude || 55.751244;
    const longitude = initCoords?.longitude || 37.618423;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (latitude * Math.PI) / 180;
    const Δφ = ((latitude - lat1) * Math.PI) / 180;
    const Δλ = ((longitude - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d <= 100000;
  };

  return (
    <View style={styles.container}>
      <SearchComponent data={restaurants} navigation={navigation} />
      <TouchableOpacity
        onPress={() => {
          if (geoAuth) getCurrentPosition();
          else requestPermissions();
        }}
        style={{
          position: 'absolute',
          zIndex: 1000,
          bottom: 10,
          right: 10,
          borderRadius: 45,
          backgroundColor: '#202124',
          padding: 13,
        }}>
        <FontAwesomeIcon icon={faLocationCrosshairs} color={'grey'} size={25} />
      </TouchableOpacity>
      {canShow ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsMyLocationButton={false}
          showsUserLocation={true}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: initCoords?.latitude || 55.751244,
            longitude: initCoords?.longitude || 37.618423,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {initCoords?.latitude && initCoords?.longitude ? (
            <Circle
              radius={100000}
              strokeColor="rgb(0,0,0)"
              fillColor="#rgba(0,0,0,0.5)"
              strokeWidth={5}
              key={(initCoords?.latitude + initCoords?.longitude).toString()}
              center={{
                latitude: initCoords?.latitude,
                longitude: initCoords?.longitude,
              }}
            />
          ) : (
            <></>
          )}
          {restaurants?.map((el, ind) =>
            needToShowMarker(+el?.latit, +el?.longit) ? (
              <Marker
                key={ind + +el?.latit + +el?.longit}
                title={el?.name}
                description={el?.address}
                coordinate={{latitude: +el?.latit, longitude: +el?.longit}}
                onCalloutPress={async () => {
                  await dispatch(Restaurants(el?.id));
                  navigation.navigate('RestTitle');
                }}
              />
            ) : (
              <></>
            ),
          )}
        </MapView>
      ) : (
        <></>
      )}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 100,
          width: 0.9 * Dimensions.get('screen').width,
        }}></View>
    </View>
  );
};

export default MapScreen;
