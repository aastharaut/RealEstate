import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slice/UserSlice";
import { LogOut, User, UserPlus } from "lucide-react";
import type { RootState } from "../../redux/store";
import Navbar from "../ui/NavBar";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value.data);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(logout());
  };
  return (
    <>
      {/* Top bar */}
      <div className="bg-mauve-600 text-white px-6 py-2 flex justify-between items-center text-sm">
        <div className="flex gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 hover:text-gray-200"
            >
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1.5 hover:text-gray-200"
              >
                <User size={14} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1.5 hover:text-gray-200"
              >
                <UserPlus size={14} /> Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Navbar */}
      <Navbar onLogout={handleLogout} />
    </>
  );
}

export default Header;
