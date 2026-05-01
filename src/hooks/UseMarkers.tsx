/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import MarkerService from "../services/MarkerService";
import type { Marker } from "../services/MarkerService";

interface UseMarkersReturn {
  markers: Marker[];
  addMarker: (
    latitude: number,
    longitude: number,
    label?: string,
  ) => Promise<void>;
  removeMarker: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
// Cargar marcadores al montar el componente
export const UseMarkers = (): UseMarkersReturn => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        setError("Failed to load markers.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkers();
  }, []);

  // Función para agregar un nuevo marcador
  const addMarker = async (
    latitude: number,
    longitude: number,
    label?: string,
  ) => {
    try {
      setError(null);
      const newMarker = await MarkerService.createMarker({
        lat: latitude,
        lng: longitude,
        label,
      });
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    } catch (err) {
      setError("Failed to add marker.");
      console.error(err);
      throw err;
    }
  };

  // Función para eliminar un marcador
  const removeMarker = async (id: string) => {
    try {
      setError(null);
      await MarkerService.deleteMarker(id);
      setMarkers((prevMarkers) =>
        prevMarkers.filter((marker) => marker.id !== id),
      );
    } catch (err) {
      setError("Failed to remove marker.");
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
