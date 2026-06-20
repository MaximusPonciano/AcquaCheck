import User from "../../../model/User.js";
import { messages, config} from "../../../../config/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function login (req, res){
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e Senha são obrigatórios." });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: messages.auth.error.userNotFound });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: messages.auth.error.invalidPassword });
    }

    const loggedUser = { id: user.id, role: user.role };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(loggedUser, secret, {
      expiresIn: config.jwt.expiresIn,
    });
    return res.json({ token });
  } catch (error) {
    console.error("Erro no login:", { error: error.message });
    return res.status(500).json({ message: "Erro interno do servidor ao tentar fazer login." });
  }
};
