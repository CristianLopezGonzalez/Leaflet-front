/* eslint-disable react-hooks/set-state-in-render */
import { useState, useMemo } from "react";
import type { Marker } from "../services/MarkerService";

interface UseMarkerSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredMarkers: Marker[];
  isSearching: boolean;
}

export const useMarkerSearch = (markers: Marker[]): UseMarkerSearchReturn => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredMarkers = useMemo(() => {
    if (!searchTerm.trim()) {
      return markers;
    }

    setIsSearching(true);
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = markers.filter((marker) => {
      const label = marker.label?.toLowerCase() || "";
      return label.includes(lowerSearch);
    });

    setIsSearching(false);
    return filtered;
  }, [searchTerm, markers]);

  return {
    searchTerm,
    setSearchTerm,
    filteredMarkers,
    isSearching,
  };
};