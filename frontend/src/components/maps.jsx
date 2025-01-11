// import React, { useCallback, useRef } from 'react';
// import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

// // Google Maps API Key (replace with your environment variable setup)
// const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// const containerStyle = {
//   width: '100%',
//   height: '500px',
// };

// // Center of Nepal (fallback if bounds aren't applied)
// const center = {
//   lat: 28.3949,
//   lng: 84.1240,
// };

// // Detailed Nepal border coordinates (replace with GeoJSON data for accuracy)
// const nepalBorder = [
//   { lat: 30.4227, lng: 80.0586 }, // Northwest
//   { lat: 30.4227, lng: 88.2015 }, // Northeast
//   { lat: 26.347, lng: 88.2015 },  // Southeast
//   { lat: 26.347, lng: 80.0586 },  // Southwest
//   { lat: 30.4227, lng: 80.0586 }, // Back to start
// ];

// const MapComponent = () => {
//   const mapRef = useRef(null);

//   const onLoad = useCallback((map) => {
//     mapRef.current = map;

//     // Define bounds for Nepal
//     const bounds = new window.google.maps.LatLngBounds();
//     nepalBorder.forEach((point) => bounds.extend(point));

//     // Adjust map to fit Nepal's boundaries
//     map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
//   }, []);

//   const onUnmount = useCallback(() => {
//     mapRef.current = null;
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={7} // Initial zoom (overridden by fitBounds)
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         options={{

//           mapTypeControl: false,
//           streetViewControl: false,
//         }}
//       >
//         {/* Highlight Nepal's Border */}
//         <Polygon
//           path={nepalBorder}
//           options={{
//             fillColor: '#ADD8E6',
//             fillOpacity: 0.3,
//             strokeColor: '#0000FF',
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//           }}
//         />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';


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

    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/disasters/')
      .then(response => {
        setDisasters(response.data);
      })
      .catch(error => {
        console.error('Error fetching disaster data:', error);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); 
  };

  const filteredDisasters = disasters.filter(disaster =>
    disaster.latitude >= 26 && disaster.latitude <= 31 &&
    disaster.longitude >= 80 && disaster.longitude <= 89
  );

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
          const iconUrl =
            disaster.disaster_type === 'Fire'
              ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' 
              : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'; 

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
