import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/slice/UserSlice";
import Router from "./routes/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch(login(userData));
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }
    setIsRestored(true);
  }, [dispatch]);

  if (!isRestored) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
