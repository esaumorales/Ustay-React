import { InView } from 'react-intersection-observer';
import useCountAnimate from '@/hooks/useCountAnimate';

export default function Associated() {
  const partner = useCountAnimate(InView, 40, 2000);
  const avaible = useCountAnimate(InView, 30, 2000);
  const satisfied = useCountAnimate(InView, 100, 2000);

  return (
    <div className='flex flex-wrap my-12 justify-around'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-3xl'>{partner} +</h1>
        <p className='font-light'>Partner Asociados</p>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-3xl'>{avaible} +</h1>
        <p className='font-light'>
          Inmobiliarios Disponibles a <br /> través de nuestros Partners
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-3xl'>{satisfied} %</h1>
        <p className='font-light'>Partners Satisfechos</p>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-3xl'>{partner} +</h1>
        <p className='font-light'>Partner Asociados</p>
      </div>
    </div>
  );
}
