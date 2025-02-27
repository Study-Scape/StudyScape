import mapboxgl from 'mapbox-gl'
import React, { useEffect, useRef } from 'react';

interface MarkerProps {
    map: mapboxgl.Map | null;
    coordinates: [number, number];
    popupText?: string;
}

const MarkerComponent: React.FC<MarkerProps> = ({
map,
coordinates,
popupText
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

    markerRef.current = marker;

    return () => {
    marker.remove();
    };
}, [map, coordinates, popupText]);

return null;
};

export default MarkerComponent;