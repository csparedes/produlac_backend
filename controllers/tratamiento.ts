import { Request, Response } from "express";
import Animales from "../models/tbl_animales";

import Tratamiento from "../models/tbl_tratamiento";

export const getTratamientos = async (req: Request, res: Response) => {
    const tratamientos = await Tratamiento.findAll({
        where: {
            tra_estado: true
        },
        include: {
            model: Animales
        }
    });
    if (!tratamientos) {
        return res.status(400).json({
            msg: `No existe tratamientos en la base de datos`
        });
    }
    res.json({
        msg: `Lista de tratamietos`,
        dato: tratamientos
    })
}

export const getTratamiento = async (req: Request, res: Response) => {
    const { tra_id } = req.params;
    const tratamiento = await Tratamiento.findOne({
        where: {
            tra_id,
            tra_estado: true
        },
        include: { model: Animales }
    });
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe tratamiento con el id: ${tra_id}`
        });
    }
    res.json({
        msg: `Detalle de tratamiento`,
        dato: [tratamiento]
    })
}
export const getTratamientosAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    const tratamiento = await Tratamiento.findAll({
        where: {
            ani_id,
            tra_estado: true
        },
        include: { model: Animales }
    });
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe tratamiento con el id: ${ani_id}`
        });
    }
    res.json({
        msg: `Detalle de tratamiento`,
        dato: tratamiento
    })
}

export const postTratamiento = async (req: Request, res: Response) => {
    const {
        tra_fecha,
        ani_id,
        tra_diagnostico,
        tra_medicamento,
        tra_diastratamiento,
        tra_descripcion
    } = req.body;
    const tratamiento = await Tratamiento.build({
        tra_fecha,
        ani_id,
        tra_diagnostico,
        tra_medicamento,
        tra_diastratamiento,
        tra_descripcion
    });
    tratamiento.save();
    res.json({
        msg: `Se creó un nuevo tratamiento`,
        dato: [tratamiento]
    });
}

export const putTratamiento = async (req: Request, res: Response) => {
    const { tra_id } = req.params;
    const tratamiento = await Tratamiento.findOne({
        where: {
            tra_id,
            tra_estado: true
        }
    })
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe ningún tratamiento con el id: ${tra_id}`
        });
    }
    const {
        tra_fecha,
        ani_id,
        tra_diagnostico,
        tra_medicamento,
        tra_diastratamiento,
        tra_descripcion
    } = req.body;
    await tratamiento.update({
        tra_fecha,
        ani_id,
        tra_diagnostico,
        tra_medicamento,
        tra_diastratamiento,
        tra_descripcion
    });

    res.json({
        msg: `Se actualizó el tratamiento de id: ${tra_id}`,
        dato: [tratamiento]
    })
}

export const deleteTratamiento = async (req: Request, res: Response) => {
    const { tra_id } = req.params;
    const tratamiento = await Tratamiento.findOne({
        where: {
            tra_id,
            tra_estado: true
        }
    })
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe ningún tratamiento con el id: ${tra_id}`
        });
    }
    
    await tratamiento.update({tra_estado: false});

    res.json({
        msg: `Se eliminó el tratamiento de id: ${tra_id}`,
        dato: [tratamiento]
    })
}