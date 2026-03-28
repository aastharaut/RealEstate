import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchFavourites } from "../redux/slice/favouriteSlice";
import PropertyCard from "../components/ui/PropertyCard";

const BuyerDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.value.data);
  const {
    items: favourites,
    loading,
    error,
  } = useSelector((state: RootState) => state.favourites);

  useEffect(() => {
    if (user?.role === "BUYER") {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  if (user?.role === "ADMIN") return <Navigate to="/admin" replace />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      {/* User Info */}
      <div className="bg-purple-50 rounded-lg p-6 mb-8">
        <p className="text-lg">
          Welcome, <span className="font-semibold">{user.name}</span>!
        </p>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>

      {/* Favourites Section */}
      <h2 className="text-2xl font-bold mb-4">My Favourites</h2>

      {loading && (
        <div className="text-center py-8 text-gray-500">
          Loading favourites...
        </div>
      )}

      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {!loading && !error && favourites.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No favourite properties yet.</p>
          <p className="text-sm mt-1">
            Browse properties and click the ❤️ to save them here.
          </p>
        </div>
      )}

      {!loading && favourites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              location={property.address}
              image_url={property.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
