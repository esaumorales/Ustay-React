import ModalLogin from './ModalLogin'
import ModalRegister from './ModalRegister'
import { Link, useLocation } from 'react-router-dom'
import { IconLogo } from '@/assets/icons/icon-logo'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'

const LINKS = [
    {
        name: 'Home',
        href: '/home',
        label: 'home'
    },
    {
        name: 'Encuentra Tu cuarto',
        href: '/room',
        label: 'cuarto'
    },
    {
        name: 'Nosotros',
        href: '/contact',
        label: 'nosotros'
    },
    {
        name: 'Favoritos',
        href: '/favorite',
        label: 'favoritos'
    },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const loginModal = useModal();
    const registerModal = useModal();

    return (
        <header className='mt-4 px-4 md:px-4 lg:px-8'>
            <div className='flex justify-between md:justify-between items-center px-16'>
                {/* Logo */}
                <div className='flex flex-wrap items-center'>
                    <IconLogo className='w-8 h-8 md:w-10 md:h-10' />
                    <p className='text-2xl md:text-3xl font-medium font-[KadwaR]'>Stay</p>
                </div>

                {/* Mobile Menu Button */}
                <button className='md:hidden'
                    onClick={
                        () => setIsMenuOpen(!isMenuOpen)
                    }>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        {
                            isMenuOpen ? (
                                <path strokeLinecap='round' strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path strokeLinecap='round' strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16' />
                            )
                        } </svg>
                </button>

                {/* Navigation Links - Desktop */}
                <nav className='hidden md:flex gap-2 px-1 py-1 rounded-3xl bg-secondary mr-0 md:-mr-28'>
                    {
                        LINKS.map(({ name, label, href }) =>
                            <Link to={href} aria-label={label} key={`header-${name}-1`}
                                className={`px-4 py-1 rounded-2xl ${pathname === href ? 'text-black bg-white' : 'text-white transition-colors duration-200 hover:text-black  hover:bg-white active:scale-95'}`}>
                                {name}
                            </Link>
                        )
                    }
                </nav>

                {/* Auth Buttons - Desktop */}
                <div className='hidden md:flex gap-4'>
                    <button onClick={
                        loginModal.openModal
                    }
                        className='hover:text-secondary'>
                        Iniciar Sesion
                    </button>
                    <button onClick={
                        registerModal.openModal
                    }
                        className='border border-secondary rounded-xl px-3 py-1 hover:bg-secondary hover:text-white transition-colors'>
                        ¡Registrate Ahora!
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className='md:hidden mt-4 pb-4'>
                        <nav className='flex flex-col gap-4 bg-white rounded-xl p-4'>
                            {
                                LINKS.map(({ name, label, href }) =>
                                    <Link to={href} aria-label={label} key={`header-${name}-2`}
                                        className={`text-secondary px-2 py-1 ${pathname === href ? 'underline font-medium' : 'hover:underline'}`}>
                                        {name}
                                    </Link>
                                )
                            }
                        </nav>
                        <div className='flex flex-col gap-3 mt-4 items-center'>
                            <button onClick={
                                loginModal.openModal
                            }
                                className='w-full text-center hover:text-secondary'>
                                Iniciar Sesion
                            </button>
                            <button onClick={
                                registerModal.openModal
                            }
                                className='w-full border border-secondary rounded-xl px-3 py-1 hover:bg-secondary hover:text-white transition-colors'>
                                ¡Registrate Ahora!
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Modals */}
            <ModalLogin isOpen={
                loginModal.isOpen
            }
                onClose={
                    loginModal.closeModal
                }
                onSwitchToRegister={
                    () => {
                        loginModal.closeModal();
                        registerModal.openModal();
                    }
                } />
            <ModalRegister isOpen={
                registerModal.isOpen
            }
                onClose={
                    registerModal.closeModal
                }
                onSwitchToLogin={
                    () => {
                        registerModal.closeModal();
                        loginModal.openModal();
                    }
                } />
        </header>
    );
}
