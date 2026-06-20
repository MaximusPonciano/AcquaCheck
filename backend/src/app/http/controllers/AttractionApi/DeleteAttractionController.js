import Attraction from "../../../model/Attraction.js";
import { messages } from "../../../../config/constants.js";

export default async function DeleteAttractionController(req, res) {
  try {
    const { id } = req.params;
    
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: messages.auth.error.accessDenied });
    }
    
    const attraction = await Attraction.findByPk(id);
    if (!attraction) {
      return res.status(404).json({ message: messages.attraction.error.notFound });
    }
    
    await attraction.destroy();
    
    return res.status(200).json({ message: messages.attraction.success.deleted });
  } catch (error) {
    console.error("Erro ao deletar atração:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
