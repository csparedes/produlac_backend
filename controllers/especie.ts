import { Request, Response } from 'express';
import Catalogo from '../models/tbl_catalogo';
import Especie from '../models/tbl_especies';

export const getEspecies = async (req: Request, res: Response) => {
    const especies = await Especie.findAll({
        where: {
            esp_estado: true
        },
        include: {
            model: Catalogo
        }
    });
    if (!especies) {
        return res.status(400).json({
            msg: `No existe ninguna especie animal en la base de datos`
        })
    }
    res.json({
        msg: `Lista de especies animales`,
        dato: especies,
        
    })
}

export const getEspecie = async (req: Request, res: Response) => {
    const { esp_id } = req.params;
    const especie = await Especie.findByPk(esp_id, { include: { model: Catalogo } });
    if (!especie) {
        return res.status(400).json({
            msg: `No existe ninguna especie con el id: ${esp_id}`
        })
    }
    res.json({
        msg: `Detalle de la especie`,
        dato: [especie]
    })
}

export const postEspecie = async (req: Request, res: Response) => {
    const { esp_nombre, cat_id } = req.body;
    const especieBuscada = await Especie.findOne({
        where: {
            esp_nombre
        }
    });
    if (especieBuscada) {
        return res.status(400).json({
            msg: `Ya existe la especie animal: ${esp_nombre}`
        })
    }

    const especie = await Especie.build({ esp_nombre, cat_id });
    especie.save();
    return res.json({
        msg: `Se agregó la especie ${esp_nombre}`,
        dato: [especie]
    });
}

export const putEspecie = async (req: Request, res: Response) => {
    const { esp_id } = req.params;
    const especie = await Especie.findByPk(esp_id);
    if (!especie) {
        return res.status(400).json({
            msg: `No existe la especie con el id: ${esp_id}`
        })
    }
    const { esp_nombre, cat_id } = req.body;
    await especie.update({ esp_nombre, cat_id });
    res.json({
        msg: `Se actualizó la especie`,
        dato: [especie]
    })
}

export const deleteEspecie = async (req: Request, res: Response) => {
    const { esp_id } = req.params;
    const especie = await Especie.findByPk(esp_id);
    if (!especie) {
        return res.status(400).json({
            msg: `No existe la especie con el id: ${esp_id}`
        })
    }
    await especie.update({ esp_estado: false });
    res.json({
        msg: `Se la eliminó especie`,
        dato: [especie]
    });
}