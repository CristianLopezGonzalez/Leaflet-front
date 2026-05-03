import React from "react";

interface MarkerModalProps {
  isOpen: boolean;
  markerName: string;
  isSaving: boolean;
  onNameChange: (name: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
}

export const MarkerModal = ({
  isOpen,
  markerName,
  isSaving,
  onNameChange,
  onClose,
  onSubmit,
}: MarkerModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(event);
  };

  return (
    <div
      className="marker-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <form
        className="marker-modal"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
      >
        <h3>Nuevo marcador</h3>
        <p>Escribe un nombre para guardar este punto.</p>

        <label htmlFor="marker-name">Nombre</label>
        <input
          id="marker-name"
          type="text"
          value={markerName}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Marcador 1"
          autoComplete="off"
          maxLength={60}
          autoFocus
          disabled={isSaving}
        />

        <div className="marker-modal__actions">
          <button
            type="button"
            className="marker-modal__button marker-modal__button--secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="marker-modal__button marker-modal__button--primary"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar marcador"}
          </button>
        </div>
      </form>
    </div>
  );
};