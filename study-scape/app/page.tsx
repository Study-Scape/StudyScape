import MapboxComponent from '@/components/MapboxComponent';

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100vh' }}>
      <MapboxComponent />
    </main>
  );
}
