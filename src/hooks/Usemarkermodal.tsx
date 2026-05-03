import { useState } from "react";

export interface PendingMarker {
  latitude: number;
  longitude: number;
}

interface UseMarkerModalReturn {
  pendingMarker: PendingMarker | null;
  markerName: string;
  isSaving: boolean;
  openModal: (latitude: number, longitude: number, defaultName?: string) => void;
  closeModal: () => void;
  setMarkerName: (name: string) => void;
  submitMarker: (onSubmit: (marker: PendingMarker, name: string) => Promise<void>) => Promise<void>;
}

export const useMarkerModal = (totalMarkers: number = 0): UseMarkerModalReturn => {
  const [pendingMarker, setPendingMarker] = useState<PendingMarker | null>(null);
  const [markerName, setMarkerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openModal = (latitude: number, longitude: number, defaultName?: string) => {
    setPendingMarker({ latitude, longitude });
    setMarkerName(defaultName || `Marcador ${totalMarkers + 1}`);
  };

  const closeModal = () => {
    if (isSaving) return;

    setPendingMarker(null);
    setMarkerName("");
  };

  const submitMarker = async (
    onSubmit: (marker: PendingMarker, name: string) => Promise<void>
  ) => {
    if (!pendingMarker) return;

    setIsSaving(true);
    try {
      await onSubmit(pendingMarker, markerName);
      closeModal();
    } finally {
      setIsSaving(false);
    }
  };

  return {
    pendingMarker,
    markerName,
    isSaving,
    openModal,
    closeModal,
    setMarkerName,
    submitMarker,
  };
};