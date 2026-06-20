import User from "../../../model/User.js";
import { messages } from "../../../../config/constants.js";

export default async function DeleteUserController(req, res) {
  try {
    const { id } = req.params;
    
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso Negado: Apenas administradores podem deletar usuários." });
    }
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: messages.user.error.notFound });
    }
    
    await user.destroy();
    
    return res.status(200).json({ message: messages.user.success.deleted });
  } catch (error) {
    console.error("Erro ao deletar usuário:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}
