import Question from "../../../model/Question.js";
import { messages } from "../../../../config/constants.js";
import Attraction from "../../../model/Attraction.js";

export default async function CreateQuestionController(req, res) {
  try {
    const { attractionId, question } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }

    const errors = [];
    if (!attractionId) errors.push(messages.checklist.error.requiredAttraction);
    if (!question) errors.push(messages.question.error.requiredText);
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Verifica se a atração realmente existe
    const attraction = await Attraction.findByPk(attractionId);
    if (!attraction) {
      return res.status(404).json({ message: messages.attraction.error.notFound });
    }

    // Verifica se ESSA pergunta já existe para ESSA atração
    const existing = await Question.findOne({ where: { question, attractionId } });
    if (existing) {
      return res.status(409).json({ message: messages.question.error.questionInUse });
    }

    const newQuestion = await Question.create({
      attractionId,
      question,
    });

    return res.status(201).json({
      message: messages.question.success.created,
      question: { id: newQuestion.id, attractionId: newQuestion.attractionId, question: newQuestion.question },
    });
  } catch (error) {
    console.error("Erro ao criar pergunta:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
