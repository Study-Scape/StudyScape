"use client";

import { useRef, useEffect, useState, use } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import { createClient } from '@/utils/supabase/client';


import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxComponent.css';
import MarkerComponent from './MarkerComponent';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXBlbmc2NiIsImEiOiJjbTZyMDhnMjQxbGFxMmlxM2RvdzlidTBjIn0.84mKeAhq22pQoFgcrYWMBw';

interface MapboxComponentProps {
  center?: [number, number];
  zoom?: number;
  maxBounds?: [[number, number], [number, number]]
}

interface Location {
  uuid: string;
  name: string;
  longitude: number;
  latitude: number;
  hasPicture: string;
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
  const [locations, setLocations] = useState<Location[]>([]);
  
  const supabase = createClient();

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

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*');

      if (error) {
        console.error('Error fetching locations:', error);
      } else {
        setLocations(data);
      }
    };

    fetchLocations();
  }, [supabase]);

  if (!isMounted) return null;
  
  return (
    <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      {mapLoaded && mapRef.current && locations.map((location) => (
        <MarkerComponent
          key={location.uuid}
          map={mapRef.current}
          coordinates={[location.longitude, location.latitude]}
          popupText={location.name}
          imageUrl = {location.hasPicture}
        />
      ))}
    </div>
  );
};

export default MapboxComponent;
