import { useEffect, useState } from 'react';
import { fetchProfile } from '@/infrastructure/services/user.service'; // Importa la clase completa
import { MdEdit } from 'react-icons/md';
import { CgAddR } from 'react-icons/cg';

export default function InformationProfile() {
    const [profile, setProfile] = useState({
        nombre: '',
        apellido_pa: '',
        apellido_ma: '',
        correo_electronico: '',
        telefono: '',
        dniFrontal: '',
        dniTrasero: '',
        fecha_registro: ''
    });

    function formatDateTime(dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // enero = 0
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
        return `${day}/${month}/${year} - ${formattedTime}`;
    }
    useEffect(() => {
        async function loadProfile() {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const data = await fetchProfile();
                setProfile(data.user);
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
            }
        }
        loadProfile();
    }, []);


    return (
        <div className='mx-32'>
            <h1 className='font-bold text-lg mb-4'>Información de perfil</h1>

            <div className='space-y-6'>
                <div className='flex flex-col border-b pb-2'>
                    <div className='flex **:gap-1 text-primary cursor-pointer items-center justify-end'>
                        <MdEdit />
                        <span>Editar</span>
                    </div>
                    <div className='flex justify-center '>
                        <img
                            src={profile.foto_google}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full object-cover "
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center border-b pb-2'>
                    <div>
                        <p className='font-semibold'>Nombres</p>
                        <span>{profile.nombre}</span>
                    </div>
                    <div className='flex items-center gap-1 text-primary cursor-pointer'>
                        <MdEdit />
                        <span>Editar</span>
                    </div>
                </div>

                <div className='flex justify-between items-center border-b pb-2'>
                    <div>
                        <p className='font-semibold'>Apellidos</p>
                        <span>{profile.apellido_pa} {profile.apellido_ma}</span>
                    </div>
                    <div className='flex items-center gap-1 text-primary cursor-pointer'>
                        <MdEdit />
                        <span>Editar</span>
                    </div>
                </div>

                <div className='flex justify-between items-center border-b pb-2'>
                    <div>
                        <p className='font-semibold'>Correo</p>
                        <span>{profile.correo_electronico}</span>
                    </div>
                    <div className='flex items-center gap-1 text-primary cursor-pointer'>
                        <MdEdit />
                        <span>Editar</span>
                    </div>
                </div>

                <div className='flex justify-between items-center border-b pb-2'>
                    <div>
                        <p className='font-semibold'>Número de teléfono <span className='text-gray-500'>(Partner)</span></p>
                        <p className='text-sm text-gray-600'>{profile.telefono}</p>
                    </div>
                    <span className='text-primary cursor-pointer flex items-center gap-1'><CgAddR /> Agregar</span>
                </div>

                <div className='flex justify-between items-center border-b pb-2'>
                    <div>
                        <p className='font-semibold'>Foto delantera del DNI <span className='text-gray-500'>(Partner)</span></p>
                        <span>{profile.dniFrontal}</span>
                    </div>
                    <div className='flex items-center gap-1 text-primary cursor-pointer'>
                        <MdEdit />
                        <span>Editar</span>
                    </div>
                </div>

                <div className='flex justify-between items-center border-b pb-2'>
                    <div>
                        <p className='font-semibold'>Foto trasera del DNI <span className='text-gray-500'>(Partner)</span></p>
                        <span>{profile.dniTrasero}</span>
                    </div>
                    <span className='text-primary cursor-pointer flex items-center gap-1'><CgAddR /> Agregar</span>
                </div>

                <div>
                    <p className='font-semibold'>Fecha de registro</p>
                    <span>{formatDateTime(profile.fecha_registro)}</span>
                </div>

            </div>
        </div>
    );
}
