import { Request, Response } from "express";
import Persona from "../models/tbl_personas";

export const getPersonas = async (req: Request, res: Response) => {
    const personas = await Persona.findAll({
        where: {
            per_estado: true
        }
    });

    if (!personas) {
        return res.status(400).json({
            msg: "Error en el crud personas"
        });
    }

    res.json({
        msg: "Lista de personas",
        personas
    })
}

export const getPersona = async (req: Request, res: Response) => {
    const { per_cedula } = req.params;
    const persona = await Persona.findOne({
        where: {
            per_cedula,
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
        persona
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
            msg: "Ya existe aquella persona"
        });
    }

    const nuevaPersona = {
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
    };

    const persona = await Persona.build(nuevaPersona);
    persona.save();
    res.json({
        msg: 'Se ha creado una nueva persona',
        persona
    });
}

export const putPersona = async (req: Request, res: Response) => {
    const { per_cedula } = req.params;
    const personaActual = await Persona.findOne({
        where: {
            per_cedula,
            per_estado: true
        }
    });
    
    if (!personaActual) {
        return res.status(401).json({
            msg: `Aquella persona no existe con la cédula: ${per_cedula}`
        });
    }

    const {
        per_nombre,
        per_apellido,
        per_usuario,
        per_contraseña,
        per_imagen,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    } = req.body;
    const nuevaPersona = {
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
    };

    await personaActual.update(nuevaPersona);
    res.json({
        msg: `Se actualizó la persona: ${per_nombre} ${per_apellido}`,
        persona: nuevaPersona
    });

}

export const deletePersona = async (req: Request, res: Response) => {
    const { per_cedula } = req.params;
    const personaActual = await Persona.findOne({
        where: {
            per_cedula,
            per_estado: true
        }
    });

    if (!personaActual) {
        return res.status(401).json({
            msg: `Aquella persona no existe con la cédula: ${per_cedula}`
        });
    }

    await personaActual.update({ per_estado: false });
    res.json({
        msg: `La persona se ha eliminado de la base de datos`,
        persona: personaActual
    })
}

