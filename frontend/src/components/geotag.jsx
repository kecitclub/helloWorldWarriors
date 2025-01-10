// GeoTaggingMap.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const GeoTaggingMap = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser.',
      });
    }
  }, []);

  return (
    <div>
      <h1>Geotagging Information</h1>
      {location.error ? (
        <p>Error: {location.error}</p>
      ) : location.latitude && location.longitude ? (
        <div>
          <p>
            Latitude: {location.latitude} <br />
            Longitude: {location.longitude}
          </p>
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                <strong>Location</strong>
                <br />
                Latitude: {location.latitude} <br />
                Longitude: {location.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default GeoTaggingMap;
