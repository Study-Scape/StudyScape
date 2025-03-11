"use client";

import { Button } from "@/components/ui/button";

interface AddLocationButtonProps {
  isAdding: boolean;
  toggleAddingMode: () => void;
}

export default function AddLocationButton({ isAdding, toggleAddingMode }: AddLocationButtonProps) {
  return (
    <Button
      className={`hover:text-white ${isAdding ? "bg-red-500" : "bg-indigo-500"}`}
      style={{ position: "absolute", top: "100px", left: "50px", zIndex: 1 }}
      onClick={toggleAddingMode}
    >
      {isAdding ? "Cancel Adding Location" : "Add Location"}
    </Button>
  );
}
