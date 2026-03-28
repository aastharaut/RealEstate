import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { login } from "../redux/slice/UserSlice";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", form);
      if (res.data.token && res.data.user) {
        // Save to localStorage
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(login(res.data.user));
        alert("Account created successfully! You are now logged in.");
        navigate("/dashboard");
      } else {
        alert("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h2 className="text-2xl font-bold">Signup</h2>

      <input
        placeholder="Name"
        className="border p-2 w-64"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        type="email"
        className="border p-2 w-64"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-64"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* Role Selection */}
      <div className="flex gap-4 w-64">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="BUYER"
            checked={form.role === "BUYER"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <span>Buyer</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="ADMIN"
            checked={form.role === "ADMIN"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <span>Admin</span>
        </label>
      </div>

      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-64 disabled:bg-gray-500"
      >
        {loading ? "Creating Account..." : "Signup"}
      </button>
    </div>
  );
};

export default Signup;
