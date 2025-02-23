import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

interface MarkerProps {
  map: mapboxgl.Map | null;
  coordinates: [number, number];
  popupText?: string;
  onClick?: (coordinates: [number, number]) => void; // Add onClick prop
}

const MarkerComponent: React.FC<MarkerProps> = ({
  map,
  coordinates,
  popupText,
  onClick, // Destructure onClick
}) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !coordinates) return;

    const marker = new mapboxgl.Marker({ color: 'DarkOrchid' })
      .setLngLat(coordinates)
      .addTo(map);

    if (popupText) {
      const popup = new mapboxgl.Popup().setText(popupText);
      marker.setPopup(popup);
    }

    // Add click event listener to the marker
    marker.getElement().addEventListener('click', () => {
      if (onClick) {
        onClick(coordinates); // Trigger the onClick callback
      }
    });

    markerRef.current = marker;

    return () => {
      marker.remove();
    };
  }, [map, coordinates, popupText, onClick]); // Add onClick to dependencies

  return null;
};

export default MarkerComponent;