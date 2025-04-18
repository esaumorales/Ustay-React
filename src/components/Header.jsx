import ModalLogin from './ModalLogin'
import ModalRegister from './ModalRegister'
import { Link } from 'react-router-dom'
import { IconLogo } from '../assets/icons/icon-logo'
import { useState } from 'react'
import { useModal } from '../hooks/useModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loginModal = useModal();
  const registerModal = useModal();

  return (
    <header className='mt-4 px-4 md:px-6 lg:px-8'>
      <div className='flex justify-between md:justify-around items-center'>
        {/* Logo */}
        <div className='flex flex-wrap items-center'>
          <IconLogo className='w-8 h-8 md:w-10 md:h-10' />
          <p className='text-2xl md:text-3xl font-medium'>Stay</p>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            {isMenuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>

        {/* Navigation Links - Desktop */}
        <nav className='hidden md:flex gap-4 px-4 py-1 rounded-3xl bg-secondary mr-0 md:-mr-28'>
          <Link
            to='/home'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-4 py-[4px] rounded-2xl'>
            Home
          </Link>
          <Link
            to='/room'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-4 py-[4px]  rounded-2xl'>
            Encuentra Tu cuarto
          </Link>
          <Link
            to='/contact'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-4 py-[4px] rounded-2xl'>
            Nosotros
          </Link>
          <Link
            to='/home'
            className='text-white transition-colors duration-200 hover:text-black hover:bg-white px-4 py-[4px] rounded-2xl'>
            Asociados
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className='hidden md:flex gap-4'>
          <button
            onClick={loginModal.openModal}
            className='hover:text-secondary'>
            Iniciar Sesion
          </button>
          <button
            onClick={registerModal.openModal}
            className='border border-secondary rounded-xl px-3 py-1 hover:bg-secondary hover:text-white transition-colors'>
            ¡Registrate Ahora!
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden mt-4 pb-4'>
          <nav className='flex flex-col gap-4 bg-white rounded-xl p-4'>
            <Link
              to='/home'
              className='text-secondary px-2 py-1'>
              Home
            </Link>
            <Link
              to='/home'
              className='text-secondary px-2 py-1'>
              Encuentra Tu cuarto
            </Link>
            <Link
              to='/room'
              className='text-secondary px-2 py-1'>
              Nosotros
            </Link>
            <Link
              to='/contact'
              className='text-secondary px-2 py-1'>
              Asociados
            </Link>
          </nav>
          <div className='flex flex-col gap-3 mt-4 items-center'>
            <button
              onClick={loginModal.openModal}
              className='w-full text-center hover:text-secondary'>
              Iniciar Sesion
            </button>
            <button
              onClick={registerModal.openModal}
              className='w-full border border-secondary rounded-xl px-3 py-1 hover:bg-secondary hover:text-white transition-colors'>
              ¡Registrate Ahora!
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ModalLogin
        isOpen={loginModal.isOpen}
        onClose={loginModal.closeModal}
        onSwitchToRegister={() => {
          loginModal.closeModal();
          registerModal.openModal();
        }}
      />
      <ModalRegister
        isOpen={registerModal.isOpen}
        onClose={registerModal.closeModal}
        onSwitchToLogin={() => {
          registerModal.closeModal();
          loginModal.openModal();
        }}
      />
    </header>
  );
}
