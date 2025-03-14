'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import UnbookmarkButton from '@/components/unbookmark';

export default function Page() {
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    hasPicture?: string;
    uuid: string;
  }
  
  interface Bookmark {
    id: number;
    location_id: string;
    is_bookmarked: boolean;
    user_id: string;
    locations: Location;
  }

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      // Get the currently authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("User not authenticated");
      }

      // Retrieve the user's id from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (userError || !userData) {
        throw new Error("Error fetching user ID");
      }

      const currentUserId = userData.id;

      const { data, error: bookmarksError } = await supabase
        .from('bookmarks')
        .select('id, location_id, is_bookmarked, user_id, locations (*)')
        .eq('user_id', currentUserId)
        .eq('is_bookmarked', true) as { data: Bookmark[] | null, error: any };

      if (bookmarksError) {
        throw new Error("Error fetching bookmarks");
      }

      setBookmarks(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUnbookmark = (bookmarkId: number) => {
    if (bookmarks) {
      // Remove the unbookmarked item from the state
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== bookmarkId));
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
        <p className="text-gray-800">Loading your bookmarks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
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
              const hasImage = location.hasPicture && location.hasPicture.length > 0;

              return (
                <div key={bookmark.id} className={`mb-6 ${hasImage ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : ''}`}>
                  {/* Location Info Container */}
                  <div className={`p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 ${hasImage ? 'md:col-span-2' : 'w-full'}`}>
                    {/* Location Name and Bookmark Status */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">{location.name}</h2>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          Bookmarked!
                        </span>
                        <UnbookmarkButton 
                          bookmarkId={bookmark.id} 
                          userId={bookmark.user_id}
                          locationId={bookmark.location_id}
                          onUnbookmark={() => handleUnbookmark(bookmark.id)}
                        />
                      </div>
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

                  {/* Image Container - Only render if there's an image */}
                  {hasImage && (
                    <div className="h-full rounded-lg overflow-hidden shadow-md border border-gray-200">
                      <img 
                        src={location.hasPicture} 
                        alt={`${location.name}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
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