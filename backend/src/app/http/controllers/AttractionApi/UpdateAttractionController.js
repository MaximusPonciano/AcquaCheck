import Attraction from "../../../model/Attraction.js";
import { messages } from "../../../../config/constants.js";

export default async function UpdateAttractionController(req, res) {
  try {
    const { id } = req.params;
    const { name, active } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }

    const attraction = await Attraction.findByPk(id);
    if (!attraction) {
      return res.status(404).json({ message: messages.attraction.error.notFound });
    }

    if (name && name !== attraction.name) {
      const nameExists = await Attraction.findOne({ where: { name } });
      if (nameExists) {
        return res.status(409).json({ message: messages.attraction.error.nameInUse });
      }
      attraction.name = name;
    }

    if (active !== undefined && active !== attraction.active) {
      attraction.active = active;
    }

    await attraction.save();

    return res.status(200).json({ message: messages.attraction.success.updated });
  } catch (error) {
    console.error("Erro ao atualizar atração:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}