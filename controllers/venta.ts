import { Request, Response } from "express";
import { QueryTypes } from 'sequelize';
import Animales from "../models/tbl_animales";
import Persona from "../models/tbl_personas";
import Venta from "../models/tbl_venta";

export const getVentas = async (req: Request, res: Response) => {
    const ventas = await Venta.findAll({
        where: {
            ven_estado: true
        },
        include: [
            { model: Animales },
            { model: Persona }
        ]
    });
    if (!ventas) {
        return res.status(400).json({
            msg: `No existe ningún registro de ventas`
        });
    }

    res.json({
        msg: `Lista de ventas`,
        dato: ventas
    });
}
export const getVentasPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const ventas = await Venta.sequelize?.query(`
    SELECT * FROM tbl_venta
    INNER JOIN tbl_animales A1 on tbl_venta.ani_id=A1.ani_id
    WHERE A1.fin_id=${fin_id}
    `,{type: QueryTypes.SELECT})
    if (!ventas) {
        return res.status(400).json({
            msg: `No existe ningún registro de ventas de la finca: ${fin_id}`
        });
    }

    res.json({
        msg: `Lista de ventas por finca`,
        dato: ventas
    });
}

export const getVenta = async (req: Request, res: Response) => {
    const { ven_id } = req.params;
    const venta = await Venta.findByPk(ven_id, {
        include: [
            { model: Animales },
            { model: Persona }
        ]
    });
    if (!venta) {
        return res.status(400).json({
            msg: `No existe venta con el id: ${ven_id}`
        });
    }
    res.json({
        msg: `Detalle de Venta`,
        dato: [venta]
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
        dato: [venta]
    })
}

export const putVenta = async (req: Request, res: Response) => {
    const { ven_id } = req.params;
    const venta = await Venta.findOne({
        where: {
            ven_id,
            ven_estado: true
        }
    })
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
        dato: [venta]
    });
    
}

export const deleteVenta = async (req: Request, res: Response) => {
    const { ven_id } = req.params;
    const venta = await Venta.findOne({
        where: {
            ven_id,
            ven_estado: true
        }
    })
    if (!venta) {
        return res.status(400).json({
            msg: `No existe un registro de venta con id: ${ven_id}`
        })
    }
    
    await venta.update({ ven_estado: false});
    res.json({
        msg: `Se eliminó el registro de venta`,
        dato: [venta]
    });
}