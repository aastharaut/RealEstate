import { DataTypes } from "sequelize";
import sequelize from "../connections/database";

const Favourite = sequelize.define(
  "Favourite",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "properties", key: "id" },
    },
  },
  {
    tableName: "favourites",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "property_id"],
        name: "unique_user_property_favourite",
      },
    ],
  },
);

module.exports = Favourite;
