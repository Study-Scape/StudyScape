"use client";

import { useRef, useEffect, useState, use } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxComponent.css';
import MarkerComponent from './MarkerComponent';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXBlbmc2NiIsImEiOiJjbTZyMDhnMjQxbGFxMmlxM2RvdzlidTBjIn0.84mKeAhq22pQoFgcrYWMBw';

interface MapboxComponentProps {
  center?: [number, number];
  zoom?: number;
  maxBounds?: [[number, number], [number, number]]
}

const MapboxComponent: React.FC<MapboxComponentProps> = ({
  center = [-122.306976, 47.655531],
  zoom = 14.5,
  maxBounds = [[-122.317514, 47.648321],[-122.291337, 47.663049]]
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center,
      zoom,
      maxBounds
    });

    mapRef.current = map

    mapRef.current?.dragRotate.disable()
    mapRef.current?.touchZoomRotate.disable()

    map.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      {mapLoaded && mapRef.current && (
        <>
          <MarkerComponent map={mapRef.current} coordinates={[-122.306976, 47.655531]} popupText='center'/>
        </>
      )}
    </div>
  );
};

export default MapboxComponent;
