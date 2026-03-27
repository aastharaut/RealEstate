import User from "./User";
import Property from "./Property";
import Favourite from "./Favourite";

User.hasMany(Favourite, { foreignKey: "user_id", as: "favourites" });
Favourite.belongsTo(User, { foreignKey: "user_id", as: "user" });

Property.hasMany(Favourite, { foreignKey: "property_id", as: "favourites" });
Favourite.belongsTo(Property, { foreignKey: "property_id", as: "property" });
