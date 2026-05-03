import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMarkers } from "../hooks/UseMarkers";
import { useMarkerModal } from "../hooks/Usemarkermodal";
import { MapClickHandler } from "../hooks/Mapclickhandler";
import { MarkerLayer } from "../components/Markerlayer";
import { MarkerList } from "../components/Markerlist";
import { MarkerModal } from "../components/Markermodal";
import Header from "../components/Header";
import "../utils/Mappage.css";

const { BaseLayer } = LayersControl;

export const MapPage = () => {
  const { markers, addMarker, removeMarker, isLoading, error } = useMarkers();
  const { pendingMarker, markerName, isSaving, openModal, closeModal, setMarkerName, submitMarker } =
    useMarkerModal(markers.length);

  const handleMapClick = (latitude: number, longitude: number) => {
    openModal(latitude, longitude);
  };

  const handleModalSubmit = async () => {
    await submitMarker(async (marker, name) => {
      await addMarker(marker.latitude, marker.longitude, name);
    });
  };

  return (
    <div className="map-page">
      <Header />

      <MapContainer center={[40.4168, -3.7038]} zoom={13} className="map-container">
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="Satélite (Esri)">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </BaseLayer>
        </LayersControl>

        <MapClickHandler onMapClick={handleMapClick} />
        <MarkerLayer markers={markers} />
      </MapContainer>

      <MarkerList markers={markers} onRemove={removeMarker} isLoading={isLoading} />

      <MarkerModal
        isOpen={!!pendingMarker}
        markerName={markerName}
        isSaving={isSaving}
        onNameChange={setMarkerName}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
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