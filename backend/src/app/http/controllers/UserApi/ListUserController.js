import User from "../../../model/User.js";
import { messages } from "../../../../config/constants.js";

export default async function ListUserController(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso Negado: Apenas administradores podem listar os usuários do sistema." });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      attributes: ["id", "name", "email", "role"],
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]]
    });

    return res.status(200).json({
      data: rows,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}