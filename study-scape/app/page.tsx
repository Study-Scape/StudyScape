import MapboxComponent from '@/components/MapboxComponent'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: locations } = await supabase.from('locations').select()

  return (
    <main>
      <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
        <div 
          style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          }}
        >
        <MapboxComponent />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button style={{ position: "absolute", top: "50px", left: "50px" }}>
            Show All Locations
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Locations</SheetTitle>
          </SheetHeader>
          <div>
            {locations?.map((location, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                  <div>
                    {location.hasWifi && (<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      WiFi
                    </span>
                    )}
                    {location.hasOutlets && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Power Outlets
                      </span>
                    )}
                    {location.hasRestroom && ( 
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Restrooms
                    </span>
                    )}
                  </div>
                  {location.avgRating}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      </div>
    </main>
  )
}
