import { Request, Response } from "express";
import Item from "../models/tbl_item";

export const getItems = async (req: Request, res: Response) => {
    const items = await Item.findAll({
        where: {
            ite_estado: true
        }
    });
    if (!items) {
        return res.status(400).json({
            msg: `No existe la lista de items`
        });
    }
    res.json({
        msg: `Lista de Items`,
        items
    });
}

export const getItem = async (req: Request, res: Response) => {
    const { ite_id } = req.params;
    const item = await Item.findByPk(ite_id);
    if (!item) {
        return res.status(400).json({
            msg: ` No se encontró ningún detalle de item`
        })
    }
    res.json({
        msg: `Detalle de Item`,
        item
    })
}

