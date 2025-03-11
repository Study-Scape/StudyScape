"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createClient } from "@/utils/supabase/client";
import "mapbox-gl/dist/mapbox-gl.css";
import "@/components/MapboxComponent.css";
import MarkerComponent from "@/components/MarkerComponent";
import AddLocationButton from "@/components/AddLocationButton";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibXBlbmc2NiIsImEiOiJjbTZyMDhnMjQxbGFxMmlxM2RvdzlidTBjIn0.84mKeAhq22pQoFgcrYWMBw";

interface Location {
  uuid: string;
  name: string;
  longitude: number;
  latitude: number;
  hasRestrooms: boolean;
  hasFood: boolean;
  hasOutlets: boolean;
  hasPrinters: boolean;
  hasWifi: boolean;
  hasElevator: boolean;
  hasBikeRack: boolean;
  soundLevel: number;
  hasPicture: string;
}

const MapboxComponent: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [formData, setFormData] = useState<Partial<Location> | null>(null);
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

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
      if (!isAddingLocation) return;

      const { lng, lat } = event.lngLat;
      setFormData({
        longitude: lng,
        latitude: lat,
        hasRestrooms: false,
        hasFood: false,
        hasOutlets: false,
        hasPrinters: false,
        hasWifi: false,
        hasElevator: false,
        hasBikeRack: false,
        soundLevel: 1,
      });
      setIsAddingLocation(false);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [isAddingLocation]);

  const handleFormSubmit = () => {
    if (!formData?.name) {
      alert("Please enter a location name.");
      return;
    }
    setLocations((prev) => [...prev, { ...formData, uuid: crypto.randomUUID() } as Location]);
    setFormData(null);
  };

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

      <AddLocationButton isAdding={isAddingLocation} toggleAddingMode={() => setIsAddingLocation((prev) => !prev)} />

      {formData && (
        <div className="popup-form">
          <h3 style={{ fontSize: "1.5em", fontWeight: "bold" }}>Add Location</h3>
          <input
            type="text"
            placeholder="Location Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {["hasRestrooms", "hasFood", "hasOutlets", "hasPrinters", "hasWifi", "hasElevator", "hasBikeRack"].map((field) => (
            <label key={field} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={formData[field as keyof Location] as boolean}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.checked })}
              />
              {field.replace("has", "Has ")}
            </label>
          ))}
          <label>
            Sound Level:
            <select
              value={formData.soundLevel}
              onChange={(e) => setFormData({ ...formData, soundLevel: Number(e.target.value) })}
            >
              {[1, 2, 3].map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
          <button onClick={handleFormSubmit}>Save</button>
        </div>
      )}
    </div>
  );
};

export default MapboxComponent;