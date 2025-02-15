import MapboxComponent from '@/components/MapboxComponent';

export default function Home() {
  return (
    <main>
      <div style={{ position: 'absolute', right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '81vh', width: '81vw' }} suppressHydrationWarning={true}>
        <MapboxComponent />
      </div>
    </main>
  );
}
