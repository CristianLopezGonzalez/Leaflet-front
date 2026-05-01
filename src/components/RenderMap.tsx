import { MapContainer, TileLayer, LayersControl, Marker, Circle } from 'react-leaflet'

const { BaseLayer, Overlay } = LayersControl


const RenderMap = () => {
  return (
    <MapContainer center={[40.4168, -3.7038]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <LayersControl position="topright">

        {/* CAPAS BASE — solo una activa */}
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>

        <BaseLayer name="Satélite (Esri)">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </BaseLayer>

        {/* OVERLAYS — se pueden combinar */}
        <Overlay checked name="Marcadores">
          <Marker position={[40.4168, -3.7038]} />
        </Overlay>

        <Overlay name="Zona destacada">
          <Circle center={[40.42, -3.71]} radius={500} color="red" />
        </Overlay>

      </LayersControl>
    </MapContainer>
  )
}

export default RenderMap