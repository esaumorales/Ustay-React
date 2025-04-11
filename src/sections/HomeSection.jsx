import Associated from '@components/Associated';
import Hero from '@components/Hero';
import Quarters from '@components/Quarters';
import Contact from '@components/Contact';

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
