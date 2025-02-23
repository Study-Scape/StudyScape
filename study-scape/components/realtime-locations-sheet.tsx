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

    // Filter locations based on searchQuery
    const filteredLocations = locations.filter((location: any) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button className="hover:text-purple-500" style={{ position: "absolute", top: "50px", left: "50px" }}>
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
          </SheetHeader>

          <div>
            {filteredLocations?.map((location: any, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <h2 className="font-semibold">{location.name}</h2>
                <p>{location.address}</p>
                  <div className='flex flex-wrap gap-1'>
                    {location.hasWifi && (<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Wifi
                    </span>
                    )}
                    {location.hasFood && ( 
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Food
                    </span>
                    )}
                    {location.hasRestrooms && ( 
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Restrooms
                    </span>
                    )}
                    {location.hasPrinters && ( 
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Printers
                    </span>
                    )}
                  </div>
                  <div>
                  <span className='text-red-600 px-2 bg-red-50 rounded-full'>{location.avgRating}</span>
                  <small><span className='text-red-600 text-xs pr-4'> stars</span></small>
                  <small><span className='text-green-600 text-xs'>Noise level: </span></small>
                  <span className='text-green-600 rounded-full'>{location.soundLevel}</span>
                  </div>
                  <br></br>
                  <div>
                    <span className="py-1 text-blue-800 text-sm">
                      Accessibility:
                    </span>
                    <br></br>
                    <div className='flex flex-wrap gap-1'>
                    {location.hasElevator && (
                        <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full'>
                          Elevator
                        </span>
                    )}
                    {location.quietSpaces && (
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                          Quiet Spaces
                        </span>
                    )}
                    {location.hasBikeRack && (
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                          Bike Rack
                        </span>
                    )}
                    </div>
                  </div>
              </div>
            ))}
          </div>

        </SheetContent>
      </Sheet>
    );
}
