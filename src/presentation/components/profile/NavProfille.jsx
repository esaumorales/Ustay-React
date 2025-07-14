import { CiLocationArrow1 } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { GoShieldCheck } from 'react-icons/go';
import { IoIosHelpCircleOutline, IoIosNotificationsOutline } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function NavProfile() {
    const navItems = [
        { icon: <FaRegUser />, text: 'Información del perfil', to: 'information' },
        { icon: <GoShieldCheck />, text: 'Formas de Inicio de sesión', to: 'security' },
        { icon: <IoIosNotificationsOutline />, text: 'Notificaciones', to: 'notifications' },
        { icon: <TbWorld />, text: 'Idioma', to: null }, 'separator',
        { icon: <CiLocationArrow1 />, text: 'Solicitar Partner', to: 'request-partner' },
        { icon: <IoIosHelpCircleOutline />, text: 'Centro de ayuda', to: 'help-center' },
    ];

    return (
        <div className='space-y-2'>
            <h1 className='font-bold'>Configuración</h1>
            {navItems.map((item, index) =>
                item === 'separator' ? (
                    <hr key={index} className='text-gray-400 my-2' />
                ) : (
                    <div key={index} className='flex items-center gap-2 mb-2'>
                        {item.icon}
                        {item.to ? (
                            <Link to={item.to}>{item.text}</Link>
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </div>
                )
            )}
        </div>
    );
}
