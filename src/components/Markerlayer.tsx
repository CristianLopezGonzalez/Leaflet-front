import { Marker, Popup } from "react-leaflet";
import type { Marker as MarkerData } from "../services/MarkerService";

interface MarkerLayerProps {
  markers: MarkerData[];
}

export const MarkerLayer = ({ markers }: MarkerLayerProps) => {
  return (
    <>
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>
                {marker.label || "Marcador"}
              </p>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
                {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};