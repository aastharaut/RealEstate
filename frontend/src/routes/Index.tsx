import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BuyerDashboard from "../pages/BuyerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Property from "../pages/Property";
import ProtectedRoute from "../components/ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/property", element: <Property /> },

      //user must be logged in
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <BuyerDashboard /> },
          // Admin dashboard
          { path: "/admin", element: <AdminDashboard /> },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
