"use client";

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxComponent.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXBlbmc2NiIsImEiOiJjbTZyMDhnMjQxbGFxMmlxM2RvdzlidTBjIn0.84mKeAhq22pQoFgcrYWMBw';

interface MapboxComponentProps {
  center?: [number, number];
  zoom?: number;
}

const MapboxComponent: React.FC<MapboxComponentProps> = ({
  center = [-122.306976, 47.655531],
  zoom = 14.5,
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center,
        zoom,
      });
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center, zoom]);

  return <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapboxComponent;
