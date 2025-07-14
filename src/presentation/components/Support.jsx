import { MdOutlinePhone } from 'react-icons/md';
import { LuShieldCheck } from 'react-icons/lu';
import { SlEarphonesAlt } from 'react-icons/sl';

const supportItems = [
    {
        icon: <MdOutlinePhone size={32} className='text-white' />,
        title: 'CONTACTO DIRECTO CON LOS PARTNERS',
        description: 'Habla directamente con quien publica el cuarto, sin intermediarios ni comisiones.',
    },
    {
        icon: <LuShieldCheck size={32} className='text-white' />,
        title: 'CUARTOS VERIFICADOS',
        description: 'Revisión manual para asegurar que cada publicación sea real y confiable.',
    },
    {
        icon: <SlEarphonesAlt size={32} className='text-white' />,
        title: 'SOPORTE RÁPIDO Y AMIGABLE',
        description: 'Atención y respuestas claras para dudas sobre cuartos o procesos, todos los días.',
    },
];

export default function Support() {
    return (
        <div className='flex justify-center my-4 flex-wrap gap-4'>
            {supportItems.map((item, index) => (
                <div key={index} className='w-96 flex items-center flex-col'>
                    <div className='rounded-full border-10 border-gray-400'>
                        <span className='block rounded-full border-1 p-3 bg-secondary-dark'>
                            {item.icon}
                        </span>
                    </div>
                    <div className='text-center space-y-2 mt-2'>
                        <h1 className='font-bold'>{item.title}</h1>
                        <span>{item.description}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
