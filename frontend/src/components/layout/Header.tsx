import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/UserSlice";
import { LogOut, User } from "lucide-react";
import type { RootState } from "../../redux/store";
import Navbar from "../ui/NavBar";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value.data);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // match your login token
    dispatch(logout());
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-purple-900 text-white px-6 py-2 flex justify-between items-center text-sm">
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 hover:text-gray-200"
            >
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 hover:text-gray-200"
            >
              <User size={14} /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Navbar */}
      <Navbar onLogout={handleLogout} />
    </>
  );
}

export default Header;
