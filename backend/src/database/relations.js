import User from "../app/model/User.js";
import Attraction from "../app/model/Attraction.js";
import Question from "../app/model/Question.js";
import Checklist from "../app/model/Checklist.js";
import ItemChecklist from "../app/model/ItemChecklist.js";

export default function initRelations() {
  // 1. Attraction <-> Question (1:N)
  Attraction.hasMany(Question, { foreignKey: "attractionId", as: "questions" });
  Question.belongsTo(Attraction, {
    foreignKey: "attractionId",
    as: "attraction",  });

  User.hasMany(Checklist, { foreignKey: "userId", as: "checklists" });
  Checklist.belongsTo(User, { foreignKey: "userId", as: "user" });

  Attraction.hasMany(Checklist, {
    foreignKey: "attractionId",
    as: "checklists",
  });
  Checklist.belongsTo(Attraction, {
    foreignKey: "attractionId",
    as: "attraction",
  });

  Checklist.hasMany(ItemChecklist, { foreignKey: "checklistId", as: "items" });
  ItemChecklist.belongsTo(Checklist, {
    foreignKey: "checklistId",
    as: "checklist",
  });

  Question.hasMany(ItemChecklist, { foreignKey: "questionId", as: "items" });
  ItemChecklist.belongsTo(Question, {
    foreignKey: "questionId",
    as: "question",
  });

  Checklist.belongsToMany(Question, {
    through: ItemChecklist,
    foreignKey: "checklistId",
    otherKey: "questionId",
    as: "questions",
  });

  Question.belongsToMany(Checklist, {
    through: ItemChecklist,
    foreignKey: "questionId",
    otherKey: "checklistId",
    as: "checklists",
  });
}