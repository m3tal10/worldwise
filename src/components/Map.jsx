import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contextAPI/CitiesContextProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "../components/Button";
import useURLPosition from "../hooks/useURLPosition";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapLat, mapLng] = useURLPosition();
  const [mapPosition, setMapPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ]);
  const {
    position,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();
  const { cities } = useCities();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (position) setMapPosition(position);
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "loading..." : "use my position"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={position}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{city.notes}</Popup>
          </Marker>
        ))}
        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const clickCenter = e.latlng;
      navigate(`form/?lat=${clickCenter.lat}&lng=${clickCenter.lng}`);
    },
  });
}

export default Map;
