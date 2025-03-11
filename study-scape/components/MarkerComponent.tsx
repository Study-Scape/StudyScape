import mapboxgl from 'mapbox-gl'
import React, { useEffect, useRef } from 'react';
import './MarkerComponent.css';

interface MarkerProps {
    map: mapboxgl.Map | null;
    coordinates: [number, number];
    popupText?: string;
    imageUrl?: string;
}

const MarkerComponent: React.FC<MarkerProps> = ({
map,
coordinates,
popupText,
imageUrl
}) => {
const markerRef = useRef<mapboxgl.Marker | null>(null);

useEffect(() => {
    if (!map || !coordinates) return;
  
    const marker = new mapboxgl.Marker({ color: 'DarkOrchid' })
      .setLngLat(coordinates)
      .addTo(map);
  
    if (popupText || imageUrl) {
      const popup = new mapboxgl.Popup({ offset: [0, -15] });
      
      let popupContent = '';
      if (popupText) {
        popupContent += `<h3>${popupText}</h3>`;
      }
      if (imageUrl) {
        popupContent += `<img src="${imageUrl}" width="200" height="150" />`;
      }
  
      popup.setHTML(popupContent);
      popup.addClassName('custom-popup'); // Add a custom class
      marker.setPopup(popup);
    }

    markerRef.current = marker;

    return () => {
    marker.remove();
    };
}, [map, coordinates, popupText, imageUrl]);

return null;
};

export default MarkerComponent;