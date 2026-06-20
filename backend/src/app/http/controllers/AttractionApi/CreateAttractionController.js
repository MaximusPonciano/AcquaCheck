import Attraction from "../../../model/Attraction.js";
import { messages } from "../../../../config/constants.js";

export default async function CreateAttractionController(req, res) {
  try {
    const { name, active } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }

    const errors = [];
    if (!name) errors.push(messages.attraction.error.requiredName);
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const existing = await Attraction.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: messages.attraction.error.nameInUse });
    }

    const attraction = await Attraction.create({
      name,
      active: active !== undefined ? active : true,
    });

    return res.status(201).json({
      message: messages.attraction.success.created,
      attraction: { id: attraction.id, name: attraction.name, active: attraction.active },
    });
  } catch (error) {
    console.error("Erro ao criar atração:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}