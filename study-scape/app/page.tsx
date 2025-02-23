import MapboxComponent from '@/components/MapboxComponent'
import { Button } from '@/components/ui/button'
import FloatingSearch from "@/components/FloatingSearch";
import { createClient } from '@/utils/supabase/server'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import LocationList from '@/components/LocationList'; // Import new component


export default async function Home() {
  const supabase = await createClient();
  const { data: locations } = await supabase.from('locations').select();

  return (
    <main>
      <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <FloatingSearch/>
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
          <Button className="hover:text-purple-500" style={{ position: "absolute", top: "50px", left: "50px" }}>
            Show All Locations
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className='max-h-screen overflow-y-auto scrollbar-hide'>
          
          <SheetHeader>
            <SheetTitle>Locations</SheetTitle>
          </SheetHeader>

          <LocationList locations={locations} />

        </SheetContent>
      </Sheet>
      </div>
    </main>
  )
}
