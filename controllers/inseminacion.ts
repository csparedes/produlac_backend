import { Request, Response } from "express";
import Animales from "../models/tbl_animales";
import Inseminacion from "../models/tbl_inseminacion";
import Persona from "../models/tbl_personas";

export const getInseminaciones = async (req: Request, res: Response) => {
    const inseminaciones = await Inseminacion.findAll({
        where: {
            ins_estado: true
        },
        include: [
            { model: Animales },
            { model: Persona }
        ] 
    });

    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }

    res.json({
        msg: `Lista de inseminaciones`,
        dato: inseminaciones
    });
}
export const getInseminacionesPorAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    const inseminaciones = await Inseminacion.findAll({
        where: {
            ani_id,
            ins_estado: true
        },
        include: [
            { model: Animales },
            { model: Persona }
        ] 
    });

    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }

    res.json({
        msg: `Lista de inseminaciones`,
        dato: inseminaciones
    });
}

export const getInseminacion = async (req: Request, res: Response) => {
    const { ins_id } = req.params;
    const inseminacion = await Inseminacion.findOne({
        where: {
            ins_id,
            ins_estado: true
        },
        include: [
            { model: Persona },
            { model: Animales }
    ]});
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }

    res.json({
        msg: `Detalle de Inseminación`,
        dato: [inseminacion]
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
        dato: [inseminacion]
    })
}

export const putInseminacion = async (req: Request, res: Response) => {
    const { ins_id } = req.params;
    const inseminacion = await Inseminacion.findOne({
        where: {
            ins_id,
            ins_estado: true
        }
    })
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
        dato: [inseminacion]
    });
}

export const deleteInseminacion = async (req: Request, res: Response) => {
    const { ins_id } = req.params;
    const inseminacion = await Inseminacion.findOne({
        where: {
            ins_id,
            ins_estado: true
        }
    });
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el dato de inseminación con id: ${ins_id}`
        });
    }

    await inseminacion.update({ ins_estado: false });
    res.json({
        msg: `Se eliminó el dato de inseminación con id: ${ins_id}`,
        dato: [inseminacion]
    })
}