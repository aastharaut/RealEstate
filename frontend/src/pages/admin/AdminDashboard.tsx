import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

const AdminDashboard = () => {
  const user = useSelector((state: RootState) => state.user.value.data);

  if (user?.role === "BUYER") {
    return <Navigate to="/dashboard" replace />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-purple-50 rounded-lg p-6 mb-8">
        <p className="text-lg">
          Welcome, <span className="font-semibold">{user.name}</span>!
        </p>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      {/*property form  */}
      <div className="text-center py-8 text-gray-500">
        Add property form will appear here
      </div>
    </div>
  );
};

export default AdminDashboard;
