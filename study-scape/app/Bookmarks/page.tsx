import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: bookmarks } = await supabase
    .from('locations')
    .select()
    .not('isBookmarked', 'is', null);

  return (
    <div
      className="h-full w-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-purple-100 to-indigo-200"
    >
      <div style={{ height: '20px' }}></div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <div className="w-full px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Bookmarked Locations</h1>
          {bookmarks?.map((location, index) => (
            <div
              key={index}
              className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200"
            >
              {/* Location Name and Bookmark Status */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{location.name}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Bookmarked!
                </span>
              </div>

              {/* Address */}
              <p className="text-gray-600 mb-4">{location.address}</p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {location.hasWifi && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    WiFi Available
                  </span>
                )}
                {location.hasFood && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Food Nearby
                  </span>
                )}
                {location.hasRestrooms && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Restrooms
                  </span>
                )}
                {location.hasPrinters && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Printers Available
                  </span>
                )}
              </div>

              {/* Ratings and Noise Level */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-red-600 font-semibold">{location.avgRating}</span>
                  <small className="text-red-600 text-xs"> stars</small>
                </div>
                <div>
                  <small className="text-green-600 text-xs">Noise Level: </small>
                  <span className="text-green-600 font-semibold">{location.soundLevel}</span>
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <span className="font-semibold text-blue-800">Accessibility:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {location.hasElevator && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                      Elevator Available
                    </span>
                  )}
                  {location.quietSpaces && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Quiet Spaces
                    </span>
                  )}
                  {location.hasBikeRack && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Bike Rack Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: '20px' }}></div>
    </div>
    
  );
}