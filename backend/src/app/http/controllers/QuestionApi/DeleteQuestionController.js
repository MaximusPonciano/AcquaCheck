import Question from "../../../model/Question.js";
import { messages } from "../../../../config/constants.js";

export default async function DeleteQuestionController(req, res) {
  try {
    const { id } = req.params;
    
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }
    
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: messages.question.error.notFound });
    }
    
    await question.destroy();
    
    return res.status(200).json({ message: messages.question.success.deleted });
  } catch (error) {
    console.error("Erro ao deletar pergunta:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
