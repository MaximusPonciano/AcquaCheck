import User from "../../model/User.js";
import { messages } from "../../../config/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function CreateUserController (req, res){
    try{
        let error = [];
        const {name, email, password} = req.body;
        if (!name) {
            error.push("name obrigatório!");
        }

        if (!email) {
            error.push("email obrigatório!");
        }

        if (!password) {
            error.push("password obrigatório!");
        }

        if (error.length > 0) {
            return res.status(400).json({ error: error });
        }
        
        // TODO: continuar com a criação do usuário
        return res.status(201).json({ message: "Usuário criado com sucesso!" });

    } catch (err) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}