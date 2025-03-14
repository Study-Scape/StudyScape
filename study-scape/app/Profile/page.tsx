import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ProfileLoginComponent from "@/components/ProfileLoginComponent";


export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  const userData = {
    name: "Jane Doe",
    username: "@jane_studious",
    bio: "Passionate learner | Coffee enthusiast | Always seeking quiet study spots",
    favoriteSpots: ["UW Engineering Library", "Odegaard Undergraduate Library"],
    noisePreference: "Quiet",
    reviewCount: 15,
    avgRating: 4.2,
  };
  
  if (user && !authError) {
    const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
    
    //sanity checks
    console.log("Auth User ID:", user.id);
    console.log("Profile Query Error:", profileError);
    console.log("Profile Data:", profile);
    
    if (profile && !profileError) {
      userData.name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
      userData.username = '@' + profile.username;
      userData.bio = profile.bio || '(add a bio!)';
      userData.favoriteSpots = profile.favorite_spots || ["favorite", "some", "spots!"];
      userData.noisePreference = profile.noise_preference || '';
      userData.reviewCount = profile.review_count || '--';
      userData.avgRating = profile.avg_rating || '-/5';
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
    <div className="p-8">
    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
    {userData.username}
    </div>
    <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
    {userData.name}
    </h1>
    <p className="mt-2 text-xl text-gray-500">
    {userData.bio}
    </p>
    </div>
    
    <div className="px-8 py-6 bg-gray-50">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Favorite Study Spots</h2>
    <div className="flex flex-wrap gap-2">
    {userData.favoriteSpots.map((spot, index) => (
      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
      {spot}
      </span>
    ))}
    </div>
    </div>
    
    <div className="px-8 py-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Preferences</h2>
    <p className="text-lg text-gray-600 mb-4">
    Preferred Noise Level: <span className="font-semibold">{userData.noisePreference}</span>
    </p>
    
    {/* Noise preference buttons */}
    <div className="flex flex-wrap gap-2 mt-2">
      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm cursor-pointer hover:bg-green-200">
        Quiet
      </span>
      <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm cursor-pointer hover:bg-yellow-200">
        Chatter
      </span>
      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-200">
        Loud
      </span>
    </div>
    </div>
    
    <div className="px-8 py-6 bg-gray-50">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity</h2>
    <div className="flex justify-between items-center">
    <div>
    <p className="text-lg text-gray-600">Reviews</p>
    <p className="text-3xl font-bold text-indigo-600">{userData.reviewCount}</p>
    </div>
    <div>
    <p className="text-lg text-gray-600">Average Rating</p>
    <p className="text-3xl font-bold text-indigo-600">{userData.avgRating}</p>
    </div>
    </div>
    </div>
    
    {/* Conditional rendering based on user authentication */}
    {user ? (
      <div className="px-8 py-6">
      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
      Edit Profile
      </Button>
      </div>
    ) : (
      <div className="px-8 py-6">
      <ProfileLoginComponent />
      </div>
    )}
    </div>
    </div>
  );
}