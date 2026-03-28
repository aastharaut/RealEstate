import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  addFavourite,
  removeFavourite,
} from "../../redux/slice/favouriteSlice";
import { toast } from "react-toastify";

interface PropertyCardProps {
  id: number;
  title: string;
  price: number;
  location: string;
  image_url?: string;
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  image_url,
}: PropertyCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.value.data);

  const isFavourite = useSelector((state: RootState) =>
    state.favourites.items.some((p) => p.id === id),
  );

  const handleFavourite = async () => {
    if (!user || user.role !== "BUYER") return;

    try {
      if (isFavourite) {
        await dispatch(removeFavourite(id)).unwrap();
        toast.success("Removed from favourites");
      } else {
        await dispatch(
          addFavourite({
            id,
            title,
            price,
            address: location,
            image_url: image_url || "",
          }),
        ).unwrap();
        toast.success("Added to favourites!");
      }
    } catch (error: any) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative h-48 bg-gray-200">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {user?.role === "BUYER" && (
          <button
            onClick={handleFavourite}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <Heart
              size={18}
              className={
                isFavourite ? "fill-rose-300 text-rose-400" : "text-gray-600"
              }
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{location}</p>
        <p className="text-2xl font-bold text-mauve-600 mt-2">
          Rs.{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
