"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createClient } from "@/utils/supabase/client";

import "mapbox-gl/dist/mapbox-gl.css";
import "./MapboxComponent.css";
import MarkerComponent from "./MarkerComponent";
import AddLocationButton from "./AddLocationButton";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibXBlbmc2NiIsImEiOiJjbTZyMDhnMjQxbGFxMmlxM2RvdzlidTBjIn0.84mKeAhq22pQoFgcrYWMBw";

interface Location {
  uuid: string;
  name: string;
  longitude: number;
  latitude: number;
  hasPicture: string;
}

const MapboxComponent: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [clickedCoords, setClickedCoords] = useState<{ lng: number; lat: number } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-122.306976, 47.655531],
      zoom: 14.5,
      maxBounds: [
        [-122.317514, 47.648321],
        [-122.291337, 47.663049],
      ],
    });

    mapRef.current = map;
    map.dragRotate.disable();
    map.touchZoomRotate.disable();

    map.on("load", () => {
      setMapLoaded(true);
    });

    map.on('mousemove', function(event) {
      const mouseLng = event.lngLat.lng;
      const mouseLat = event.lngLat.lat;
      console.log(mouseLng, mouseLat)
    })

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) console.error("Error fetching locations:", error);
      else setLocations(data);
    };

    fetchLocations();
  }, []);

  // Handle map clicks when in "Adding Location" mode
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
      if (!isAddingLocation) return;

      const { lng, lat } = event.lngLat;
      setClickedCoords({ lng, lat }); // Update state with clicked coordinates
      console.log("Clicked coordinates:", { longitude: lng, latitude: lat });

      setIsAddingLocation(false); // Exit "Adding Location" mode after a click
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [isAddingLocation]);

  return (
    <div id="map-container" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }}>
      {mapLoaded &&
        locations.map((location) => (
          <MarkerComponent
            key={location.uuid}
            map={mapRef.current}
            coordinates={[location.longitude, location.latitude]}
            popupText={location.name}
            imageUrl={location.hasPicture}
          />
        ))}

      {/* Toggle Button for Adding Locations */}
      <AddLocationButton
        isAdding={isAddingLocation}
        toggleAddingMode={() => setIsAddingLocation((prev) => !prev)}
      />

      {/* Display Clicked Coordinates */}
      {clickedCoords && (
        <div
          style={{
            position: "absolute",
            bottom: "60px", // Raised from 20px to 60px
            left: "20px",
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <strong>Clicked Location:</strong>
          <br />
          Longitude: {clickedCoords.lng.toFixed(6)}
          <br />
          Latitude: {clickedCoords.lat.toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default MapboxComponent;
