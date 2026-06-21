import Checklist from "../../../model/Checklist.js";
import ItemChecklist from "../../../model/ItemChecklist.js";
import sequelize from "../../../../database/sequelize.js";
import { messages } from "../../../../config/constants.js";

export default async function DeleteChecklistController(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      await t.rollback();
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }

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
      return res.status(403).json({ message: messages.checklist.error.expiredDelete });
    }

    await ItemChecklist.destroy({ where: { checklistId: checklist.id }, transaction: t });

    await checklist.destroy({ transaction: t });

    await t.commit();

    return res.status(200).json({ message: messages.checklist.success.deleted });
  } catch (error) {
    await t.rollback();
    console.error("Erro ao deletar checklist:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
