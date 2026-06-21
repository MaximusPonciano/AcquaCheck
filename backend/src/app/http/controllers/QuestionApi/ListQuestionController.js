import Question from "../../../model/Question.js";
import { messages } from "../../../../config/constants.js";

export default async function ListQuestionController(req, res) {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const offset = (page - 1) * limit;

    const { count, rows } = await Question.findAndCountAll({
      attributes: ["id", "attractionId", "question"],
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
    console.error("Erro ao listar perguntas:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}