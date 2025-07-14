import Associated from '@/presentation/components/Associated';
import Hero from '@/presentation/components/Hero';
import Quarters from '@/presentation/components/Quarters';
import Contact from '@/presentation/components/Contact';
import BedInformation from '../components/BedInformation';
import Support from '../components/Support';
import Testimonials from '../components/Testimonials';

export default function HomeSection() {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <Associated />
      </div>
      <div>
        <Quarters />
      </div>
      <div>
        <BedInformation />
      </div>
      <div>
        <Contact />
      </div>
      <div>
        <Support />
      </div>
      <div>
        <Testimonials />
      </div>
    </div>
  );
}
