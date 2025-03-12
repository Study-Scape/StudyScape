import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { FaStar } from "react-icons/fa";

const supabase = createClient();

const StarRating = ({ locationUuid }: { locationUuid: string }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);

    const submitRating = async (newRating: number) => {
        setRating(newRating);
  
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
  
      // Check if the user has already rated this location
      const { data: existingRating, error: fetchError } = await supabase
          .from('ratings')
          .select('id')
          .eq('user_id', userId)
          .eq('locations_id', locationUuid)
          .single();

      if (existingRating) {

        if (newRating === 0) {
            // If the user unselects all stars, delete the rating
            const { error: deleteError } = await supabase
                .from('ratings')
                .delete()
                .eq('id', existingRating.id);

            if (deleteError) {
                console.error("Error deleting rating:", deleteError);
                return;
            }
        } else {
          // Update the existing rating
          const { error: updateError } = await supabase
              .from('ratings')
              .update({ rating: newRating })
              .eq('id', existingRating.id);
  
          if (updateError) {
              console.error("Error updating rating:", updateError);
              return;
          }
        }
      } else {
          // Insert a new rating
          const { error: insertError } = await supabase
              .from('ratings')
              .insert([{ user_id: userId, locations_id: locationUuid, rating: newRating }]);
  
          if (insertError) {
              console.error("Error inserting new rating:", insertError);
              return;
          }
      }
  };    

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer ${star <= (hover || rating!) ? 'text-yellow-500' : 'text-gray-300'}`}
            size={20}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => submitRating(rating === star ? 0 : star)} // Clicking again deselects
          />
        ))}
      </div>
    );
  };

  export { StarRating };