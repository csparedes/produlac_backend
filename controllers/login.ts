import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Persona from "../models/tbl_personas";
import generarJWT from "../helpers/generarJWT";

export const postLogin = async (req: Request, res: Response) => {
    const { per_usuario, per_contraseña } = req.body;

   try {
       const usuario = await Persona.findOne({
           where: {
               per_usuario,
               per_estado: true
           }
       });

       if (!usuario) {
           return res.status(401).json({
               msg: `El usuario ${per_usuario} no existe en la base de datos`
           })
       }
       //@ts-ignore
       const checkPass = bcrypt.compareSync(per_contraseña, usuario.per_contraseña);
       if (!checkPass) {
           return res.status(400).json({
               msg: `Contraseña Incorrecta`
            });
        }
        
       //@ts-ignore
       const token = await generarJWT([usuario.per_usuario ,usuario.per_nombre, usuario.per_apellido, usuario.per_correo, usuario.per_telefono]);
       res.json({
           usuario,
           token
       })
   } catch (error) {
       console.log(`Error Catch Login: ${error}`);
       res.status(500).json({
           msg: `Ha ocurrido un error de autenticación, comuníquese con el Admin`,
           error
       });
   }

}