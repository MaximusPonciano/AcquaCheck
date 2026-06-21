import Checklist from "../../../model/Checklist.js";
import ItemChecklist from "../../../model/ItemChecklist.js";
import Attraction from "../../../model/Attraction.js";
import Question from "../../../model/Question.js";
import sequelize from "../../../../database/sequelize.js";
import { messages } from "../../../../config/constants.js";

export default async function CreateChecklistController(req, res) {
  const t = await sequelize.transaction();

  try {
    const { attractionId, notes, items } = req.body;
    
    if (!attractionId) {
      await t.rollback();
      return res.status(400).json({ message: messages.checklist.error.requiredAttraction });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "É obrigatório enviar pelo menos uma resposta no checklist." });
    }

    const attraction = await Attraction.findByPk(attractionId);
    if (!attraction) {
      await t.rollback();
      return res.status(404).json({ message: messages.attraction.error.notFound });
    }

    // NOVA VALIDAÇÃO: Garantir que TODAS as perguntas respondidas realmente pertencem a essa atração
    const sentQuestionIds = items.map(item => item.questionId);
    
    // Conta quantas dessas perguntas realmente existem no banco E pertencem à atração correta
    const validQuestionsCount = await Question.count({
      where: {
        id: sentQuestionIds,
        attractionId: attractionId
      }
    });

    // Filtra para garantir que não tem questionId duplicado no payload
    const uniqueSentIds = new Set(sentQuestionIds);
    
    if (validQuestionsCount !== uniqueSentIds.size) {
      await t.rollback();
      return res.status(400).json({ message: messages.checklist.error.invalidQuestions });
    }

    const checklist = await Checklist.create({
      userId: req.user.id,
      attractionId,
      dateTime: new Date(),
      notes: notes || null
    }, { transaction: t });

    const itemsToInsert = items.map(item => ({
      checklistId: checklist.id,
      questionId: item.questionId,
      compliant: item.compliant
    }));

    await ItemChecklist.bulkCreate(itemsToInsert, { transaction: t });

    await t.commit();

    return res.status(201).json({
      message: messages.checklist.success.created,
      checklistId: checklist.id
    });

  } catch (error) {
    await t.rollback();
    console.error("Erro ao criar checklist completo:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
