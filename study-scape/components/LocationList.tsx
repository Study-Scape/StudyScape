'use client'
import { useState } from 'react';

export default function LocationList({ locations }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter locations based on searchQuery
  const filteredLocations = locations?.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search locations..."
          className="p-2 rounded-md text-black w-64 border border-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered Locations */}
      <div>
        {filteredLocations?.map((location, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <h3 className="font-semibold">{location.name}</h3>
            <p>{location.address}</p>
            <div className='flex flex-wrap gap-1'>
              {location.hasWifi && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">WiFi</span>}
              {location.hasFood && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Food</span>}
              {location.hasRestrooms && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Restrooms</span>}
              {location.hasPrinters && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Printers</span>}
            </div>
            <div>
              <span className='text-red-600 px-2 bg-red-50 rounded-full'>{location.avgRating} ⭐</span>
              <small className='text-green-600 text-xs'> | Noise Level: {location.soundLevel}</small>
            </div>
            <br />
            <div>
              <span className="text-blue-800 text-sm">Accessibility:</span>
              <br />
              <div className='flex flex-wrap gap-1'>
                {location.hasElevator && <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full'>Elevator</span>}
                {location.quietSpaces && <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>Quiet Spaces</span>}
                {location.hasBikeRack && <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>Bike Rack</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
