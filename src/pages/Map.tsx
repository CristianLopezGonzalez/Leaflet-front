import { MapContainer, Marker as LeafletMarker, TileLayer } from "react-leaflet";
import { useMarkers } from "../hooks/UseMarkers"; 
import { MapClickHandler } from "../hooks/Mapclickhandler";
import { MarkerLayer } from "../components/Markerlayer";
import { MarkerList } from "../components/Markerlist";
import "../utils/Mappage.css";

export const MapPage = () => {
  const { markers, addMarker, removeMarker, isLoading, error } = useMarkers();  // ← Llama el hook con minúscula

  return (
    <div className="map-page">
      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={13}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapClickHandler onMarkerAdd={addMarker} />

        <MarkerLayer markers={markers} />
      </MapContainer>

      <MarkerList
        markers={markers}
        onRemove={removeMarker}
        isLoading={isLoading}
      />

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default MapPage;