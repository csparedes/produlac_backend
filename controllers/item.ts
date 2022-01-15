import { Request, Response } from "express";
import Catalogo from "../models/tbl_catalogo";
import Item from "../models/tbl_item";

export const getItems = async (req: Request, res: Response) => {
    const items = await Item.findAll({
        where: {
            ite_estado: true
        },
        include: {
            model: Catalogo
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
            msg: ` No se encontró ningún detalle de item con el id: ${ite_id}`
        })
    }
    res.json({
        msg: `Detalle de Item`,
        item
    })
}

export const postItem = async (req: Request, res: Response) => {
    const { ite_nombre, cat_id } = req.body;
    const itemBuscado = await Item.findOne({
        where: {
            ite_nombre,
            cat_id,
            ite_estado: true
        }
    });
    if (itemBuscado) {
        return res.status(400).json({
            msg: `Ya existe ese item`
        })
    }

    const item = await Item.build({ ite_nombre, cat_id });
    item.save();
    res.json({
        msg: `Se creó un nuevo item`,
        item
    });

}

export const putItem = async (req: Request, res: Response) => {
    const { ite_id } = req.params;
    const item = await Item.findByPk(ite_id);
    if (!item) {
        return res.status(400).json({
            msg: `No existe el item con el id: ${ite_id}`
        });
    }

    const { ite_nombre, cat_id } = req.body;
    await item.update({ ite_nombre, cat_id });

    res.json({
        msg: `Se actualizó el item ${ite_id}`,
        item
    })
}

export const deleteItem = async (req: Request, res: Response) => {
    const { ite_id } = req.params;
    const item = await Item.findByPk(ite_id);
    if (!item) {
        return res.status(400).json({
            msg: `No existe el item con el id: ${ite_id}`
        });
    }

    
    await item.update({ ite_estado: false });

    res.json({
        msg: `Se eliminó el item ${ite_id}`,
        item
    })
}

