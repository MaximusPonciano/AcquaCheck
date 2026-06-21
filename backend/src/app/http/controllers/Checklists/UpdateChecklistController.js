import Checklist from "../../../model/Checklist.js";
import ItemChecklist from "../../../model/ItemChecklist.js";
import Question from "../../../model/Question.js";
import sequelize from "../../../../database/sequelize.js";
import { messages } from "../../../../config/constants.js";

export default async function UpdateChecklistController(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { notes, items } = req.body;

    const checklist = await Checklist.findByPk(id);

    if (!checklist) {
      await t.rollback();
      return res.status(404).json({ message: messages.checklist.error.notFound });
    }

    const now = new Date();
    const checklistDate = new Date(checklist.dateTime);
    const diffInHours = Math.abs(now - checklistDate) / (1000 * 60 * 60);

    if (diffInHours > 24) {
      await t.rollback();
      return res.status(403).json({ message: messages.checklist.error.expiredUpdate });
    }

    if (checklist.userId !== req.user.id && req.user.role !== "admin") {
      await t.rollback();
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }

    if (notes !== undefined) {
      checklist.notes = notes;
      await checklist.save({ transaction: t });
    }

    if (items && Array.isArray(items) && items.length > 0) {
      const sentQuestionIds = items.map(item => item.questionId);
      const validQuestionsCount = await Question.count({
        where: { id: sentQuestionIds, attractionId: checklist.attractionId }
      });
      const uniqueSentIds = new Set(sentQuestionIds);
      
      if (validQuestionsCount !== uniqueSentIds.size) {
        await t.rollback();
        return res.status(400).json({ message: messages.checklist.error.invalidQuestions });
      }

      await ItemChecklist.destroy({ where: { checklistId: checklist.id }, transaction: t });

      const itemsToInsert = items.map(item => ({
        checklistId: checklist.id,
        questionId: item.questionId,
        compliant: item.compliant
      }));

      await ItemChecklist.bulkCreate(itemsToInsert, { transaction: t });
    }

    await t.commit();
    return res.status(200).json({ message: messages.checklist.success.updated });

  } catch (error) {
    await t.rollback();
    console.error("Erro ao atualizar checklist:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
