import BEDINFORMATION from '@/presentation/assets/img/bed-information.webp'

export default function BedInformation() {
    return (
        <div className='flex justify-center my-4 flex-col items-center'>
            <div className='text-center w-216 '>
                <h1 className='text-orange-500 text-2xl'>
                    EN <strong>USTAY</strong> ENCONTRARÁS PUBLICACIONES DE <strong>INMUEBLES</strong> DE DIFERENTES <strong>PROPIETARIOS</strong>,
                    PENSADOS PARA QUIENES BUSCAN UN ESPACIO <strong>ACCESIBLE, CÓMODO</strong> Y <strong>DIGNO</strong> PARA ESTUDIAR,
                    DESCANSAR Y VIVIR TRANQUILOS.</h1>
            </div>
            <div>
                <img src={BEDINFORMATION} alt="" className='drop-shadow-2xl' />
            </div>
        </div>
    )
}