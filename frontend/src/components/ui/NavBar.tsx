import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface NavbarProps {
  onLogout: () => void;
}

function Navbar({ onLogout }: NavbarProps) {
  const user = useSelector((state: RootState) => state.user.value.data);

  const navLinks = user
    ? [
        { path: "/", label: "Home" },
        { path: "/property", label: "Property" },
        { path: "/dashboard", label: "Dashboard" },
      ]
    : [{ path: "/", label: "Home" }];

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="text-xl font-bold text-mauve-600">BuyerPortal</div>
        <div className="flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-mauve-600 font-semibold"
                  : "text-gray-600 hover:text-mauve-600"
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && <button onClick={onLogout}></button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
