"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Map.module.css';

// Fix for default Leaflet icon in React
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

const locations = [
  { name: 'San Mateo', position: [37.5629917, -122.3255254] as [number, number] },
  { name: 'Foster City', position: [37.5585465, -122.2710788] as [number, number] },
  { name: 'Burlingame', position: [37.5778696, -122.348090] as [number, number] },
  { name: 'Belmont', position: [37.5202145, -122.2758008] as [number, number] },
  { name: 'Redwood City', position: [37.4852152, -122.2363548] as [number, number] },
  { name: 'San Carlos', position: [37.5071591, -122.2605222] as [number, number] },
  { name: 'Palo Alto', position: [37.4418834, -122.1430195] as [number, number] },
  { name: 'Fremont', position: [37.5485, -121.9886] as [number, number] },
  { name: 'Newark', position: [37.5296, -122.0402] as [number, number] },
  { name: 'Hayward', position: [37.6688, -122.0810] as [number, number] },
  { name: 'Oakland', position: [37.8044, -122.2712] as [number, number] },
  { name: 'San Francisco', position: [37.7749, -122.4194] as [number, number] },
];

export default function ServiceMap() {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        center={[37.62, -122.20]} 
        zoom={9} 
        scrollWheelZoom={false}
        className={styles.leafletMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.name} position={loc.position}>
            <Popup>
              <strong>{loc.name}</strong><br/>
              Handyman Service Area
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
