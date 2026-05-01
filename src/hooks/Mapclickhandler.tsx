import { useMapEvents } from "react-leaflet";

interface MapClickHandlerProps {
  onMarkerAdd: (lat: number, lng: number) => Promise<void>;
}

export const MapClickHandler = ({ onMarkerAdd }: MapClickHandlerProps) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        await onMarkerAdd(lat, lng);
      } catch (error) {
        console.error("No se pudo añadir marcador:", error);
      }
    },
  });

  return null;
};