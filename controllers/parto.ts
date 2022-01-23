import { Response, Request } from 'express';
import sequelize, {QueryTypes} from 'sequelize';
import Animales from '../models/tbl_animales';
import Parto from '../models/tbl_parto';

export const getPartos = async (req: Request, res: Response) => {
    const partos = await Parto.sequelize?.query(`SELECT parto.*, A1.ani_id as animalmadre_ani_id , A1.ani_nombre as animalmadre_ani_nombre, A2.ani_id as animalhijo_ani_id , A2.ani_nombre as animalhijo_ani_nombre FROM tbl_parto as parto INNER JOIN tbl_animales A1 On parto.ani_idmadre=A1.ani_id INNER JOIN tbl_animales A2 On parto.ani_idhijo=A2.ani_id`, { type: QueryTypes.SELECT });

    if (!partos) {
        return res.status(400).json({
            msg: "No existe ningún registro de partos"
        });
    }
 

    res.json({
        msg: `Lista de Partos`,
        dato: partos
    })
}
export const getParto = async (req: Request, res: Response) => {
    const { par_id } = req.params;
    const parto = await Parto.findOne({
        where: {
            par_id,
            par_estado: true
        }
    });

    if (!parto) {
        return res.status(400).json({
            msg: `No existe un parto con el id: ${par_id}`
        });
    }

    res.json({
        msg: `Detalle de parto`,
        dato: [parto]
    })
}

export const postParto = async (req: Request, res: Response) => {
    const {
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        par_descripcion
    } = req.body;
    const parto = await Parto.build({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        par_descripcion
    });
    parto.save();
    res.json({
        msg: `Se ha creado un nuevo parto`,
        dato: [parto]
    })
}
export const putParto = async (req: Request, res: Response) => {
    const { par_id } = req.params;
    const partoBuscado = await Parto.findOne({
        where: {
            par_id,
            par_estado: true
        }
    });
    if (!partoBuscado) {
        return res.status(400).json({
            msg: `No se encontró el parto con el id: ${par_id}`
        });
    }

    const {
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        par_descripcion
    } = req.body;
    
    await partoBuscado.update({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        par_descripcion
    });
    
    res.json({
        msg: `Se ha actualizado un nuevo parto`,
        dato: [partoBuscado]
    })
}
export const deleteParto = async (req: Request, res: Response) => {
    const { par_id } = req.params;
    const partoBuscado = await Parto.findOne({
        where: {
            par_id,
            par_estado: true
        }
    });
    if (!partoBuscado) {
        return res.status(400).json({
            msg: `No se encontró el parto con el id: ${par_id}`
        });
    }
    
    await partoBuscado.update({par_estado: false});
    
    res.json({
        msg: `Se ha eliminado el parto`,
        dato: [partoBuscado]
    })
}

