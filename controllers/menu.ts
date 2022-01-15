import { Request, Response } from "express";
import Menu from "../models/tbl_menu";

export const getMenus = async (req: Request, res: Response) => {
    const menus = await Menu.findAll({
        where: {
            men_estado: true
        }
    });
    if (!menus) {
        return res.status(400).json({
            msg: `No hay ningún menú en la base de datos`
        });
    }

    res.json({
        msg: `Lista de menus`,
        dato: menus
    })
}

export const getMenu = async (req: Request, res: Response) => {
    const { men_id } = req.params;
    const menu = await Menu.findByPk(men_id);
    if (!menu) {
        return res.status(400).json({
            msg: `No existe menú con el id: ${men_id}`
        });
    }

    res.json({
        msg: `Menú encontrado`,
        dato: [menu]
    });
}

export const postMenu = async (req: Request, res: Response) => {
    const { men_nombre, men_icono, rol_id } = req.body;
    const menuBuscado = await Menu.findOne({
        where: {
            men_nombre,
            men_estado: true
        }
    });
    if (menuBuscado) {
        return res.status(400).json({
            msg: `Ya existe ese menú de nombre: ${men_nombre}`
        });
    }
    const menu = await Menu.build({ men_nombre, men_icono, rol_id });
    menu.save();
    res.json({
        msg: `Se creó un nuevo menú`,
        dato: [menu]
    });
}

export const putMenu = async (req: Request, res: Response) => {
    const { men_id } = req.params;
    const menu = await Menu.findByPk(men_id);
    if (!menu) {
        return res.status(400).json({
            msg: `No existe el menú con el item: ${men_id}`
        })
    }
    const { men_nombre, men_icono, rol_id } = req.body;
    await menu.update({ men_nombre, men_icono, rol_id });
    res.json({
        msg: `Se actualizó el menu de id: ${men_id}`,
        dato: [menu]
    });
}

export const deleteMenu = async (req: Request, res: Response) => {
    const { men_id } = req.params;
    const menu = await Menu.findByPk(men_id);
    if (!menu) {
        return res.status(400).json({
            msg: `No existe el menú con el item: ${men_id}`
        })
    }
    await menu.update({ men_estado: false });
    res.json({
        msg: `Se eliminó el menu de id: ${men_id}`,
        dato: [menu]
    });
}