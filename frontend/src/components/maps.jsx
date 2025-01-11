import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import fireIcon from '../images/hazardous.png'; 
import Earthquakeicon from '../images/earthquake.png'; 

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 28.3949,
  lng: 84.1240,
};

const nepalBorder = [
  { lat: 30.4227, lng: 80.0586 },
  { lat: 30.4227, lng: 88.2015 },
  { lat: 26.347, lng: 88.2015 },
  { lat: 26.347, lng: 80.0586 },
  { lat: 30.4227, lng: 80.0586 },
];

const MapComponent = () => {
  const mapRef = useRef(null);
  const [disasters, setDisasters] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    nepalBorder.forEach((point) => bounds.extend(point));

    // Adjust map to fit Nepal's boundaries
    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    // Fetch disaster data from Django API endpoint
    axios.get('http://localhost:8000/disasters/')
      .then(response => {
        console.log(response.data); // Log the response to check the structure
        setDisasters(response.data);
      })
      .catch(error => {
        console.error('Error fetching disaster data:', error);
      });
  }, []);

  // Format the date for display
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Customize this format as needed
  };

  // Filter disasters within Nepal's approximate latitude/longitude range
  const filteredDisasters = disasters.filter(disaster =>
    disaster.latitude >= 26 && disaster.latitude <= 31 &&
    disaster.longitude >= 80 && disaster.longitude <= 89
  );

  // Log the filtered disasters to check if they are within Nepal's boundaries
  filteredDisasters.forEach((disaster) => {
    console.log(`Disaster ID: ${disaster.id}, Latitude: ${disaster.latitude}, Longitude: ${disaster.longitude}`);
  });

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {filteredDisasters.map((disaster) => {
          // Determine marker color based on disaster type
          const iconUrl =
            disaster.disaster_type === 'Fire'
              ? {
                  url: fireIcon, // Path to the fire icon
                  scaledSize: new window.google.maps.Size(20, 20), // Adjust the size of the fire icon
                  origin: new window.google.maps.Point(0, 0), // Icon's origin
                  anchor: new window.google.maps.Point(15, 15), // Anchor point for the icon
                }
              : {
                url: Earthquakeicon, // Path to the fire icon
                scaledSize: new window.google.maps.Size(15, 15), // Adjust the size of the icon
                origin: new window.google.maps.Point(0, 0), // Icon's origin
                anchor: new window.google.maps.Point(15, 15), // Anchor point for the icon
              }; // Blue marker for earthquakes

          return (
            <Marker
              key={disaster.id}
              position={{ lat: disaster.latitude, lng: disaster.longitude }}
              icon={iconUrl}
              onClick={() => setActiveMarker(disaster.id)}
            >
              {activeMarker === disaster.id && (
                <InfoWindow
                  position={{ lat: disaster.latitude, lng: disaster.longitude }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>
                    <strong>{disaster.disaster_type}</strong><br />
                    Magnitude: {disaster.magnitude || 'N/A'}<br />
                    Date: {formatDate(disaster.date_occurred)}<br />
                    Location: {disaster.latitude}, {disaster.longitude}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
