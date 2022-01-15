import { Request, Response } from "express";
import PartoAborto from "../models/tbl_partoaborto";

export const getPartosAbortos = async (req: Request, res: Response) => {
    const partosAbortos = await PartoAborto.findAll({
        where: {
            par_estado: true
        }
    });

    if (!partosAbortos) {
        return res.status(400).json({
            msg: `No existen ningún parto/aborto`
        })
    }
    res.json({
        msg: `Lista de partos/abortos`,
        dato: partosAbortos
    });
}

export const getPartoAborto = async (req: Request, res: Response) => {
    const { par_id } = req.params;
    const partoAborto = await PartoAborto.findByPk(par_id);
    if (!partoAborto) {
        return res.status(400).json({
            msg: `No se encontró un registro con el id: ${par_id}`
        });
    }
    res.json({
        msg: `Detalle de parto/aborto`,
        dato: [partoAborto]
    })
}

export const postPartoAborto = async (req: Request, res: Response) => {
    const {
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        ite_idpartoaborto
    } = req.body;
    const partoAborto = await PartoAborto.build({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        ite_idpartoaborto
    });
    partoAborto.save();
    res.json({
        msg: `Se creo un nuevo registo de parto/aborto`,
        dato: [partoAborto]
    });
}

export const putPartoAborto = async (req: Request, res: Response) => {
    const { par_id } = req.params;
    const partoAborto = await PartoAborto.findByPk(par_id);
    if (!partoAborto) {
        return res.status(400).json({
            msg: `No existe un registro de parto/aborto con el id: ${par_id}`
        });
    }
    const {
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        ite_idpartoaborto
    } = req.body;
    await partoAborto.update({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        ite_idpartoaborto
    });
    res.json({
        msg: `Se acutalizó el registro parto/aborto con id: ${par_id}`,
        dato: [partoAborto]
    })
}

export const deletePartoAborto = async (req: Request, res: Response) => {
    const { par_id } = req.params;
    const partoAborto = await PartoAborto.findByPk(par_id);
    if (!partoAborto) {
        return res.status(400).json({
            msg: `No existe un registro de parto/aborto con el id: ${par_id}`
        });
    }
    
    await partoAborto.update({par_estado: false});
    res.json({
        msg: `Se eliminó el registro parto/aborto con id: ${par_id}`,
        dato: [partoAborto]
    })
}