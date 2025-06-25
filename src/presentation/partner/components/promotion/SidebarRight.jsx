import { FaStar, FaRegStar } from 'react-icons/fa'
import { FiZap } from 'react-icons/fi'
import LOGOROOM from '@/presentation/assets/img/room.png'

const SidebarRight = ({
    visible,
    room,
    onClose,
    onActivate,
    userPoints = 100,
    costPoints = 30,
    period = 'Mes',
    endDate = '16/07/2025'
}) => {
    if (!visible || !room) return null

    const rows = [
        ['Tus puntos:', `${userPoints} pts.`],
        ['Puntos a usar:', `${costPoints} pts.`],
        ['Fecha final:', endDate]
    ]

    const renderStars = rating =>
        [...Array(5)].map((_, i) =>
            i < rating
                ? <FaStar key={i} className="text-orange-500" />
                : <FaRegStar key={i} className="text-gray-300" />
        )

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* panel derecho */}
            <aside className="absolute top-0 right-0 w-96 h-full bg-white shadow-lg p-8 z-30 overflow-y-auto">
                <div className='flex justify-end'>
                    <button onClick={onClose} className="self-end text-xl leading-none">×</button>
                </div>

                <h2 className="text-lg font-semibold">Promocionar inmueble</h2>

                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Periodo</span>
                    <select defaultValue={period} className="border px-3 py-2 rounded text-sm">
                        <option value="Semana">Semana</option>
                        <option value="Mes">Mes</option>
                    </select>
                </label>

                <div className="border-t pt-4 space-y-2 text-sm">
                    {rows.map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                            <span className="text-gray-600">{k}</span>
                            <span className="font-medium">{v}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 space-y-4">
                    <h3 className="text-sm font-semibold text-center">Detalles el inmueble</h3>

                    <img
                        src={room.fotos?.[0] || LOGOROOM}
                        alt={room.nombre}
                        className="w-32 h-32 object-cover rounded-md mx-auto"
                        draggable="false"
                    />

                    <div className="text-start text-sm space-y-1">
                        <p className="font-medium">{room.nombre}</p>
                        <p className="text-gray-500">{room.propiedad?.direccion}</p>
                        {/* <p className="text-gray-500">Cuarto</p> */}

                        <div className="flex justify-between items-center">
                            <p className="font-semibold">
                                <sup>S/</sup>{room.precio}
                                <span className="text-gray-500 text-xs"> /Mes</span>
                            </p>
                            <div className="flex gap-1">{renderStars(room.valoracion)}</div>
                        </div>
                    </div>

                    <button
                        onClick={onActivate}
                        className="w-full flex items-center justify-center gap-2 bg-secondary text-white py-2 rounded hover:bg-secondary/90 transition"
                    >
                        Activar
                        <FiZap className="w-4 h-4" />
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default SidebarRight
