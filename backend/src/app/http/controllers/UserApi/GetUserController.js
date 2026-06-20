import User from "../../../model/User.js";
import { messages } from "../../../../config/constants.js";

export default async function GetUserController(req, res) {
  try {
    const { id } = req.params;

    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso Negado: Você só pode visualizar o seu próprio perfil." });
    }
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "role"]
    });
    
    if (!user) {
      return res.status(404).json({ message: messages.user.error.notFound });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
