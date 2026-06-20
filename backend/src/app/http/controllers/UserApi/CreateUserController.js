import User from "../../../model/User.js";
import { messages } from "../../../../config/constants.js";
import bcrypt from "bcryptjs";

export default async function CreateUserController(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso Negado: Apenas administradores podem cadastrar novos usuários." });
    }

    const errors = [];
    if (!name) errors.push(messages.user.error.requiredName);
    if (!email) errors.push(messages.user.error.requiredEmail);
    if (!password) errors.push(messages.user.error.requiredPassword);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: messages.user.error.emailInUse });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "lifeguard",
    });

    return res.status(201).json({
      message: messages.user.success.created,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}