import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
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
    const inseminaciones = await Inseminacion.sequelize?.query(`
    SELECT inseminacion.* ,A1.ani_id as ani_id_padre, A1.ani_nombre as ani_id_padre_nombre, A1.ani_imagen as ani_id_padre_imagen,
    A2.ani_id as ani_id_animal, A2.ani_nombre as ani_id_animal_nombre, A2.ani_imagen as ani_id_animal_imagen,
    P1.*
    FROM tbl_inseminacion  as inseminacion
    INNER JOIN tbl_animales A1 On inseminacion.ani_idpadre= A1.ani_id
    INNER JOIN tbl_animales A2 On inseminacion.ani_id= A2.ani_id
    INNER JOIN tbl_personas P1 On inseminacion.per_id= P1.per_id
    WHERE inseminacion.ani_id=${ani_id}
    `, { type: QueryTypes.SELECT })

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