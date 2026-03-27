import { DataTypes } from "sequelize";
import sequelize from "../connections/database";

const Property = sequelize.define(
  "Property",
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image_url: {
      type: DataTypes.STRING(500),
    },
  },
  {
    tableName: "properties",
    timestamps: true,
  },
);

export default Property;
