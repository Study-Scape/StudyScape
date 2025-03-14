'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client';

interface UnbookmarkButtonProps {
  bookmarkId: number
  userId: string
  locationId: string
  onUnbookmark?: () => void
}

export default function UnbookmarkButton({
  bookmarkId,
  userId,
  locationId,
  onUnbookmark
}: UnbookmarkButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  
  const handleUnbookmark = async () => {
    if (isLoading) return
    
    // Validation check
    if (!bookmarkId || !userId || !locationId) {
      console.error('Missing required data:', { bookmarkId, userId, locationId });
      setError('Missing required bookmark data');
      return;
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('Unbookmarking with data:', { bookmarkId, userId, locationId });
      
      // Delete the bookmark record
      const { error: deleteError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId)
        
      if (deleteError) {
        throw new Error(deleteError.message)
      }
      
      // Call the onUnbookmark callback if provided
      if (onUnbookmark) {
        onUnbookmark()
      }
    } catch (err) {
      console.error('Error removing bookmark:', err)
      setError(err instanceof Error ? err.message : 'Failed to remove bookmark')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div>
      <button
        onClick={handleUnbookmark}
        disabled={isLoading}
        className="flex items-center justify-center px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded-full transition-colors duration-200"
        aria-label="Remove bookmark"
      >
        {isLoading ? (
          <span>Removing...</span>
        ) : (
          <span>Unbookmark</span>
        )}
      </button>
      
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}