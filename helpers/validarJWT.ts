import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import Persona from "../models/tbl_personas";

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    const secretKey = process.env.SECRETKEYJWT;

    if (!token) {
        return res.status(401).json({
            msg: `No hay token en la petición`
        });
    }

    try {
        //@ts-ignore
        const uid = jwt.verify(token, secretKey);
        const per_usuario = uid.uid;
        const usuario = await Persona.findOne({
            where: {
                per_usuario
            }
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Token no válido, el usuario no existe en la base de datos'
            })
        }
        next();
    } catch (err) {
        console.log(`Error validando el jwt: ${err}`);
        res.status(402).json({
            msg: `Token inválido, quizás caducó`
        })
        
    }
}

export default validarJWT;