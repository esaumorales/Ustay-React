// import Carousel from './Carousel';
import Carrousel from '@/presentation/user/components/NewCarrousel';

export default function Quarters() {
  return (
    <div className='flex justify-center text-center '>
      <div className='flex flex-col gap-4'>
        <div>
          <span className='text-gray-600 text-xl'>Nuestros inmuebles</span>
          <h1 className='text-4xl font-bold bg-gradient-to-l from-orange-400 via-orange-600 to-orange-800 bg-clip-text text-transparent'>Explora en nuestra amplia lista</h1>
        </div>
        <div>
          <Carrousel />
        </div>
      </div>
    </div>
  );
}
