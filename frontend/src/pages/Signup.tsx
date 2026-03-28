import { useState } from "react";
import api from "../api/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // role:""
  });

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", form);
      alert("User created!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h2 className="text-2xl font-bold">Signup</h2>

      <input
        placeholder="Email"
        className="border p-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleSignup} className="bg-black text-white px-4 py-2">
        Signup
      </button>
    </div>
  );
};

export default Signup;
