import type { Marker } from "../services/MarkerService";
import "../utils/Markerlist.css";

interface MarkerListProps {
  markers: Marker[];
  onRemove: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const MarkerList = ({ markers, onRemove, isLoading }: MarkerListProps) => {
  return (
    <div className="marker-list-panel">
      <h3>Marcadores ({markers.length})</h3>

      {markers.length === 0 ? (
        <p className="empty-state">Haz clic en el mapa para añadir marcadores</p>
      ) : (
        <ul className="marker-list">
          {markers.map((marker) => (
            <li key={marker.id} className="marker-item">
              <div className="marker-info">
                <p className="marker-label">{marker.label || "Marcador"}</p>
                <p className="marker-coords">
                  {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
                </p>
              </div>
              <button
                className="btn-delete"
                onClick={() => onRemove(marker.id)}
                disabled={isLoading}
                title="Eliminar marcador"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};