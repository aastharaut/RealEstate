import { useState } from "react";
import { Heart } from "lucide-react";

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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);

    // 👉 Later connect this to backend / redux
    console.log(`Property ${id} favorite:`, !isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image Section */}
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

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={`${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{location}</p>
        <p className="text-2xl font-bold text-purple-600 mt-2">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
