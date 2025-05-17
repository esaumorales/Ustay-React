import Associated from '@/presentation/components/Associated';
import Hero from '@/presentation/components/Hero';
import Quarters from '@/presentation/components/Quarters';
import Contact from '@/presentation/components/Contact';

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
        <Contact />
      </div>
    </div>
  );
}
