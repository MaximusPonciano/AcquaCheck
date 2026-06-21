import User from "../../../model/User.js";
import { messages, config} from "../../../../config/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import redisClient from "../../../../database/redis.js";

export async function login (req, res){
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: messages.auth.error.requiredEmailPassword });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: messages.auth.error.userNotFound });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: messages.auth.error.invalidPassword });
    }

    const loggedUser = { id: user.id, role: user.role };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(loggedUser, secret, {
      expiresIn: config.jwt.expiresIn,
    });
    return res.json({ token });
  } catch (error) {
    console.error("Erro no login:", { error: error.message });
    return res.status(500).json({ message: messages.auth.error.loginError });
  }
};

export async function logout (req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ message: messages.auth.error.missingToken });
    }

    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.decode(token);
    
    if (decoded && decoded.exp) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const timeRemaining = decoded.exp - currentTimeInSeconds;

      if (timeRemaining > 0) {
        await redisClient.set(`blacklist:${token}`, "1", { EX: timeRemaining });
      }
    }

    return res.status(200).json({ message: messages.auth.success.loggedOut });
  } catch (error) {
    console.error("Erro no logout:", { error: error.message });
    return res.status(500).json({ message: messages.auth.error.logoutError });
  }
};
