import { InView } from 'react-intersection-observer';
import useCountAnimate from '@/presentation/hooks/useCountAnimate';

export default function Associated() {
  const partner = useCountAnimate(InView, 40, 2000);
  const avaible = useCountAnimate(InView, 30, 2000);
  const satisfied = useCountAnimate(InView, 100, 2000);
  const user = useCountAnimate(InView, 120, 2000);

  const metrics = [
    { label: 'Partner Asociados', value: partner, suffix: '+' },
    { label: 'Inmobiliarios Disponibles', value: avaible, suffix: '+' },
    { label: 'Partners Satisfechos', value: satisfied, suffix: '%' },
    { label: 'Usuarios Activos', value: user, suffix: '+' },
  ];

  return (
    <div className='flex flex-wrap my-12 justify-around'>
      {metrics.map((metric, index) => (
        <div key={index} className='flex flex-col gap-2 border-t-4 border-t-secondary p-4 rounded-br-2xl rounded-tl-2xl shadow-sm'>
          <h1 className='font-semibold text-3xl text-center'>
            {metric.value} {metric.suffix}
          </h1>
          <p className='font-light whitespace-pre-line'>{metric.label}</p>
        </div>
      ))}
    </div>
  );
}
