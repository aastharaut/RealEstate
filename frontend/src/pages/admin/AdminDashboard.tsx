import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import api from "../../api/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const user = useSelector((state: RootState) => state.user.value.data);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    image_url: "",
  });

  if (user?.role === "BUYER") {
    return <Navigate to="/dashboard" replace />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/properties", {
        ...formData,
        price: parseFloat(formData.price.replace(/,/g, "")),
      });
      toast.success("Property added successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        address: "",
        image_url: "",
      });
    } catch (error) {
      toast.error("Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-purple-50 rounded-lg p-6 mb-8">
        <p className="text-lg">
          Welcome, <span className="font-semibold">{user.name}</span>!
        </p>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Property</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
              value={formData.title}
              onChange={handleChange}
              placeholder="Beautiful Beach House"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the property..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Price (Rs.) *
              </label>
              <input
                type="number"
                name="price"
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
                value={formData.price}
                onChange={handleChange}
                placeholder="250000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <input
              type="text"
              name="address"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
              value={formData.address}
              onChange={handleChange}
              placeholder="Chandol, Kathmandu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image_url"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/house.jpg"
            />
            {formData.image_url && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="mt-1 h-32 w-32 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mauve-600 text-white px-6 py-2 rounded-lg hover:bg-mauve-700 disabled:bg-gray-400 transition"
          >
            {loading ? "Adding Property..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
