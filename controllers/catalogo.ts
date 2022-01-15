import { Request, Response } from "express";
import Catalogo from "../models/tbl_catalogo";

export const getCatalogos = async (req: Request, res: Response) => {
    const catalogos = await Catalogo.findAll({
        where: {
            cat_estado: true
        }
    });

    if (!catalogos) {
        return res.status(400).json({
            msg: `No existe ningún catálogo en nuestra base de datos`
        });
    }

    res.json({
        msg: `Lista de catálogos`,
        dato: catalogos
    });
}

export const getCatalogo = async (req: Request, res: Response) => {
    const { cat_id } = req.params;
    const catalogo = await Catalogo.findByPk(cat_id);
    if (!catalogo) {
        return res.status(400).json({
            msg: `No existe ningún catálogo con el id: ${cat_id}`
        });
    }
    res.json({
        msg: 'Se encontró el catálogo',
        dato: [catalogo]
    })
}

export const postCatalogo = async (req: Request, res: Response) => {
    const { cat_nombre } = req.body;
    const catalogoBuscado = await Catalogo.findOne({
        where: {
            cat_nombre
        }
    });
    if (catalogoBuscado) {
        return res.status(400).json({
            msg: `Ya existe el catálogo: ${cat_nombre}`
        })
    }

    const catalogo = await Catalogo.build({ cat_nombre });
    catalogo.save();

    res.json({
        msg: `Se ha creado en el catálogo: ${cat_nombre}`,
        dato: [catalogo]
    });
}

export const putCatalogo = async (req: Request, res: Response) => {
    const { cat_id } = req.params;
    const catalogoBuscado = await Catalogo.findByPk(cat_id);
    if (!catalogoBuscado) {
        return res.status(400).json({
            msg: `No existe el catálogo con id: ${cat_id}`
        });
    }
    const { cat_nombre } = req.body;
    catalogoBuscado.update({ cat_nombre });
    res.json({
        msg: `Se ha actualizado el catálogo: ${cat_nombre}`,
        dato: [catalogoBuscado]
    });
}

export const deleteCatalogo = async (req: Request, res: Response) => {
    const { cat_id } = req.params;
    const catalogoBuscado = await Catalogo.findByPk(cat_id);
    if (!catalogoBuscado) {
        return res.status(400).json({
            msg: `No existe el catálogo con id: ${cat_id}`
        });
    }
    
    catalogoBuscado.update({ ani_estado: false });
    res.json({
        msg: `Se ha eliminado del catálogo`,
        dato: [catalogoBuscado]
    });
}