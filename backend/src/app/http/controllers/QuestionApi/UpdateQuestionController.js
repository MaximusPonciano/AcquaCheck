import Question from "../../../model/Question.js";
import { messages } from "../../../../config/constants.js";

export default async function UpdateQuestionController(req, res) {
  try {
    const { id } = req.params;
    const { question } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }

    const existingQuestion = await Question.findByPk(id);
    if (!existingQuestion) {
      return res.status(404).json({ message: messages.question.error.notFound });
    }

    if (question && question !== existingQuestion.question) {
      const questionExists = await Question.findOne({ where: { question, attractionId: existingQuestion.attractionId } });
      if (questionExists) {
        return res.status(409).json({ message: messages.question.error.questionInUse });
      }
      existingQuestion.question = question;
    }

    await existingQuestion.save();

    return res.status(200).json({ message: messages.question.success.updated });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}