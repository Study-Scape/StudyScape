import mapboxgl from 'mapbox-gl';
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

            let popupContent = `<div style="text-align: center;">`;
            if (popupText) {
                popupContent += `<h3>${popupText}</h3>`;
            }
            if (imageUrl) {
                popupContent += `<img src="${imageUrl}" width="200" height="150" style="border-radius: 8px; margin-bottom: 8px;" />`;
            }

            // Add Navigation Button
            popupContent += `
                <button onclick="navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        window.open('https://www.google.com/maps/dir/?api=1&origin=' + userLat + ',' + userLng + '&destination=${coordinates[1]},${coordinates[0]}&travelmode=walking', '_blank');
                    },
                    (error) => {
                        alert('Failed to get location. Please allow location access.');
                    }
                )"
                style="display: block; margin-top: 10px; padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Navigate
                </button>
            `;

            popupContent += `</div>`;

            popup.setHTML(popupContent);
            popup.addClassName('custom-popup'); // Custom styling
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
