import { useEffect, useState } from 'react'
import { getRoomsByPartner } from '@/infrastructure/services/property.service'
import LOGOROOM from '@/presentation/assets/img/room.png'
import { FaClock, FaEdit, FaTrash, FaEye, FaPlus, FaMinus, FaRedo } from 'react-icons/fa'
import Paginator from '../../common/Paginator'
import PointsHeader from '../../components/PointsHeader'
const PAGE_SIZE = 6

const ListPromotion = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [filtros, setFiltros] = useState({
        propiedad: '',
        piso: '',
        numero: '',
        promocion: ''
    })

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true)
            try {
                const partnerId = localStorage.getItem('userId')
                if (!partnerId) return setRooms([])
                const data = await getRoomsByPartner(partnerId)
                setRooms(data?.cuartos || [])
            } catch (error) {
                console.error(error)
                setRooms([])
            } finally {
                setLoading(false)
            }
        }
        fetchRooms()
    }, [])

    const handleFilterChange = (e) => {
        setPage(1)
        setFiltros({ ...filtros, [e.target.name]: e.target.value })
    }

    const filtrarCuartos = () => {
        return rooms.filter((r) => {
            const f = filtros
            return (
                (!f.propiedad || r.propiedad.direccion?.includes(f.propiedad)) &&
                (!f.piso || (r.n_piso != null && r.n_piso.toString() === f.piso)) &&
                (!f.numero || (r.n_cuarto != null && r.n_cuarto.toString() === f.numero)) &&
                (!f.promocion || (r.promocion?.estado || 'Inactiva') === f.promocion)
            )
        })
    }

    const cuartosFiltrados = filtrarCuartos()
    const totalPages = Math.ceil(cuartosFiltrados.length / PAGE_SIZE)
    const paginatedRooms = cuartosFiltrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const headers = [
        'Imagen', 'Nº', 'Piso', 'Estado',
        'Promoción', 'Plan', 'F. Inicial de Prom.',
        'F. Final de Prom.', 'Días Restantes', 'Opciones'
    ]

    const renderEstado = (disponible) => (
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${disponible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {disponible ? 'Disponible' : 'Ocupado'}
        </span>
    )

    const renderPromocion = (promo) => {
        if (!promo) return (
            <span className="flex items-center gap-2 text-red-500">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Inactiva
            </span>
        )
        const colores = {
            Activa: 'text-green-500',
            Inactiva: 'text-red-500',
            Finalizada: 'text-gray-400'
        }
        return (
            <span className={`flex items-center gap-2 ${colores[promo.estado]}`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {promo.estado}
            </span>
        )
    }

    const calcularDiasRestantes = (fechaFin) => {
        if (!fechaFin) return '-'
        const diff = Math.ceil((new Date(fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        return `${Math.max(diff, 0)} días`
    }

    if (loading) return <div className="text-center py-4">Cargando...</div>
    if (!rooms.length) return <div className="text-center py-4">Aún no tienes cuartos para promocionar</div>

    return (
        <div className="mx-8 mt-10 mb-4">
            <PointsHeader puntos={100} ultimaRecarga="19/06/2025 - 12:48 p.m." />
            <div className="flex flex-wrap gap-4 mb-6 items-end">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Propiedad:</label>
                    <select name="propiedad" value={filtros.propiedad} onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm min-w-[160px]">
                        <option value="">Seleccione</option>
                        {[...new Set(rooms.map(r => r.propiedad?.direccion))].map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Piso:</label>
                    <select name="piso" value={filtros.piso} onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm min-w-[120px]">
                        <option value="">Seleccione</option>
                        {[...new Set(rooms.map(r => r.n_piso))].map(p => (
                            <option key={p} value={p}>{p}°</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Cuartos:</label>
                    <select name="numero" value={filtros.numero} onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm min-w-[120px]">
                        <option value="">Seleccione</option>
                        {[...new Set(rooms.map(r => r.n_cuarto))].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Promoción:</label>
                    <select name="promocion" value={filtros.promocion} onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm min-w-[140px]">
                        <option value="">Seleccione</option>
                        {['Activa', 'Inactiva', 'Finalizada'].map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                <div className="ml-auto">
                    <button
                        onClick={() => setPage(1)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border px-4 py-1.5 rounded text-sm text-gray-700"
                    >
                        <FaEye />
                        Filtrar
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-200 rounded-md">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            {headers.map(h => (
                                <th key={h} className="px-4 py-2 whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {paginatedRooms.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length} className="text-center py-6 text-gray-500 italic">
                                    No se encontraron cuartos con los filtros seleccionados.
                                </td>
                            </tr>
                        ) : paginatedRooms.map((r) => (
                            <tr key={r.cuarto_id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    <img src={r.fotos?.[0] || LOGOROOM} alt="cuarto" className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2">{r.n_cuarto}</td>
                                <td className="px-4 py-2">{r.n_piso}°</td>
                                <td className="px-4 py-2">{renderEstado(r.disponibilidad)}</td>
                                <td className="px-4 py-2">{renderPromocion(r.promocion)}</td>
                                <td className="px-4 py-2">{r.promocion?.plan || '-'}</td>
                                <td className="px-4 py-2">{r.promocion?.fecha_inicio || '-'}</td>
                                <td className="px-4 py-2">{r.promocion?.fecha_fin || '-'}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center gap-1 text-yellow-600">
                                        <FaClock />
                                        <span>{r.promocion?.fecha_fin ? calcularDiasRestantes(r.promocion.fecha_fin) : '-'}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center gap-3 text-gray-600 text-base">
                                        {!r.promocion && <button title="Activar"><FaPlus /></button>}
                                        {r.promocion?.estado === 'Activa' && <button title="Desactivar"><FaMinus /></button>}
                                        {r.promocion?.estado === 'Finalizada' && <button title="Renovar"><FaRedo /></button>}
                                        <button title="Ver"><FaEye /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Paginator
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        </div>
    )
}

export default ListPromotion
