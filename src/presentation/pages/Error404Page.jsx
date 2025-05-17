import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404Page() {
    return (
        <main className='flex justify-center w-full h-full m-auto'>
            <div className='my-24 text-center'>
                <h1 className='font-bold text-9xl'>Error 404</h1>
                {/* <p>La página que estás buscando no existe.</p>
                <p>Por favor, intenta de nuevo.</p> */}
                <Link
                    to='/home'
                    className='hover:underline'
                >Regresar a pagina Principal</Link>
            </div>
        </main>
    );

}