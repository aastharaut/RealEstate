import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface NavbarProps {
  onLogout: () => void;
}

function Navbar({ onLogout }: NavbarProps) {
  const user = useSelector((state: RootState) => state.user.value.data);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/property", label: "Property" },
    ...(user ? [{ path: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="text-xl font-bold text-purple-900">BuyerPortal</div>
        <div className="flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-900 font-semibold"
                  : "text-gray-600 hover:text-purple-900"
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <button
              onClick={onLogout}
              className="ml-4 text-gray-600 hover:text-purple-900"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
