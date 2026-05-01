import { useNavigate } from "react-router-dom";
import authService from "../services/AuthServices";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="map-header">
      <div>
        <p className="map-header__title">Leaflet front</p>
        <p className="map-header__subtitle">Mapa y marcadores</p>
      </div>

      <button type="button" className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
}