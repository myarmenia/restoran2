import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View } from "react-native";
import {useEffect, useState} from "react";
import Geolocation from 'react-native-geolocation-service';

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
    useEffect(() => {
//        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                  console.log(position);
                  setInitCoords(position.coords)
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
//          }
      }, [])
  return (
    <View style={styles.container}>
         <MapView
           provider={PROVIDER_GOOGLE}
           style={styles.map}
           showsUserLocation={true}
           showsMyLocationButton={true}
           initialRegion={{
             latitude: initCoords?.latitude || 40.1791482,
             longitude: initCoords?.longitude || 44.5177428,
             latitudeDelta: 0.015,
             longitudeDelta: 0.0121,
           }}
         >
            <Marker title='Hello' description="It's me" coordinate={{ latitude: 40.6791482, longitude: 44.5177428}}/>
            <Marker title='Hello' description="It's me" coordinate={{ latitude: 40.1791482, longitude: 45.0177428}}/>
            <Marker title='Hello' description="It's me" coordinate={{ latitude: 40.6791482, longitude: 45.0177428}}/>
            <Marker title='Hello' description="It's me" coordinate={{ latitude: 40.1791482, longitude: 44.5177428}}/>
         </MapView>
       </View>
  );
};


export default MapScreen;
