import { DataTypes } from "sequelize";
import sequelize from "../connections/database";
import { ROLES } from "../constants/roles";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      allowNull: false,
      defaultValue: ROLES.BUYER,
    },

    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "users",
    underscored: true,
    timestamps: true,
  },
);

export default User;
