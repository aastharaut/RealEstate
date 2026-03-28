import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BuyerDashboard from "../pages/BuyerDashboard";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/dashboard", Component: BuyerDashboard },
]);
function Index() {
  return <RouterProvider router={router} />;
}

export default Index;
