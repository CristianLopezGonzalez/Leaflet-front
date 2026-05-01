
import api from "../services/api";

export interface Marker {
  id: string;
  userId: string;
  lat: number;
  lng: number;
  label?: string;
  createdAt?: string;
}

// Obtener todos los marcadores del usuario autenticado
const getMyMarkers = async (): Promise<Marker[]> => {
  try {
    const response = await api.get("/markers/");
    // El backend devuelve { status, message, data: [...] }
    return response.data.data || [];
  } catch (error) {
    console.error("Error al obtener marcadores:", error);
    throw error;
  }
};

// Crear un nuevo marcador
interface CreateMarkerData {
  lat: number;
  lng: number;
  label?: string;
}

const createMarker = async (markerData: CreateMarkerData): Promise<Marker> => {
  try {
    const response = await api.post("/markers/", markerData);
    // El backend devuelve { status, message, data: {...} }
    return response.data.data;
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
