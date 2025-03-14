import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import './MarkerComponent.css';
import { createClient } from '@/utils/supabase/client';

interface MarkerProps {
  map: mapboxgl.Map | null;
  coordinates: [number, number];
  popupText?: string;
  imageUrl?: string;
  locationId: string;
}

const MarkerComponent: React.FC<MarkerProps> = ({
  map,
  coordinates,
  popupText,
  imageUrl,
  locationId
}) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const supabase = createClient();
  const [isBookmarked, setIsBookmarked] = useState<boolean | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (!map || !coordinates) return;

    const marker = new mapboxgl.Marker({ color: 'DarkOrchid' })
      .setLngLat(coordinates)
      .addTo(map);

    const popup = new mapboxgl.Popup({ offset: [0, -15] });
    const popupElement = document.createElement('div');
    popupElement.style.textAlign = 'center';

    // Add title
    if (popupText) {
      const title = document.createElement('h3');
      title.textContent = popupText;
      popupElement.appendChild(title);
    }

    // Add image
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.width = 200;
      img.height = 150;
      img.style.borderRadius = '8px';
      img.style.marginBottom = '8px';
      popupElement.appendChild(img);
    }

    // Add Navigation Button
    const navButton = document.createElement('button');
    navButton.textContent = 'Navigate';
    navButton.style.display = 'block';
    navButton.style.margin = '10px auto';
    navButton.style.padding = '8px 12px';
    navButton.style.background = '#4CAF50';
    navButton.style.color = 'white';
    navButton.style.border = 'none';
    navButton.style.borderRadius = '5px';
    navButton.style.cursor = 'pointer';
    navButton.onclick = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${coordinates[1]},${coordinates[0]}&travelmode=walking`,
            '_blank'
          );
        },
        () => {
          alert('Failed to get location. Please allow location access.');
        }
      );
    };
    popupElement.appendChild(navButton);

    // Create a container for bookmark UI
    const bookmarkContainer = document.createElement('div');
    popupElement.appendChild(bookmarkContainer);

    // Check user login status
    const checkUserStatus = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setUserLoggedIn(false);
          setIsBookmarked(false); // No need to check bookmarks
          return;
        }

        setUserLoggedIn(true);

        const { data: existingBookmark } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', user.id)
          .eq('location_id', locationId)
          .single();

        setIsBookmarked(!!existingBookmark);
      } catch (err) {
        console.error('Error checking user/bookmark status:', err);
      }
    };

    checkUserStatus();

    if (userLoggedIn === null) {
      const loadingText = document.createElement('span');
      loadingText.textContent = 'Loading...';
      bookmarkContainer.appendChild(loadingText);
    } else if (!userLoggedIn) {
      // Greyed-out Bookmark Button (User not logged in)
      const bookmarkButton = document.createElement('button');
      bookmarkButton.textContent = 'Bookmark';
      bookmarkButton.style.display = 'block';
      bookmarkButton.style.margin = '5px auto';
      bookmarkButton.style.padding = '8px 12px';
      bookmarkButton.style.background = '#B0B0B0';
      bookmarkButton.style.color = '#FFFFFF';
      bookmarkButton.style.border = 'none';
      bookmarkButton.style.borderRadius = '5px';
      bookmarkButton.style.cursor = 'not-allowed';
      bookmarkButton.disabled = true;
      bookmarkButton.onclick = () => alert('Login to bookmark locations.');
      bookmarkContainer.appendChild(bookmarkButton);
    } else if (isBookmarked) {
      // Already Bookmarked
      const bookmarkedTag = document.createElement('span');
      bookmarkedTag.className = 'px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full';
      bookmarkedTag.textContent = 'Bookmarked!';
      bookmarkContainer.appendChild(bookmarkedTag);
    } else {
      // Normal Bookmark Button
      const bookmarkButton = document.createElement('button');
      bookmarkButton.textContent = 'Bookmark';
      bookmarkButton.style.display = 'block';
      bookmarkButton.style.margin = '5px auto';
      bookmarkButton.style.padding = '8px 12px';
      bookmarkButton.style.background = '#4361EE';
      bookmarkButton.style.color = 'white';
      bookmarkButton.style.border = 'none';
      bookmarkButton.style.borderRadius = '5px';
      bookmarkButton.style.cursor = 'pointer';
      bookmarkButton.onclick = async () => {
        try {
          const { data: { user }, error: authError } = await supabase.auth.getUser();
          if (authError || !user) {
            alert('You must be logged in to bookmark a location.');
            return;
          }

          const { error: insertError } = await supabase
            .from('bookmarks')
            .insert({
              user_id: user.id,
              location_id: locationId,
              is_bookmarked: true
            });

          if (insertError) throw new Error(insertError.message);

          setIsBookmarked(true);
        } catch (err) {
          console.error('Error adding bookmark:', err);
          alert('Failed to bookmark location. Please try again.');
        }
      };

      bookmarkContainer.appendChild(bookmarkButton);
    }

    popup.setDOMContent(popupElement);
    popup.addClassName('custom-popup');
    marker.setPopup(popup);

    markerRef.current = marker;

    return () => {
      marker.remove();
    };
  }, [map, coordinates, popupText, imageUrl, locationId, supabase, isBookmarked, userLoggedIn]);

  return null;
};

export default MarkerComponent;
