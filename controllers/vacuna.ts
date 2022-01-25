import { Request, Response } from "express";
import Animales from "../models/tbl_animales";
import Vacuna from "../models/tbl_vacuna";

export const getVacunas = async (req: Request, res: Response) => {
    const vacunas = await Vacuna.findAll({
        where: {
            vac_estado: true
        },
        include: {
            model: Animales
        }
    });

    if (!vacunas) {
        return res.status(400).json({
            msg: `No existe ningún dato de vacunas en la base de datos`
        });
    }
    res.json({
        msg: `Listado de vacunas`,
        dato: vacunas
    });
}

export const getVacuna =async (req:Request, res:Response) => {
    const { vac_id } = req.params;
    const vacuna = await Vacuna.findOne({
        where: {
            vac_id,
            vac_estado: true
        },
        include: {
        model: Animales
    }});
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe ninguna vacuna con el id: ${vac_id}`
        });
    }
    res.json({
        msg: `Detalle de Vacuna`,
        dato: [vacuna]
    })
}
export const getVacunaPorAnimal =async (req:Request, res:Response) => {
    const { ani_id } = req.params;
    const vacuna = await Vacuna.findOne({
        where: {
            ani_id,
            vac_estado: true
        },
        include: {
        model: Animales
    }});
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe ninguna vacuna con el id: ${ani_id}`
        });
    }
    res.json({
        msg: `Detalle de Vacuna`,
        dato: [vacuna]
    })
}

export const postVacuna = async (req: Request, res: Response) => {
    const {
        vac_fecha,
        ani_id,
        vac_vacuna,
        vac_enfermedad,
        vac_descripcion
    } = req.body;
    const vacuna = await Vacuna.build({
        vac_fecha,
        ani_id,
        vac_vacuna,
        vac_enfermedad,
        vac_descripcion
    });
    vacuna.save();

    res.json({
        msg: `Se creó un nuevo registro de vacuna`,
        dato: [vacuna]
    });
}

export const putVacuna = async (req: Request, res: Response) => {
    const { vac_id } = req.params;
    const vacuna = await Vacuna.findOne({
        where: {
            vac_id,
            vac_estado: true
        }
    });
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe un registro de vacuna con el id: ${vac_id}`
        });
    }
    const {
        vac_fecha,
        ani_id,
        vac_vacuna,
        vac_enfermedad,
        vac_descripcion
    } = req.body;
    await vacuna.update({
        vac_fecha,
        ani_id,
        vac_vacuna,
        vac_enfermedad,
        vac_descripcion
    });
    res.json({
        msg: `Se actualizó el registro de vacuna con el id: ${vac_id}`,
        dato: [vacuna]
    });
}

export const deleteVacuna = async (req: Request, res: Response) => {
    const { vac_id } = req.params;
    const vacuna = await Vacuna.findOne({
        where: {
            vac_id,
            vac_estado: true
        }
    });
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe un registro de vacuna con el id: ${vac_id}`
        });
    }
    
    await vacuna.update({ vac_estado: false});
    res.json({
        msg: `Se eliminó el registro de vacuna con el id: ${vac_id}`,
        dato: [vacuna]
    });
}