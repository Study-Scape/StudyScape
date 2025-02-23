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

    const [locations, setLocations] = useState(serverLocations)
    useEffect(() => {
        const channel = supabase
        .channel('realtime locations')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'locations' }, (payload) => setLocations([...locations, payload.new]))
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'locations' }, (payload) => setLocations((locations: any[]) => locations.map((loc) => (loc.name === payload.new.name ? payload.new : loc))))
        .subscribe()

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, locations, setLocations]);

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
              />
            </div>
          </SheetHeader>

          <div>
            {locations?.map((location: any, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                {location.name}
                <p>{location.address}</p>
                  <div className='flex flex-wrap gap-1'>
                    {location.hasWifi && (<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {location.hasWifi}
                    </span>
                    )}
                    {location.hasFood && ( 
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {location.hasFood}
                    </span>
                    )}
                    {location.hasRestrooms && ( 
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {location.hasRestrooms}
                    </span>
                    )}
                    {location.hasPrinters && ( 
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {location.hasPrinters}
                    </span>
                    )}
                  </div>
                  <div>
                  <span className='text-red-600 px-2 bg-red-50 rounded-full'>{location.avgRating}</span><small><span className='text-red-600 text-xs pr-4'>stars</span></small>
                  <small><span className='text-green-600 text-xs'>noise level: </span></small><span className='text-green-600 rounded-full'>{location.soundLevel}</span>
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
                          {location.hasElevator}
                        </span>
                    )}
                    {location.quietSpaces && (
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                          {location.quietSpaces}
                        </span>
                    )}
                    {location.hasBikeRack && (
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                          {location.hasBikeRack}
                        </span>
                    )}
                    </div>
                  </div>
              </div>
            ))}
          </div>

        </SheetContent>
      </Sheet>
  )
}
