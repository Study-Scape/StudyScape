'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from 'react';

export default function AllLocations({ serverLocations }: {serverLocations: any}) {
    const supabase = createClient();

    const [locations, setLocations] = useState(serverLocations);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>({
      study: {
        hasWifi: false,
        hasFood: false,
        hasRestrooms: false,
        hasPrinters: false,
      },
      accessibility: {
        hasElevator: false,
        quietSpaces: false,
        hasBikeRack: false,
      }
    });

    useEffect(() => {
        const channel = supabase
        .channel('realtime locations')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'locations' }, 
            (payload) => setLocations([...locations, payload.new]))
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'locations' }, 
            (payload) => setLocations((locations: any[]) => locations.map((loc) => 
                (loc.name === payload.new.name ? payload.new : loc))))
        .subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, locations, setLocations]);

    type StudyFilters = {
      hasWifi: boolean;
      hasFood: boolean;
      hasRestrooms: boolean;
      hasPrinters: boolean;
    };
    
    type AccessibilityFilters = {
      hasElevator: boolean;
      quietSpaces: boolean;
      hasBikeRack: boolean;
    };
    
    type Filters = {
      study: StudyFilters;
      accessibility: AccessibilityFilters;
    };

    // Function to toggle filters
    const toggleFilter = <T extends keyof StudyFilters | keyof AccessibilityFilters>(
      category: 'study' | 'accessibility',
      filter: T
    ) => {
      setFilters((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [filter]: !prev[category][filter as keyof typeof prev[typeof category]],
        },
      }));
    };

    // Filter locations based on searchQuery
    const filteredLocations = locations.filter((location: any) => {
      // Check if the name matches the search query
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
      // Check if the location matches the selected filters
      const matchesFilters = Object.entries(filters).every(([category, categoryFilters]) =>
        Object.entries(categoryFilters).every(([filter, isActive]) => 
          !isActive || location[filter] // Ensure the location has the filter property set to true
        )
      );
    
      return matchesSearch && matchesFilters;
    });

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button className="hover:text-white bg-indigo-500" style={{ position: "absolute", top: "50px", left: "50px" }}>
            Show All Locations
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className='max-h-screen overflow-y-auto scrollbar-hide'>
          <SheetHeader>
            <SheetTitle>Locations</SheetTitle>
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                className="p-2 rounded-md text-black w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filters */}
            <h1 className="font-semibold">Study Filters:</h1>
            <div className="flex gap-2 mt-4">
              {Object.keys(filters.study).map((filter) => (
                <Button
                  key={filter}
                  className={`px-3 py-1 rounded-md text-xs ${
                    filters.study[filter as keyof StudyFilters] ? "bg-gray-500 text-white" : "bg-indigo-500 text-white"
                  }`}
                  onClick={() => toggleFilter('study', filter as keyof StudyFilters)}
                >
                  {filter.replace('has', '')}
                </Button>
              ))}
            </div>

            <h1 className="font-semibold">Accessibility Filters:</h1>
            <div className="flex gap-2 mt-4">
              {Object.keys(filters.accessibility).map((filter) => (
                <Button
                  key={filter}
                  className={`px-3 py-1 rounded-md text-xs ${
                    filters.accessibility[filter as keyof AccessibilityFilters] ? "bg-gray-500 text-white" : "bg-indigo-500 text-white"
                  }`}
                  onClick={() => toggleFilter('accessibility', filter as keyof AccessibilityFilters)}
                >
                  {filter === "quietSpaces" ? "Quiet Spaces" : 
                  filter === "hasBikeRack" ? "Bike Rack" :
                  filter.replace('has', '')}
                </Button>
              ))}
            </div>

            <br></br>
          </SheetHeader>

          <div>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location: any, index: number) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                    <h2 className="font-semibold">{location.name}</h2>
                    <p>{location.address}</p>

                    {/* Amenities */}
                    <div className='flex flex-wrap gap-1'>
                        {location.hasWifi && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            WiFi Available
                          </span>
                        )}
                        {location.hasFood && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Food Nearby
                          </span>
                        )}
                        {location.hasRestrooms && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Restrooms
                          </span>
                        )}
                        {location.hasPrinters && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Printers Available
                          </span>
                        )}
                    </div>

                    {/* Ratings and Noise Level */}
                      <div>
                        <span className='text-red-600 px-2 bg-red-50 rounded-full'>{location.avgRating}</span>
                        <small><span className='text-red-600 text-xs pr-4'> stars</span></small>
                        <small><span className='text-green-600 text-xs'>Noise level: </span></small>
                        <span className='text-green-600 rounded-full'>
                          {location.soundLevel == 1 && (<span className='text-green-600 rounded-full'> Quiet </span>)}
                          {location.soundLevel == 2 && (<span className='text-green-600 rounded-full'> Chatter </span>)}
                          {location.soundLevel == 3 && (<span className='text-green-600 rounded-full'> Loud </span>)}
                          </span>
                      </div>

                    {/* Accessibility Features */}
                      <div className="mt-2">
                        <span className="py-1 text-blue-800 text-sm font-semibold">
                            Accessibility:
                        </span>
                        <br></br>
                        <div className='flex flex-wrap gap-1'>
                            {location.hasElevator && (
                              <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full'>
                                Elevator Available
                              </span>
                            )}
                            {location.quietSpaces && (
                              <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                                  Quiet Spaces
                              </span>
                            )}
                            {location.hasBikeRack && (
                              <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                                  Bike Rack Available
                              </span>
                            )}
                          </div>
                      </div>
                </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No locations match your filters.</p>
          )}
        </div>

        </SheetContent>
      </Sheet>
    );
}
