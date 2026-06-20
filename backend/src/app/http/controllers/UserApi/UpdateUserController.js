import User from "../../../model/User.js";
import { messages } from "../../../../config/constants.js";
import bcrypt from "bcryptjs";

export default async function UpdateUserController(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    if (req.user.id !== parseInt(id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso Negado: Você só pode alterar o seu próprio usuário." });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: messages.user.error.notFound });
    }

    if (name) user.name = name;
    
    if (role) {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acesso Negado: Apenas administradores podem alterar o cargo (role)." });
      }
      user.role = role;
    }
    if (password) user.password = await bcrypt.hash(password, 10);

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(409).json({ message: messages.user.error.emailInUse });
      }
      user.email = email;
    }

    await user.save();

    return res.status(200).json({ message: messages.user.success.updated });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}