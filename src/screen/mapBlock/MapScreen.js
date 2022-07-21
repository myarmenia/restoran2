import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  Dimensions,
  Keyboard,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import SearchHeader from '../../components/headers/SearchHeader';
import {useDispatch, useSelector} from 'react-redux';
import {Restaurants} from '../../store/reducers/restaurant/action';
import SearchComponent from '../../components/searchComponent';
import {DismissKeyboard} from '../../components/UI/DismissKeyboard';

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
  const mapRef = useRef();
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
  }

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
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
        console.log(error.message);
      },
    );
  };

  return (
    <View style={styles.container}>
      {geoAuth ? (
        <TouchableOpacity
          onPress={() => {
            getCurrentPosition();
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
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            color={'grey'}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsMyLocationButton={false}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: initCoords?.latitude || 40.1791482,
          longitude: initCoords?.longitude || 44.5177428,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {restaurants?.map((el, ind) => (
          <Marker
            key={ind}
            title={el?.name}
            description={el?.address}
            coordinate={{latitude: +el?.latit, longitude: +el?.longit}}
            onCalloutPress={async () => {
              await dispatch(Restaurants(el?.id));
              navigation.navigate('RestTitle');
            }}
          />
        ))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 100,
          width: 0.9 * Dimensions.get('screen').width,
        }}>
        <SearchComponent data={restaurants} navigation={navigation} />
      </View>
    </View>
  );
};

export default MapScreen;
