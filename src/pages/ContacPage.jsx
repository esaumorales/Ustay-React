import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ContactSection from '@/sections/ContactSection';

export default function ContactPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        <ContactSection />
      </main>

      <Footer className='mt-auto' />
    </div>
  );
}