import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', to: '/IMS/dashboard', color: '#4B0082' },
  { name: 'Propiedad', to: '/IMS/property', color: '#FF7F00' },
  { name: 'Cuartos', to: '/IMS/room', color: '#C71585' },
  { name: 'Promociones', to: '/IMS/promotion', color: '#FFD700' },
  { name: 'Seguridad', to: '/IMS/security', color: '#00BFFF' },
  { name: 'Soporte', to: '/IMS/support', color: '#9ACD32' },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="flex border-gray-300 mx-8">
      {menuItems.map(({ name, to, color }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={name}
            to={to}
            className="relative flex-1 text-center py-1 font-semibold text-black no-underline"
          >
            {name}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: color }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
