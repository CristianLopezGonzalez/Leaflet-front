import { MapContainer, TileLayer } from "react-leaflet";
import { UseMarkers } from "../hooks/UseMarkers";
import { MapClickHandler } from "../components/Mapclickhandler";
import { MarkerLayer } from "../components/Markerlayer";
import { MarkerList } from "../components/Markerlist";
import "../utils/Mappage.css";

export const MapPage = () => {
  const { markers, addMarker, removeMarker, isLoading, error } = UseMarkers();

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

        {/* Componente que escucha clics */}
        <MapClickHandler onMarkerAdd={addMarker} />

        {/* Componente que renderiza los marcadores */}
        <MarkerLayer markers={markers} />
      </MapContainer>

      {/* Panel lateral con la lista */}
      <MarkerList
        markers={markers}
        onRemove={removeMarker}
        isLoading={isLoading}
      />

      {/* Mostrar errores si los hay */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default MapPage;