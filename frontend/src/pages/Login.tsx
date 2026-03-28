import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { login } from "../redux/slice/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(login(res.data.user));
      if (res.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/property");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        placeholder="Email"
        type="email"
        className="border p-2 w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-64 disabled:bg-gray-500"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
