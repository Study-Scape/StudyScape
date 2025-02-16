import MapboxComponent from '@/components/MapboxComponent';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
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
      <Button
        style={{
        position: "absolute",
        top: "50px",
        left: "50px",
        }}
        asChild
      >
        <Link href="./locations">Show All Locations</Link>
      </Button>
      </div>
    </main>
  );
}
