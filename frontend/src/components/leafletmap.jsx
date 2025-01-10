import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Importing leaflet for custom marker icons if needed

const MapComponent = () => {
  // Example dataset of disaster-prone areas with latitude and longitude
  const disasterAreas = [
    { name: "Kathmandu", lat: 27.7172, lon: 85.3240, disaster: "Earthquake" },
    { name: "Sunsari", lat: 26.6129, lon: 87.2767, disaster: "Flood" },
    { name: "Sindhupalchowk", lat: 27.8415, lon: 85.7880, disaster: "Landslide" },
    { name: "Chitwan", lat: 27.6611, lon: 84.3500, disaster: "Flood" },
    // Add more areas as necessary
  ];

  return (
    <MapContainer center={[27.7172, 85.324]} zoom={7} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {disasterAreas.map((area, index) => (
        <Marker key={index} position={[area.lat, area.lon]}>
          <Popup>
            <strong>{area.name}</strong><br />
            Disaster: {area.disaster}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
