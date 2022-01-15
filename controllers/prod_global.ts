import { Request, Response } from "express";
import ProdGlobal from "../models/tbl_prodglobal";

export const getProdGlobales = async (req: Request, res: Response) => {
    const prodGlobales = await ProdGlobal.findAll({
        where: {
            pglo_estado: true
        }
    });
    if (!prodGlobales) {
        return res.status(400).json({
            msg: `No existe ningún registro`
        })
    }
    res.json({
        msg: `Lista de prodGlobales`,
        dato: prodGlobales
    });
}

export const getProdGlobal = async (req: Request, res: Response) => {
    const { pglo_id } = req.params;
    const prodGlobal = await ProdGlobal.findByPk(pglo_id);
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No existe ningún prodGlobal con el id: ${pglo_id}`
        });
    }
    res.json({
        msg: `Detalle de prodGlobar`,
        dato: [prodGlobal]
    })
}

export const postProdGlobal = async (req: Request, res: Response) => {
    const {
        pglo_fecha,
        pglo_horario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    } = req.body;
    const prodGlobal = await ProdGlobal.build({
        pglo_fecha,
        pglo_horario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    });
    prodGlobal.save();
    res.json({
        msg: `Se agregó un nuevo registro`,
        dato: [prodGlobal]
    })
}

export const putProdGlobal = async (req: Request, res: Response) => {
    const { pglo_id } = req.params;
    const prodGlobal = await ProdGlobal.findByPk(pglo_id);
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    const {
        pglo_fecha,
        pglo_horario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    } = req.body;
    await prodGlobal.update({
        pglo_fecha,
        pglo_horario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    });
    res.json({
        msg: `Se actualizó el registro de la prodGlobal`,
        dato: [prodGlobal]
    });
}

export const deleteProdGlobar = async (req: Request, res: Response) => {
    const { pglo_id } = req.params;
    const prodGlobal = await ProdGlobal.findByPk(pglo_id);
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    
    await prodGlobal.update({ pglo_estado: false});
    res.json({
        msg: `Se eliminó el registro de la prodGlobal`,
        dato: [prodGlobal]
    });
}