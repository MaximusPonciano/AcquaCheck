import Checklist from "../../../model/Checklist.js";
import User from "../../../model/User.js";
import Attraction from "../../../model/Attraction.js";
import ItemChecklist from "../../../model/ItemChecklist.js";
import Question from "../../../model/Question.js";
import { messages } from "../../../../config/constants.js";

export default async function GetChecklistController(req, res) {
  try {
    const { id } = req.params;

    const checklist = await Checklist.findByPk(id, {
      attributes: ["id", "dateTime", "notes"],
      include: [
        { model: User, as: "user", attributes: ["id", "name"] },
        { model: Attraction, as: "attraction", attributes: ["id", "name"] },
        { 
          model: ItemChecklist, 
          as: "items",
          attributes: ["id", "compliant"],
          include: [
            { model: Question, as: "question", attributes: ["id", "question"] }
          ]
        }
      ]
    });

    if (!checklist) {
      return res.status(404).json({ message: messages.checklist.error.notFound });
    }

    return res.status(200).json(checklist);
  } catch (error) {
    console.error("Erro ao buscar checklist:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
