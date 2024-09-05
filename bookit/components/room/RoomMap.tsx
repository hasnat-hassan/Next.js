import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useCoordinates from "@/app/hooks/useCoordinates";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const RoomMap = ({ room }: any) => {
  const { coordinates, loading, error } = useCoordinates(room.address);

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <MapContainer
      center={
        coordinates
          ? [coordinates.latitude, coordinates.longitude]
          : [51.505, -0.09]
      }
      zoom={7}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        icon={defaultIcon}
        position={
          coordinates
            ? [coordinates?.latitude, coordinates?.longitude]
            : [51.505, -0.09]
        }
      >
        <Popup>{room.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RoomMap;
