import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  Dimensions,
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

const MapScreen = () => {
  const [initCoords, setInitCoords] = useState({});
  const [geoAuth, setGeoAuth] = useState(false);
  const mapRef = useRef();
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
    console.log(mapRef.current);
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
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
      <SearchHeader
        style={{
          top: 0,
          left: 0,
          width: Dimensions.get('window').width,
        }}
        placeholder={'Поиск'}
      />
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
            borderColor: '#fff',
            borderWidth: 2,
            padding: 5,
          }}>
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            color={'white'}
            size={30}
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
        <Marker
          title="Hello"
          description="It's me"
          coordinate={{latitude: 40.6791482, longitude: 44.5177428}}
        />
        <Marker
          title="Hello"
          description="It's me"
          coordinate={{latitude: 40.1791482, longitude: 45.0177428}}
        />
        <Marker
          title="Hello"
          description="It's me"
          coordinate={{latitude: 40.6791482, longitude: 45.0177428}}
        />
        <Marker
          title="Hello"
          description="It's me"
          coordinate={{latitude: 40.1791482, longitude: 44.5177428}}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
