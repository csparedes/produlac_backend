import { Request, Response } from "express";
import Inseminacion from "../models/tbl_inseminacion";

export const getInseminaciones = async (req: Request, res: Response) => {
    const inseminaciones = await Inseminacion.findAll({
        where: {
            ins_estado: true
        }
    });

    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }

    res.json({
        msg: `Lista de inseminaciones`,
        inseminaciones
    });
}

export const getInseminacion = async (req: Request, res: Response) => {
    const { ins_id } = req.params;
    const inseminacion = await Inseminacion.findByPk(ins_id);
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }

    res.json({
        msg: `Detalle de Inseminación`,
        inseminacion
    })
}

export const postInseminacion = async (req: Request, res: Response) => {
    const {
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    } = req.body;
    const inseminacion = await Inseminacion.build({
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    });
    inseminacion.save();

    res.json({
        msg: `Se ha creado un nuevo registro de inseminación.`,
        inseminacion
    })
}

export const putInseminacion = async (req: Request, res: Response) => {
    const { ins_id } = req.params;
    const inseminacion = await Inseminacion.findByPk(ins_id);
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }

    const {
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    } = req.body;

    await inseminacion.update({
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    });

    res.json({
        msg: `Se actualizó el dato de inseminación`,
        inseminacion
    });
}

export const deleteInseminacion = async (req: Request, res: Response) => {
    const { ins_id } = req.params;
    const inseminacion = await Inseminacion.findByPk(ins_id);
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el dato de inseminación con id: ${ins_id}`
        });
    }

    await inseminacion.update({ ins_estado: false });
    res.json({
        msg: `Se eliminó el dato de inseminación con id: ${ins_id}`,
        inseminacion
    })
}