import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Persona from "../models/tbl_personas";
import Rol from "../models/tbl_rol";
require('../models/asociaciones');

export const getPersonas = async (req: Request, res: Response) => {
    const personas = await Persona.findAll({
        where: {
            per_estado: true
        },
        include: {
            model: Rol
        }
    });

    if (!personas) {
        return res.status(400).json({
            msg: "Error en el crud personas"
        });
    }

    res.json({
        msg: "Lista de personas",
        dato: personas
    })
}

export const getPersona = async (req: Request, res: Response) => {
    const { per_cedula: per_id } = req.params;
    const persona = await Persona.findOne({
        where: {
            per_id,
            per_estado: true
        }    
    });

    if (!persona) {
        return res.status(400).json({
            msg: "No hay ninguna persona con ese id"
        });
    }

    res.json({
        msg: 'Persona encontrada',
        dato: [persona]
    });
}

export const postPersona = async (req: Request, res: Response) => {
    const {
        per_nombre,
        per_apellido,
        per_usuario,
        per_contraseña,
        per_imagen,
        per_cedula,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    } = req.body;

    const personaBuscada = await Persona.findOne({
        where: {
            per_cedula,
            per_correo,
            per_usuario,
            per_estado: true
        }
    });
    if (personaBuscada) {
        return res.status(401).json({
            msg: "Ya existe aquella persona en la base de datos"
        });
    }
    const salt = bcrypt.genSaltSync();
    const nuevaPersona = {
        per_nombre,
        per_apellido,
        per_usuario,
        per_contraseña: bcrypt.hashSync(per_contraseña, salt),
        per_imagen,
        per_cedula,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    };

    const persona = await Persona.build(nuevaPersona);
    persona.save();
    res.json({
        msg: 'Se ha creado una nueva persona',
        dato: [persona]
    });
}

export const putPersona = async (req: Request, res: Response) => {
    const { per_id } = req.params;
    const personaActual = await Persona.findOne({
        where: {
            per_id,
            per_estado: true
        }
    });
    
    if (!personaActual) {
        return res.status(401).json({
            msg: `Aquella persona no existe con el: ${per_id}`
        });
    }

    const {
        per_nombre,
        per_apellido,
        per_usuario,
        per_cedula,
        per_contraseña,
        per_imagen,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    } = req.body;
    const salt = bcrypt.genSaltSync();
    const nuevaPersona = {
        per_nombre,
        per_apellido,
        per_usuario,
        per_contraseña: bcrypt.hashSync(per_contraseña, salt),
        per_imagen,
        per_cedula,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    };

    await personaActual.update(nuevaPersona);
    res.json({
        msg: `Se actualizó la persona: ${per_nombre} ${per_apellido}`,
        dato: [nuevaPersona]
    });

}

export const deletePersona = async (req: Request, res: Response) => {
    const { per_cedula: per_id } = req.params;
    const personaActual = await Persona.findOne({
        where: {
            per_id,
            per_estado: true
        }
    });

    if (!personaActual) {
        return res.status(401).json({
            msg: `Aquella persona no existe con el: ${per_id}`
        });
    }

    await personaActual.update({ per_estado: false });
    res.json({
        msg: `La persona se ha eliminado de la base de datos`,
        dato: [ personaActual]
    })
}

