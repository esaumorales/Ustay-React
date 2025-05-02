// import Carousel from './Carousel';
import Carrousel from '@/components/NewCarrousel';

export default function Quarters() {
  return (
    <div className='flex justify-center text-center '>
      <div className='flex flex-col gap-4'>
        <div>
          <h1 className='text-4xl font-semibold'>Inmobiliarias del momento</h1>
        </div>
        <div>
          <Carrousel />
        </div>
      </div>
    </div>
  );
}
