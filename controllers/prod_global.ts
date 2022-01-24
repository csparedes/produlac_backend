import { Request, Response } from "express";
import sequelize from "sequelize";
import Finca from "../models/tbl_finca";
import Item from "../models/tbl_item";
import ProdGlobal from "../models/tbl_prodglobal";

export const getProdGlobales = async (req: Request, res: Response) => {
    const prodGlobales = await ProdGlobal.findAll({
        where: {
            pglo_estado: true
        },
        include: [
            { model: Finca },
            { model: Item}
        ]
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

export const getProdGlobalesPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const prodGlobales = await ProdGlobal.findAll({
        where: {
            fin_id,
            pglo_estado: true
        },
        group: 'pglo_fecha',
        attributes: [
            [sequelize.fn('SUM',sequelize.col('pglo_litros')),'sum_pglo_litros'], 'pglo_fecha'
        ]
    });
    if (!prodGlobales) {
        return res.status(400).json({
            msg: `No existe ningún registro para la finca: ${fin_id}`
        })
    }
    res.json({
        msg: `Lista de prodGlobales`,
        dato: prodGlobales
    });
}

export const getProdGlobal = async (req: Request, res: Response) => {
    const { pglo_id } = req.params;
    const prodGlobal = await ProdGlobal.findOne({
        where: {
            pglo_id,
            pglo_estado: true
        },
        include: [
            { model: Finca },
            { model: Item}
        ]
        
    });
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
        ite_idhorario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    } = req.body;
    const prodGlobal = await ProdGlobal.build({
        pglo_fecha,
        ite_idhorario,
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
    const prodGlobal = await ProdGlobal.findOne({
        where: {
            pglo_id,
            pglo_estado: true
        }
    });
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    const {
        pglo_fecha,
        ite_idhorario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    } = req.body;
    await prodGlobal.update({
        pglo_fecha,
        ite_idhorario,
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
    const prodGlobal = await ProdGlobal.findOne({
        where: {
            pglo_id,
            pglo_estado: true
        }
    });
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