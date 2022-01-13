import { Request, Response } from "express";
import Venta from "../models/tbl_venta";

export const getVentas = async (req: Request, res: Response) => {
    const ventas = await Venta.findAll({
        where: {
            ven_estado: true
        }
    });
    if (!ventas) {
        return res.status(400).json({
            msg: `No existe ningún registro de ventas`
        });
    }

    res.json({
        msg: `Lista de ventas`,
        ventas
    });
}

export const getVenta = async (req: Request, res: Response) => {
    const { ven_id } = req.params;
    const venta = await Venta.findByPk(ven_id);
    if (!venta) {
        return res.status(400).json({
            msg: `No existe venta con el id: ${ven_id}`
        });
    }
    res.json({
        msg: `Detalle de Venta`,
        venta
    })
}

export const postVenta = async (req: Request, res: Response) => {
    const {
        ani_id,
        ven_fecha,
        per_idvendedor,
        ven_comprador,
        ven_telcomprador,
        ven_cedulacomprador,
        ven_direccioncomprador,
        ven_valor
    } = req.body;

    const venta = await Venta.build({
        ani_id,
        ven_fecha,
        per_idvendedor,
        ven_comprador,
        ven_telcomprador,
        ven_cedulacomprador,
        ven_direccioncomprador,
        ven_valor
    });
    venta.save();
    res.json({
        msg: `Se creó un nuevo registro de venta`,
        venta
    })
}

export const putVenta = async (req: Request, res: Response) => {
    const { ven_id } = req.params;
    const venta = await Venta.findByPk(ven_id);
    if (!venta) {
        return res.status(400).json({
            msg: `No existe un registro de venta con id: ${ven_id}`
        })
    }
    const {
        ani_id,
        ven_fecha,
        per_idvendedor,
        ven_comprador,
        ven_telcomprador,
        ven_cedulacomprador,
        ven_direccioncomprador,
        ven_valor
    } = req.body;
    await venta.update({
        ani_id,
        ven_fecha,
        per_idvendedor,
        ven_comprador,
        ven_telcomprador,
        ven_cedulacomprador,
        ven_direccioncomprador,
        ven_valor
    });
    res.json({
        msg: `Se actualizó el registro de venta`,
        venta
    });
    
}

export const deleteVenta = async (req: Request, res: Response) => {
    const { ven_id } = req.params;
    const venta = await Venta.findByPk(ven_id);
    if (!venta) {
        return res.status(400).json({
            msg: `No existe un registro de venta con id: ${ven_id}`
        })
    }
    
    await venta.update({ ven_estado: false});
    res.json({
        msg: `Se eliminó el registro de venta`,
        venta
    });
}