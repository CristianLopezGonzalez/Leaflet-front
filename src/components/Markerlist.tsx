import { useMarkerSearch } from "../hooks/Usemarkersearch";
import type { Marker } from "../services/MarkerService";
import "../utils/Markerlist.css";

interface MarkerListProps {
  markers: Marker[];
  onRemove: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const MarkerList = ({
  markers,
  onRemove,
  isLoading,
}: MarkerListProps) => {
  const { searchTerm, setSearchTerm, filteredMarkers } =
    useMarkerSearch(markers);

  const handleDelete = async (id: string) => {
    try {
      await onRemove(id);
    } catch (error) {
      console.error("Error al eliminar marcador:", error);
    }
  };

  return (
    <div className="marker-list-panel">
      <h3>Marcadores ({markers.length})</h3>

      {/* Search Input */}
      <div className="marker-search">
        <input
          type="text"
          placeholder="Buscar marcador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="marker-search__input"
          disabled={isLoading || markers.length === 0}
        />
        {searchTerm && (
          <button
            className="marker-search__clear"
            onClick={() => setSearchTerm("")}
            title="Limpiar búsqueda"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* List or Empty State */}
      {markers.length === 0 ? (
        <p className="empty-state">Haz clic en el mapa para añadir marcadores</p>
      ) : filteredMarkers.length === 0 ? (
        <p className="empty-state">
          No hay marcadores que coincidan con "{searchTerm}"
        </p>
      ) : (
        <ul className="marker-list">
          {filteredMarkers.map((marker) => (
            <li key={marker.id} className="marker-item">
              <div className="marker-info">
                <p className="marker-label">{marker.label || "Marcador"}</p>
                <p className="marker-coords">
                  {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
                </p>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDelete(marker.id)}
                disabled={isLoading}
                title="Eliminar marcador"
                aria-label={`Eliminar marcador ${marker.label}`}
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