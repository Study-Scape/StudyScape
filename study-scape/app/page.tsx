import MapboxComponent from '@/components/MapboxComponent';
import { createClient } from '@/utils/supabase/server'
import AllLocations from '@/components/realtime-locations-sheet';
import AddLocationButton from '@/components/AddLocationButton';

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from('locations').select();

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
          <AllLocations serverLocations={ data ?? []} />
        </div>
      </div>
    </main>
  );
}