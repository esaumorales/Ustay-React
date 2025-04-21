import HomeSection from '@/sections/HomeSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        <HomeSection />
      </main>

      <Footer className='mt-auto' />
    </div>
  );
}
