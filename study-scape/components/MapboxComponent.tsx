"use client";

import { useRef, useEffect, useState } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxComponent.css';
import MarkerComponent from './MarkerComponent';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXBlbmc2NiIsImEiOiJjbTZyMDhnMjQxbGFxMmlxM2RvdzlidTBjIn0.84mKeAhq22pQoFgcrYWMBw';

interface MapboxComponentProps {
  center?: [number, number];
  zoom?: number;
  maxBounds?: [[number, number], [number, number]];
}

const MapboxComponent: React.FC<MapboxComponentProps> = ({
  center = [-122.306976, 47.655531],
  zoom = 14.5,
  maxBounds = [[-122.317514, 47.648321], [-122.291337, 47.663049]]
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

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

    mapRef.current = map;

    mapRef.current?.dragRotate.disable();
    mapRef.current?.touchZoomRotate.disable();

    map.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);

          // Add a marker for the user's location
          new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current!);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, [mapLoaded]);

  const navigateToMarker = (markerCoordinates: [number, number]) => {
    if (!userLocation || !mapRef.current) return;

    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation[0]},${userLocation[1]};${markerCoordinates[0]},${markerCoordinates[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry;
        if (mapRef.current?.getSource('route')) {
          (mapRef.current.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
        } else {
          mapRef.current?.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: route
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
      })
      .catch(error => console.error('Error fetching route:', error));
  };

  const handleMarkerClick = (coordinates: [number, number]) => {
    console.log('Marker clicked:', coordinates);
    navigateToMarker(coordinates); // Trigger navigation to the clicked marker
  };

  if (!isMounted) return null;

  return (
    <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      {mapLoaded && mapRef.current && (
        <>
          <MarkerComponent
            map={mapRef.current}
            coordinates={[-122.304641, 47.654584]}
            onClick={handleMarkerClick} // Pass the click handler
          />
          <MarkerComponent
            map={mapRef.current}
            coordinates={[-122.307842, 47.655885]}
            onClick={handleMarkerClick} // Pass the click handler
          />
          <MarkerComponent
            map={mapRef.current}
            coordinates={[-122.305072, 47.653372]}
            onClick={handleMarkerClick} // Pass the click handler
          />
          <MarkerComponent
            map={mapRef.current}
            coordinates={[-122.310363, 47.656646]}
            onClick={handleMarkerClick} // Pass the click handler
          />
        </>
      )}
    </div>
  );
};

export default MapboxComponent;