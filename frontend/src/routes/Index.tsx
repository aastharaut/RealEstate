import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BuyerDashboard from "../pages/BuyerDashboard";
import Property from "../pages/Property";
import ProtectedRoute from "../components/ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // header + main layout
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/property", element: <Property /> },

      // Protected routes
      {
        element: <ProtectedRoute />, // checks if user logged in
        children: [{ path: "/dashboard", element: <BuyerDashboard /> }],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
