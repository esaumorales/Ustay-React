import Footer from '@components/Footer'
import Header from '@components/Header'
import RoomSection from '../sections/roomsection';

export default function RoomPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        <RoomSection />
      </main>

      <Footer className='mt-auto' />
    </div>
  );
}
