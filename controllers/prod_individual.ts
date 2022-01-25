import { Request, Response } from "express";
import sequelize, { Op } from "sequelize";
import Animales from "../models/tbl_animales";
import Item from "../models/tbl_item";
import ProdIndividual from "../models/tbl_prodindividual";

export const getProdIndividuales = async (req: Request, res: Response) => {
    const prodIndividuales = await ProdIndividual.findAll({
        where: {
            pro_estado: true
        },
        include: [
            { model: Animales },
            { model: Item},
        ]
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
    const prodIndividual = await ProdIndividual.findOne({
        where: {
            pro_id,
            pro_estado: true
        },
        include: [
            { model: Animales },
            { model: Item}
        ],
    });
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
export const getProdIndividualPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const prodIndividual = await ProdIndividual.sequelize?.query(`
    SELECT prodindividual.* ,
    A1.*,
    I1.* 
    FROM tbl_prodindividual as prodindividual
    INNER JOIN  tbl_animales A1 on prodindividual.ani_id=A1.ani_id
    INNER JOIN tbl_item I1 on prodindividual.ite_idhorario=I1.ite_id
    WHERE A1.fin_id =${fin_id}
    `,);
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe ningún prodIndividual con el id: ${fin_id}`
        })
    }
    res.json({
        msg: `Detalle de prodIndividual`,
        dato: prodIndividual
    })
}
export const postProdIndividualPorAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    // const ani_id = req.params.ani_id;
    // const { fecha_inicio, fecha_fin } = req.body;
    const prodIndividual = await ProdIndividual.findAll({
        group: 'pro_fecha',
        // order: ['pro_fecha'],
        attributes: [
            [sequelize.fn('SUM',sequelize.col('pro_litros')), 'sum_pro_litros'],'pro_fecha'
        ],
        where: {
            ani_id,
            // pro_fecha: {
            //     [Op.lte]: fecha_fin,
            //     [Op.gte]: fecha_inicio
            // },
            pro_estado: true
        },
        // include: {
        //     model: Animales
        // },
    });
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe ningún prodIndividual con el animal: ${ani_id}`
        })
    }
    res.json({
        msg: `Detalle de prodIndividual`,
        dato: prodIndividual
    })
}

export const postProdIndividuales = async (req: Request, res: Response) => {
    const {
        ani_id,
        pro_fecha,
        ite_idhorario,
        pro_litros,
        pro_dieta
    } = req.body;
    const prodIndividual = await ProdIndividual.build({
        ani_id,
        pro_fecha,
        ite_idhorario,
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
    const prodIndividual = await ProdIndividual.findOne({
        where: {
            pro_id,
            pro_estado: true
        }
    });
    if (!prodIndividual) {
        return res.status(400).json({
            msg:`No existe registro de prodIndividual de id: ${pro_id}`
        })
    }
    const {
        ani_id,
        pro_fecha,
        ite_idhorario,
        pro_litros,
        pro_dieta
    } = req.body;
    await prodIndividual.update({
        ani_id,
        pro_fecha,
        ite_idhorario,
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
    const prodIndividual = await ProdIndividual.findOne({
        where: {
            pro_id,
            pro_estado: true
        }
    });
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