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
import { StarRating } from "@/components/StarRating";

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

    /* { Reviews } */
    const [reviews, setReviews] = useState<any>({});
    const [newReview, setNewReview] = useState('');

    /* { Real Time Reviews } */
    useEffect(() => {
      // Check if reviews are stored in localStorage and load them
      const storedReviews = localStorage.getItem('reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
  
      // Real-time updates for reviews
      const channel = supabase
        .channel('realtime reviews')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reviews' },
          (payload) => {
            setReviews((prev: any) => {
              const updatedReviews = {
                ...prev,
                [payload.new.location_id]: [...(prev[payload.new.location_id] || []), payload.new]
              };
              localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Save to localStorage
              return updatedReviews;
            });
          }
        )
        .subscribe();
  
      return () => {
        supabase.removeChannel(channel);
      };
    }, [supabase]);

    const handleReviewSubmit = async (locationId: number) => {

      const { error } = await supabase
        .from('reviews')
        .insert([{ 
          body: newReview, 
          date: new Date().toISOString(), 
          location_id: locationId 
        }]);

        if (!error) {
            setNewReview(''); // Clear the input field without adding duplicates
        }
    };

  const handleReviewDelete = async (reviewId: number) => {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (!error) {
      setReviews((prev: any) => {
        const updatedReviews = { ...prev };
        Object.keys(updatedReviews).forEach(locationId => {
          updatedReviews[locationId] = updatedReviews[locationId].filter(
            (review: any) => review.id !== reviewId
          );
        });
        return updatedReviews;
      });
    }
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
                
             {/* Rating Feature */}           
              <Sheet>
              <div className="flex justify-between items-center">
                <div className="mt-2">
                    <span className="py-1 text-red-500 text-sm font-semibold">
                        Rate Location:
                    </span>
                    <StarRating locationUuid={location.uuid} />
                </div>
                <SheetTrigger asChild>
                  <Button className="mt-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform duration-200">
                    View Reviews
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold text-indigo-500">Reviews for {location.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  {reviews[location.uuid]?.map((review: any, idx: number) => (
                    <div key={idx} className="p-4 bg-white rounded-lg shadow-md mb-4 hover:shadow-xl transition-shadow duration-300">
                      <p className="font-medium text-gray-800">{review.body}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-500 text-xs">
                          {new Date(review.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            timeZone: 'America/Los_Angeles'
                          })}
                        </p>
                        {/* Delete link */}
                        <span
                          className="text-red-500 text-xs cursor-pointer hover:underline hover:text-red-700 transition-all duration-200"
                          onClick={() => handleReviewDelete(review.id)}
                        >
                          🗑️ Delete
                        </span>
                      </div>
                    </div>
                  )) || <p className="text-gray-500">No reviews yet.</p>}
                  
                  <div className="mt-4">
                    <textarea
                      className="w-full p-3 rounded-md border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Leave a review..."
                    />
                    <Button
                      onClick={() => handleReviewSubmit(location.uuid)}
                      className="mt-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform duration-200"
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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