
import { LatLng, LeafletView } from "react-native-leaflet-view";


const DEFAULT_COORDINATE: LatLng = {
  lat: 37.78825,
  lng: -122.4324,
};

const MapScreen = () => {
  return (
    <LeafletView
      mapMarkers={[
        {
          position: DEFAULT_COORDINATE,
          icon: "📍",
          size: [32, 32],
        },
        
      ]}
      mapCenterPosition={DEFAULT_COORDINATE}
    />
  );
};


export default MapScreen;
