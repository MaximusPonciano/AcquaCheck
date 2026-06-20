import Attraction from "../../../model/Attraction.js";
import { messages } from "../../../../config/constants.js";

export default async function GetAttractionController(req, res) {
  try {
    const { id } = req.params;
    const attraction = await Attraction.findByPk(id, {
      attributes: ["id", "name", "active"]
    });
    
    if (!attraction) {
      return res.status(404).json({ message: messages.attraction.error.notFound });
    }
    
    return res.status(200).json(attraction);
  } catch (error) {
    console.error("Erro ao buscar atração:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
