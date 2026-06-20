import User from "../../model/User.js";
import { messages } from "../../../config/constants.js";

export default async function ListUserController(req, res) {
  try {

    const users = await User.findAll({
      attributes: ["name", "email"],
    });

    res.json(users);
  } catch (error) {

    res.status(500).json({ message: messages.common.error.serverError });
  }
}
