import Question from "../../../model/Question.js";
import { messages } from "../../../../config/constants.js";

export default async function GetQuestionController(req, res) {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id, {
      attributes: ["id", "attractionId", "question"]
    });
    
    if (!question) {
      return res.status(404).json({ message: messages.question.error.notFound });
    }
    
    return res.status(200).json(question);
  } catch (error) {
    console.error("Erro ao buscar pergunta:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
