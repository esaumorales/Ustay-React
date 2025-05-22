import React from 'react';
import IMSLOGO from '@/presentation/assets/img/IMS-logo.webp'
import { FaHouse } from "react-icons/fa6";

export default function PropertyHeader({ title, descripcion }) {
    return (
        <div className='bg-[#111827] shadow-sm border-t-4'>
            <div className='flex justify-between items-center text-white'>
                <div className='flex flex-col items-start gap-2 mx-6 my-2 w-240'>
                    <div className='flex items-center gap-4'>
                        <FaHouse size={24} />
                        <span className='text-3xl font-semibold'>{title}</span>
                        <span></span>
                    </div>
                    <p className='text-[14px]'>{descripcion}</p>
                </div>
                <div className='w-64 h-36 overflow-hidden flex items-end'>
                    <img src={IMSLOGO} alt='Property' className='object-contain ' />
                </div>
            </div>
        </div>
    );
}