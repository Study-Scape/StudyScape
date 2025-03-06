import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface MarkerProps {
    map: mapboxgl.Map | null;
    coordinates: [number, number];
    popupText?: string; // Location Name
}

const MarkerComponent: React.FC<MarkerProps> = ({ map, coordinates, popupText }) => {
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [avgRating, setAvgRating] = useState<number | null>(null);
    const [soundLevel, setSoundLevel] = useState<number | null>(null);
    const [expanded, setExpanded] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (!map || !coordinates) return;

        const marker = new mapboxgl.Marker({ color: 'DarkOrchid' })
            .setLngLat(coordinates)
            .addTo(map);

        marker.getElement().addEventListener('click', async (event) => {
            event.stopPropagation();
            setPopupVisible(true);
            setPopupPosition({ x: event.clientX, y: event.clientY });

            // Fetch data from Supabase
            const { data, error } = await supabase
                .from('locations')
                .select('avgRating, soundLevel')
                .eq('name', popupText) // Assuming "name" matches the location name
                .single();

            if (error) {
                console.error('Error fetching location data:', error);
            } else {
                setAvgRating(data.avgRating);
                setSoundLevel(data.soundLevel);
            }
        });

        markerRef.current = marker;

        return () => {
            marker.remove();
        };
    }, [map, coordinates, popupText, supabase]);

    // Function to open Google Maps with navigation
    const handleNavigate = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const destinationLat = coordinates[1];
                const destinationLng = coordinates[0];

                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=walking`;

                window.open(googleMapsUrl, '_blank');
            },
            (error) => {
                alert("Unable to retrieve your location. Please enable location services.");
                console.error("Geolocation error:", error);
            }
        );
    };

    return (
        <>
            {popupVisible && (
                <div
                    ref={popupRef}
                    style={{
                        position: 'fixed',
                        left: `${popupPosition.x}px`,
                        top: `${popupPosition.y}px`,
                        background: 'white',
                        padding: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        borderRadius: '5px',
                        width: '200px',
                        transform: 'translate(-50%, 10px)',
                    }}
                >
                    <p><strong>{popupText}</strong></p>
                    <p>Rating: {avgRating !== null ? avgRating : 'Loading...'}</p>

                    {expanded && <p>Sound Level: {soundLevel !== null ? soundLevel : 'Loading...'}</p>}

                    <button
                        onClick={() => setExpanded(!expanded)}
                        style={{
                            background: 'blue',
                            color: 'white',
                            padding: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    >
                        {expanded ? 'Hide Details' : 'Display More'}
                    </button>

                    <button
                        onClick={handleNavigate}
                        style={{
                            background: 'green',
                            color: 'white',
                            padding: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    >
                        Navigate
                    </button>

                    <button
                        onClick={() => setPopupVisible(false)}
                        style={{
                            background: 'red',
                            color: 'white',
                            padding: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
};

export default MarkerComponent;
