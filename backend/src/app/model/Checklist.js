import { DataTypes } from "sequelize";
import sequelize from "../../database/sequelize.js";

const Checklist = sequelize.define(
  "Checklist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: { model: "users", key: "id" },
    },
    attractionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "attraction_id",
      references: { model: "attractions", key: "id" },
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "date_time",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "checklists",
    timestamps: true,
    paranoid: true,
    deletedAt: "deleted_at",
  },
);

export default Checklist;
