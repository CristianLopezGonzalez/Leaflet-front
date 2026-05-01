import api from "./api";

export interface Marker {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  lat: number;
  lng: number;
  label?: string;
  createdAt?: string;
}

type MarkerPayload = Partial<Marker> & {
  id?: string;
  userId?: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
};

const normalizeMarker = (marker: MarkerPayload): Marker => {
  const latitude = marker.latitude ?? marker.lat ?? 0;
  const longitude = marker.longitude ?? marker.lng ?? 0;

  return {
    id: marker.id ?? "",
    userId: marker.userId ?? "",
    latitude,
    longitude,
    lat: latitude,
    lng: longitude,
    label: marker.label,
    createdAt: marker.createdAt,
  };
};

// Obtener todos los marcadores del usuario autenticado
const getMyMarkers = async (): Promise<Marker[]> => {
  try {
    const response = await api.get("/markers/");
    // El backend devuelve { status, message, data: [...] }
    return (response.data.data || []).map(normalizeMarker);
  } catch (error) {
    console.error("Error al obtener marcadores:", error);
    throw error;
  }
};

// Crear un nuevo marcador
interface CreateMarkerData {
  latitude: number;
  longitude: number;
  label?: string;
}

const createMarker = async (markerData: CreateMarkerData): Promise<Marker> => {
  try {
    const response = await api.post("/markers/", markerData);
    // El backend devuelve { status, message, data: {...} }
    return normalizeMarker(response.data.data);
  } catch (error) {
    console.error("Error al crear marcador:", error);
    throw error;
  }
};

// Eliminar un marcador por ID
const deleteMarker = async (markerId: string): Promise<void> => {
  try {
    await api.delete(`/markers/${markerId}`);
    return;
  } catch (error) {
    console.error("Error al eliminar marcador:", error);
    throw error;
  }
};

export default {
  getMyMarkers,
  createMarker,
  deleteMarker,
};