export default function ProfilePage() {
  const user = {
    name: "Jane Doe",
    username: "@jane_studious",
    bio: "Passionate learner | Coffee enthusiast | Always seeking quiet study spots",
    favoriteSpots: ["UW Engineering Library", "Odegaard Undergraduate Library"],
    noisePreference: "Quiet",
    reviewCount: 15,
    avgRating: 4.2,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {user.username}
          </div>
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {user.name}
          </h1>
          <p className="mt-2 text-xl text-gray-500">
            {user.bio}
          </p>
        </div>
        
        <div className="px-8 py-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Favorite Study Spots</h2>
          <div className="flex flex-wrap gap-2">
            {user.favoriteSpots.map((spot, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {spot}
              </span>
            ))}
          </div>
        </div>
        
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Preferences</h2>
          <p className="text-lg text-gray-600">
            Preferred Noise Level: <span className="font-semibold">{user.noisePreference}</span>
          </p>
        </div>
        
        <div className="px-8 py-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg text-gray-600">Reviews</p>
              <p className="text-3xl font-bold text-indigo-600">{user.reviewCount}</p>
            </div>
            <div>
              <p className="text-lg text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-indigo-600">{user.avgRating}/5</p>
            </div>
          </div>
        </div>
        
        <div className="px-8 py-6">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
