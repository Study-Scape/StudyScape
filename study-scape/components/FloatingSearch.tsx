"use client"; // Ensure it runs on the client side

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FloatingSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Toggle floating search window
  const toggleSearch = () => setIsOpen(!isOpen);

  // Make it draggable
  const onMouseDown = (event: React.MouseEvent) => {
    const element = searchRef.current;
    if (!element) return;

    let startX = event.clientX - element.offsetLeft;
    let startY = event.clientY - element.offsetTop;

    const onMouseMove = (moveEvent: MouseEvent) => {
      element.style.left = `${moveEvent.clientX - startX}px`;
      element.style.top = `${moveEvent.clientY - startY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      {/* Button to open the floating search window */}
      <Button className="hover:text-purple-500"
        onClick={toggleSearch}
        style={{ position: "absolute", top: "100px", left: "50px", zIndex: 1 }}
      >
        Search
      </Button>

      {/* Floating search window */}
      {isOpen && (
        <div
          ref={searchRef}
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            top: "200px",
            left: "50px",
            width: "300px",
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            cursor: "grab",
            zIndex: 1,
          }}
        >
          <h3 className="text-lg font-bold">Search Study Spots</h3>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a location..."
            className="w-full my-2 p-2 border rounded"
          />
          <Button onClick={() => console.log(`Searching for: ${searchQuery}`)}>
            Search
          </Button>
        </div>
      )}
    </>
  );
}
