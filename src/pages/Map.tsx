/* eslint-disable @typescript-eslint/no-unused-vars */
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMarkers } from "../hooks/UseMarkers";
import { MapClickHandler } from "../hooks/Mapclickhandler";
import { MarkerLayer } from "../components/Markerlayer";
import { MarkerList } from "../components/Markerlist";
import "../utils/Mappage.css";

const { BaseLayer } = LayersControl;

export const MapPage = () => {
  const { markers, addMarker, removeMarker, isLoading, error } = useMarkers();

  return (
    <div>

      <div className="map-page">
        <MapContainer
          center={[40.4168, -3.7038]}
          zoom={13}
          className="map-container"
        >
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>

            <BaseLayer name="Satélite (Esri)">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </BaseLayer>
          </LayersControl>
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
    </div>
  );
};

export default MapPage;
