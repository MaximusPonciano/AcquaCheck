import Checklist from "../../../model/Checklist.js";
import User from "../../../model/User.js";
import Attraction from "../../../model/Attraction.js";
import { messages } from "../../../../config/constants.js";

export default async function ListChecklistController(req, res) {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const offset = (page - 1) * limit;

    const { count, rows } = await Checklist.findAndCountAll({
      attributes: ["id", "dateTime", "notes"],
      include: [
        { model: User, as: "user", attributes: ["id", "name"] },
        { model: Attraction, as: "attraction", attributes: ["id", "name"] }
      ],
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
    console.error("Erro ao listar checklists:", { error: error.message });
    return res.status(500).json({ message: messages.common.error.serverError });
  }
}