import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();

  interface Location {
    name: string;
    address: string;
    hasRestrooms?: boolean;
    hasFood?: boolean;
    avgRating?: number;
    soundLevel?: string;
    hasWifi?: boolean;
    hasPrinters?: boolean;
    hasElevator?: boolean;
    quietSpaces?: boolean;
    hasBikeRack?: boolean;
    uuid: string;
  }
  
  interface Bookmark {
    id: number;
    location_id: string;
    is_bookmarked: boolean;
    user_id: string;
    locations: Location;
  }

  // Get the currently authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
      console.error("User not authenticated:", authError);
      return;
  }

  // Retrieve the user's id from the users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();

  if (userError || !userData) {
    console.error("Error fetching user ID:", userData);
    return;
  }

  const userId = userData.id;

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from('bookmarks')
    .select('id, location_id, is_bookmarked, locations (*)')
    .eq('user_id', userId)
    .eq('is_bookmarked', true) as { data: Bookmark[] | null, error: any };

    if (bookmarksError) {
      console.error('Error fetching bookmarks:', bookmarksError);
      return;
    }

  return (
    <div
      className="h-full w-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-purple-100 to-indigo-200 p-6"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6">
        <div className="w-full px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Bookmarked Locations</h1>
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => {
              const location = bookmark.locations;
              return (
                <div key={bookmark.id} className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">

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
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">You haven't bookmarked any locations yet.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}