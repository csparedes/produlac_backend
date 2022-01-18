import { Request, Response } from "express";
import Rol from "../models/tbl_rol";

export const getRoles = async (req: Request, res: Response) => {
    const roles = await Rol.findAll({
        where: {
            rol_estado: true
        }
    });
    if (!roles) {
        return res.status(400).json({
            msg: `No existe ningún rol en el sistema`
        })
    }
    res.json({
        msg: `Listado de Roles`,
        dato: roles
    })
}

export const getRol = async (req: Request, res: Response) => {
    const { rol_id } = req.params;
    const rol = await Rol.findOne({
        where: {
            rol_id,
            rol_estado: true
        }
    });
    if (!rol) {
        return res.status(400).json({
            msg: `No existe el rol de id: ${rol_id}`
        });
    }
    res.json({
        msg: `Detalle de rol`,
        dato: [rol]
    })
}

export const postRol = async (req: Request, res: Response) => {
    const { rol_nombre } = req.body;
    const rolBuscado = await Rol.findOne({
        where: {
            rol_nombre,
            rol_estado: true
        }
    });
    if (rolBuscado) {
        return res.status(400).json({
            msg: `Ya existe ese rol.`
        });
    }
    const rol = await Rol.build({ rol_nombre });
    rol.save();
    res.json({
        msg: `Se ha creado un nuevo Rol`,
        dato: [rol]
    })
}

export const putRol = async (req: Request, res: Response) => {
    const { rol_id } = req.params;
    const rol = await Rol.findOne({
        where: {
            rol_id,
            rol_estado: true
        }
    });
    if (!rol) {
        return res.status(400).json({
            msg: `No existe el rol de id: ${rol_id}`
        });
    }
    const { rol_nombre } = req.body;
    await rol.update({ rol_nombre });
    res.json({
        msg: `Se actualizó el rol de id: ${rol_id}`,
        dato: [rol]
    })
}

export const deleteRol = async (req: Request, res: Response) => {
    const { rol_id } = req.params;
    const rol = await Rol.findOne({
        where: {
            rol_id,
            rol_estado: true
        }
    });
    if (!rol) {
        return res.status(400).json({
            msg: `No existe el rol de id: ${rol_id}`
        });
    }
    
    await rol.update({ rol_estado: false });
    res.json({
        msg: `Se eliminó el rol de id: ${rol_id}`,
        dato: [rol]
    })
}