'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client';

interface BookmarkButtonProps {
  userId: string
  locationId: string
  onBookmark?: () => void
}

export default function BookmarkButton({
  userId,
  locationId,
  onBookmark
}: BookmarkButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  
  const handleBookmark = async () => {
    if (isLoading) return
    
    // Validation check
    if (!userId || !locationId) {
      console.error('Missing required data:', { userId, locationId });
      setError('Missing required bookmark data');
      return;
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('Bookmarking with data:', { userId, locationId });
      
      // Insert a new bookmark record
      const { error: insertError } = await supabase
        .from('bookmarks')
        .insert({
          user_id: userId,
          location_id: locationId,
          created_at: new Date().toISOString()
        })
        
      if (insertError) {
        throw new Error(insertError.message)
      }
      
      // Call the onBookmark callback if provided
      if (onBookmark) {
        onBookmark()
      }
    } catch (err) {
      console.error('Error adding bookmark:', err)
      setError(err instanceof Error ? err.message : 'Failed to add bookmark')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div>
      <button
        onClick={handleBookmark}
        disabled={isLoading}
        className="flex items-center justify-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm rounded-full transition-colors duration-200"
        aria-label="Add bookmark"
      >
        {isLoading ? (
          <span>Saving...</span>
        ) : (
          <span>Bookmark</span>
        )}
      </button>
      
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}