import jwt from "jsonwebtoken";
import "dotenv/config";
import { messages } from "../../../config/constants.js";
import redisClient from "../../../database/redis.js";

const jwtSecret = process.env.JWT_SECRET;

export default async function authenticator(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: messages.auth.error.noToken });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    
    if (isBlacklisted) {
      return res.status(401).json({ message: messages.auth.error.blacklistedToken });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: messages.auth.error.invalidToken });
  }
}
