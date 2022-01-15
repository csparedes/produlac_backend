import { Request, Response } from "express";
import Animales from "../models/tbl_animales";
import ProdIndividual from "../models/tbl_prodindividual";

export const getProdIndividuales = async (req: Request, res: Response) => {
    const prodIndividuales = await ProdIndividual.findAll({
        where: {
            pro_estado: true
        },
        include: {
            model: Animales
        }
    });
    if (!prodIndividuales) {
        return res.status(400).json({
            msg: `No existe ninguna prodIndividual registrada`
        });
    }

    res.json({
        msg: `Lista de prodIndividuales`,
        dato: prodIndividuales
    })
}

export const getProdIndividual = async (req: Request, res: Response) => {
    const { pro_id } = req.params;
    const prodIndividual = await ProdIndividual.findByPk(pro_id, {
        include: {
        model: Animales
    }});
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe ningún prodIndividual con el id: ${pro_id}`
        })
    }
    res.json({
        msg: `Detalle de prodIndividual`,
        dato: [prodIndividual]
    })
}

export const postProdIndividuales = async (req: Request, res: Response) => {
    const {
        ani_id,
        pro_fecha,
        pro_horario,
        pro_litros,
        pro_dieta
    } = req.body;
    const prodIndividual = await ProdIndividual.build({
        ani_id,
        pro_fecha,
        pro_horario,
        pro_litros,
        pro_dieta
    });
    prodIndividual.save();
    res.json({
        msg: `Se ha ingresado un nuevo registro de prodIndividual`,
        dato: [prodIndividual]
    });
}

export const putProdIndividual = async (req: Request, res: Response) => {
    const { pro_id } = req.params;
    const prodIndividual = await ProdIndividual.findByPk(pro_id);
    if (!prodIndividual) {
        return res.status(400).json({
            msg:`No existe registro de prodIndividual de id: ${pro_id}`
        })
    }
    const {
        ani_id,
        pro_fecha,
        pro_horario,
        pro_litros,
        pro_dieta
    } = req.body;
    await prodIndividual.update({
        ani_id,
        pro_fecha,
        pro_horario,
        pro_litros,
        pro_dieta
    });
    res.json({
        msg: `Se actualizó el registro`,
        dato: [prodIndividual]
    });
}

export const deleteProdIndividual = async (req: Request, res: Response) => {
    const { pro_id } = req.params;
    const prodIndividual = await ProdIndividual.findByPk(pro_id);
    if (!prodIndividual) {
        return res.status(400).json({
            msg:`No existe registro de prodIndividual de id: ${pro_id}`
        })
    }
    await prodIndividual.update({pro_estado: false});
    res.json({
        msg: `Se eliminó el registro con id: ${pro_id}`,
        dato: [prodIndividual]
    });
}