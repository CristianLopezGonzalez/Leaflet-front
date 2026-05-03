import { useState, useEffect } from "react";
import MarkerService from "../services/MarkerService";
import type { Marker } from "../services/MarkerService";

interface UseMarkersReturn {
  markers: Marker[];
  addMarker: (latitude: number, longitude: number, label?: string) => Promise<void>;
  removeMarker: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useMarkers = (): UseMarkersReturn => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar marcadores al montar el componente
  useEffect(() => {
    const loadMarkers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await MarkerService.getMyMarkers();
        setMarkers(data);
      } catch (err) {
        setError("No se pudieron cargar los marcadores");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkers();
  }, []);

  // Añadir un nuevo marcador
  const addMarker = async (latitude: number, longitude: number, label?: string) => {
    try {
      setError(null);
      const normalizedLabel = label?.trim();
      const newMarker = await MarkerService.createMarker({
        latitude,
        longitude,
        label: normalizedLabel || `Marcador ${markers.length + 1}`,
      });
      // Añade el marcador devuelto por el servidor (con su id real)
      setMarkers((prev) => [...prev, newMarker]);
    } catch (err) {
      setError("No se pudo guardar el marcador");
      console.error(err);
      throw err;
    }
  };

  // Eliminar un marcador
  const removeMarker = async (id: string) => {
    try {
      setError(null);
      // Primero intenta eliminar en el servidor necesito el id del usuario logeado
      const userId = markers.find((m) => m.id === id)?.userId;
      if (!userId) {
        throw new Error("Marcador no encontrado");
      }
      const markerToDelete = markers.find((m) => m.id === id);
      if (!markerToDelete) {
        throw new Error("Marcador no encontrado");
      }

      await MarkerService.deleteMarker(userId, markerToDelete.id);
      // Si la petición es exitosa, actualiza el estado local
      setMarkers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError("No se pudo eliminar el marcador");
      console.error(err);
      throw err;
    }
  };

  return {
    markers,
    addMarker,
    removeMarker,
    isLoading,
    error,
  };
};