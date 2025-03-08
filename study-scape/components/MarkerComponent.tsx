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
    const [activeMarker, setActiveMarker] = useState<string | null>(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [avgRating, setAvgRating] = useState<number | null>(null);
    const [soundLevel, setSoundLevel] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        if (!map || !coordinates) return;

        const marker = new mapboxgl.Marker({ color: 'DarkOrchid' })
            .setLngLat(coordinates)
            .addTo(map);

        marker.getElement().addEventListener('click', async (event) => {
            event.stopPropagation();

            // Ensure popupText is not undefined by using null as fallback
            const markerName = popupText ?? null;

            // Toggle visibility: If this marker is active, close it
            if (activeMarker === markerName) {
                setActiveMarker(null);
                return;
            }

            setActiveMarker(markerName);
            setPopupPosition({ x: event.clientX, y: event.clientY });

            // Fetch data from Supabase (including hasPicture column)
            const { data, error } = await supabase
                .from('locations')
                .select('avgRating, soundLevel, hasPicture')
                .eq('name', popupText) // Ensures that name is valid
                .maybeSingle();

            if (error) {
                console.error('Error fetching location data:', error);
            } else {
                setAvgRating(data?.avgRating ?? null);
                setSoundLevel(data?.soundLevel ?? null);
                setImageUrl(data?.hasPicture ?? null);
            }
        });

        markerRef.current = marker;

        return () => {
            marker.remove();
        };
    }, [map, coordinates, popupText, activeMarker]);

    return (
        <>
            {activeMarker === popupText && (
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
                        width: '220px',
                        transform: 'translate(-50%, 10px)',
                        textAlign: 'center',
                    }}
                >
                    {/* Display image if available */}
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Location"
                            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                    )}

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
                        onClick={() => setActiveMarker(null)}
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
