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
  address: string;
}

const MapboxComponent: React.FC = () => {
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
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

    const handleMapClick = (event: mapboxgl.MapMouseEvent & { originalEvent: MouseEvent }) => {
      if (!isAddingLocation) return;

      const { lng, lat } = event.lngLat;

      const tempMarker: mapboxgl.Marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
    
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
        hasPicture: "",
      });
      setClickPosition({ x: event.originalEvent.clientX, y: event.originalEvent.clientY });
      setIsAddingLocation(false);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [isAddingLocation]);

  const handleFormSubmit = async () => {
    if (!formData?.name) {
        alert("Please enter a location name.");
        return;
    }

    if (!formData?.address) {
        alert("Please enter an address.");
        return;
    }

    // Get the currently authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        console.error("User not authenticated:", authError);
        alert("You must be logged in to add a location.");
        return;
    }

    // Retrieve the user's ID from the `users` table
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

    if (userError || !userData) {
        console.error("Error fetching user ID:", userError);
        alert("Failed to verify user.");
        return;
    }

    const newLocation: Location = {
      uuid: crypto.randomUUID(),
      name: formData.name,
      address: formData.address || "", 
      longitude: parseFloat(formData.longitude!.toFixed(6)),
      latitude: parseFloat(formData.latitude!.toFixed(6)),
      hasRestrooms: formData.hasRestrooms ?? false,
      hasFood: formData.hasFood ?? false,
      hasOutlets: formData.hasOutlets ?? false,
      hasPrinters: formData.hasPrinters ?? false,
      hasWifi: formData.hasWifi ?? false,
      hasElevator: formData.hasElevator ?? false,
      hasBikeRack: formData.hasBikeRack ?? false,
      soundLevel: formData.soundLevel ?? 1,
      hasPicture: formData.hasPicture ?? "",
    };

    console.log("Attempting to insert location:", newLocation);

    const { error: insertError } = await supabase.from("locations").insert([newLocation]);
    if (insertError) {
        console.error("Error saving location:", insertError);
        alert(`Failed to save location: ${insertError.message}`);
        return;
    }

    setLocations((prev) => [...prev, newLocation]);
    alert("Location saved successfully!");
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

      {formData && clickPosition && (
        <div className="popup-form" style={{
          left: clickPosition.x,
          top: clickPosition.y - 70,
          position: "absolute",
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          minWidth: "250px"
        }}>
          {/* Close button */}
          <button 
            onClick={() => setFormData(null)} 
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              border: "none",
              background: "transparent",
              fontSize: "1.2em",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#333", // Ensures visibility
              padding: "5px",
            }}
          >
            ✖
          </button>

          <h3 style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "10px" }}>Add Location</h3>
          
          <input
            type="text"
            placeholder="Location Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Address"
            value={formData.address || ""}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          {[
            "hasRestrooms", "hasFood", "hasOutlets", "hasPrinters", "hasWifi", "hasElevator", "hasBikeRack"
          ].map((field) => (
            <label key={field} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="checkbox"
                checked={formData[field as keyof Location] as boolean}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.checked })}
              />
              {field.replace("has", "Has ")}
            </label>
          ))}

          <label>Sound Level:
            <select 
              value={formData.soundLevel || 1} 
              onChange={(e) => setFormData({ ...formData, soundLevel: Number(e.target.value) })}
            >
              {[1, 2, 3].map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </label>
          
          <button onClick={handleFormSubmit}>Save</button>
        </div>
      )}


    </div>
  );
};

export default MapboxComponent;
