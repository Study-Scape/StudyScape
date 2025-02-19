import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: bookmarks } = await supabase.from('locations').select().not('isBookmarked', 'is', null)

  return (
    <main className='flex justify-center min-h-screen w-full py-8'>
        <div className='w-full max-w-3xl px-4'>
            {bookmarks?.map((location, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <span className="px-1 py-1 bg-slate-200 text-slate-600 text-sm rounded-full">
                      Bookmarked!
                </span>
                <br></br>
                {location.name}
                <p>{location.address}</p>
                  <div className='flex flex-wrap gap-1'>
                    {location.hasWifi && (<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {location.hasWifi}
                    </span>
                    )}
                    {location.hasFood && ( 
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {location.hasFood}
                    </span>
                    )}
                    {location.hasRestrooms && ( 
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {location.hasRestrooms}
                    </span>
                    )}
                    {location.hasPrinters && ( 
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {location.hasPrinters}
                    </span>
                    )}
                  </div>
                  <div>
                  <span className='text-red-600 px-2 bg-red-50 rounded-full'>{location.avgRating}</span><small><span className='text-red-600 text-xs pr-4'>stars</span></small>
                  <small><span className='text-green-600 text-xs'>noise level: </span></small><span className='text-green-600 rounded-full'>{location.soundLevel}</span>
                  </div>
                  <br></br>
                  <div>
                    <span className="py-1 text-blue-800 text-sm">
                      Accessibility:
                    </span>
                    <br></br>
                    <div className='flex flex-wrap gap-1'>
                    {location.hasElevator && (
                        <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full'>
                          {location.hasElevator}
                        </span>
                    )}
                    {location.quietSpaces && (
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                          {location.quietSpaces}
                        </span>
                    )}
                    {location.hasBikeRack && (
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                          {location.hasBikeRack}
                        </span>
                    )}
                    </div>
                  </div>
              </div>
            ))}
          </div>
    </main>
  )
}
