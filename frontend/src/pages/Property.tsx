import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import PropertyCard from "../components/ui/PropertyCard";
import api from "../api/api";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  image_url: string;
}

const Property = () => {
  const user = useSelector((state: RootState) => state.user.value.data);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    image_url: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/properties");
      const data = res.data;
      setProperties(Array.isArray(data) ? data : data.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter((p) => p.id !== id));
      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property.");
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setEditFormData({
      title: property.title,
      description: property.description || "",
      price: property.price.toLocaleString(),
      address: property.address,
      image_url: property.image_url || "",
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    try {
      const updatedProperty = {
        ...editingProperty,
        title: editFormData.title,
        description: editFormData.description,
        price: parseFloat(editFormData.price.replace(/,/g, "")),
        address: editFormData.address,
        image_url: editFormData.image_url,
      };

      await api.put(`/properties/${editingProperty.id}`, updatedProperty);

      // Update the properties list
      setProperties(
        properties.map((p) =>
          p.id === editingProperty.id ? updatedProperty : p,
        ),
      );

      toast.success("Property updated successfully!");
      setEditingProperty(null);
    } catch (error) {
      toast.error("Failed to update property");
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Properties</h1>
        <input
          type="text"
          placeholder="Search by title or location..."
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="relative group">
              <PropertyCard
                id={property.id}
                title={property.title}
                price={property.price}
                location={property.address}
                image_url={property.image_url}
              />

              {/* Admin Actions - Only visible to admin */}
              {user?.role === "ADMIN" && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(property)}
                    className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
                  value={editFormData.title}
                  onChange={handleEditChange}
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
                  value={editFormData.description}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (Rs.) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
                  value={editFormData.price}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
                  value={editFormData.address}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image_url"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mauve-500"
                  value={editFormData.image_url}
                  onChange={handleEditChange}
                  placeholder="https://example.com/image.jpg"
                />
                {editFormData.image_url && (
                  <div className="mt-2">
                    <img
                      src={editFormData.image_url}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-mauve-600 text-white px-6 py-2 rounded-lg hover:bg-mauve-700 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
