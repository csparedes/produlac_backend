import { Request, Response } from "express";
import Deceso from "../models/tbl_deceso";

export const getDecesos = async (req: Request, res: Response) => {
    const decesos = await Deceso.findAll({
        where: {
            dec_estado: true
        }
    });
    if (!decesos) {
        return res.status(400).json({
            msg: `No existe ningún deceso registrado en la base de datos`
        });
    }

    res.json({
        msg: `Lista de Decesos`,
        dato: decesos
    })
}

export const getDeceso = async (req: Request, res: Response) => {
    const { dec_id } = req.params;
    const deceso = await Deceso.findByPk(dec_id);
    if (!deceso) {
        return res.status(400).json({
            msg: `No existe ningún registro con el id: ${dec_id}`
        });
    }
    res.json({
        msg: `Se ha encontrado el registro con el deceso`,
        dato: [deceso]
    })
}

export const postDeceso = async (req: Request, res: Response) => {
    const {
        dec_fecha,
        dec_causa,
        dec_descripcion,
    } = req.body;
    const nuevoDeceso = {
        dec_fecha,
        dec_causa,
        dec_descripcion,
    };
    const deceso = await Deceso.build(nuevoDeceso);
    deceso.save();
    res.json({
        msg: `Se creó un nuevo Deceso :(`,
        dato: [deceso]
    });
}

export const putDeceso = async (req: Request, res: Response) => {
    const { dec_id } = req.params;
    const decesoActual = await Deceso.findByPk(dec_id);
    if (!decesoActual) {
        return res.status(400).json({
            msg: `No existe un deceso con el id: ${dec_id}`
        });
    }
    const {
        dec_fecha,
        dec_causa,
        dec_descripcion,
    } = req.body;
    await decesoActual.update({
        dec_fecha,
        dec_causa,
        dec_descripcion,
    });
    res.json({
        msg: `Se actualizó el deceso con id: ${dec_id}`,
        dato: [decesoActual]
    });
}

export const deleteDeceso = async (req: Request, res: Response) => {
    const { dec_id } = req.params;
    const decesoActual = await Deceso.findByPk(dec_id);
    if (!decesoActual) {
        return res.status(400).json({
            msg: `No existe un deceso con el id: ${dec_id}`
        });
    }
    await decesoActual.update({ estado: false });
    res.json({
        msg: `Se ha eliminado el deceso con id: ${dec_id}`,
        dato: [decesoActual]
    });
}