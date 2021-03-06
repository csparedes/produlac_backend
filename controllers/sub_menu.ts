import { Request, Response } from "express";
import Menu from "../models/tbl_menu";
import SubMenu from "../models/tbl_submenu";

export const getSubMenus = async (req: Request, res: Response) => {
    const subMenus = await SubMenu.findAll({
        where: {
            smen_estado: true
        },
        include: {
            model: Menu
        }
    });
    if (!subMenus) {
        return res.status(400).json({
            msg: `No existe ningún submenu en la base de datos`
        });
    }
    res.json({
        msg: `Lista de Submenus`,
        dato: subMenus
    })
}

export const getSubMenu =async (req:Request, res:Response) => {
    const { smen_id } = req.params;
    const subMenu = await SubMenu.findOne({
        where: {
            smen_id,
            smen_estado: true
        },
        include: {
            model: Menu
        }
    });
    if (!subMenu) {
        return res.status(400).json({
            msg: `No existe submenu con el id: ${smen_id}`
        })
    }
    res.json({
        msg: `Muestra de submenu`,
        dato: [subMenu]
    })
}

export const postSubMenu = async (req: Request, res: Response) => {
    const {
        smen_nombre,
        smen_link,
        men_id
    } = req.body;
    const subMenuBuscado = await SubMenu.findOne({
        where: {
            smen_nombre,
            smen_estado: true
        }
    });
    if (subMenuBuscado) {
        return res.status(400).json({
            msg: `Ya existe el submenu`
        })
    }

    const subMenu = await SubMenu.build({
        smen_nombre,
        smen_link,
        men_id
    });
    subMenu.save();
    res.json({
        msg: `Se creó un nuevo submenu`,
        dato: [subMenu]
    })
}

export const putSubMenu =async (req:Request,res:Response) => {
    const { smen_id } = req.params;
    const subMenu = await SubMenu.findOne({
        where: {
            smen_id,
            smen_estado: true
        }
    });
    if (!subMenu) {
        return res.status(400).json({
            msg: `No existe el submenu de id: ${smen_id}`
        });
    }
    const {
        smen_nombre,
        smen_link,
        men_id
    } = req.body;
    await subMenu.update({
        smen_nombre,
        smen_link,
        men_id
    });
    res.json({
        msg: `Se actualizó el submenu de id: ${smen_id}`,
        dato: [subMenu]
    });
}

export const deleteSubMenu = async (req: Request, res: Response) => {
    const { smen_id } = req.params;
    const subMenu = await SubMenu.findOne({
        where: {
            smen_id,
            smen_estado: true
        }
    });
    if (!subMenu) {
        return res.status(400).json({
            msg: `No existe el submenu de id: ${smen_id}`
        });
    }
    await subMenu.update({smen_estado: false});
    res.json({
        msg: `Se eliminó el submenu de id: ${smen_id}`,
        dato: [subMenu]
    });
}