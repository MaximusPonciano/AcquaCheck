import { DataTypes } from "sequelize";
import sequelize from "../../database/sequelize.js";

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    attractionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "attraction_id",
      references: { model: "attractions", key: "id" },
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "questions",
    timestamps: true,
    paranoid: true,
    deletedAt: "deleted_at",
  },
);

export default Question;
