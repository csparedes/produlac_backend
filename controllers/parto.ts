import { Response, Request } from 'express';
import sequelize, {QueryTypes} from 'sequelize';
import Animales from '../models/tbl_animales';
import Parto from '../models/tbl_parto';

export const getPartos = async (req: Request, res: Response) => {
    const partos = await Parto.sequelize?.query(`
    SELECT parto.*,
    A1.ani_id as animalmadre_ani_id,
    A1.ani_nombre as animalmadre_ani_nombre,
    A2.ani_id as animalhijo_ani_id,
    A2.ani_nombre as animalhijo_ani_nombre
    FROM tbl_parto as parto
    INNER JOIN tbl_animales A1 On parto.ani_idmadre=A1.ani_id
    INNER JOIN tbl_animales A2 On parto.ani_idhijo=A2.ani_id
    `,{ type: QueryTypes.SELECT });

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
export const getPartosPorAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    const partos = await Parto.sequelize?.query(`
    SELECT parto.* ,
    A1.ani_id as ani_id_madre,
    A1.ani_nombre as ani_id_madre_nombre,
    A1.ani_imagen as ani_id_madre_imagen,
    A2.ani_id as ani_id_hijo,
    A2.ani_nombre as ani_id_hijo_nombre,
    A2.ani_imagen as ani_id_hijo_imagen
    FROM tbl_parto as parto
    INNER JOIN tbl_animales A1 On parto.ani_idmadre= A1.ani_id
    INNER JOIN tbl_animales A2 On parto.ani_idhijo= A2.ani_id
    WHERE parto.ani_idmadre=${ani_id}
    `, { type: QueryTypes.SELECT });

    if (!partos) {
        return res.status(400).json({
            msg: `No existe un parto con el id: ${ani_id}`
        });
    }

    res.json({
        msg: `Detalle de parto`,
        dato: partos
    })
}

export const getPartosPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const partos = await Parto.sequelize?.query(`
    SELECT parto.*,
    A.ani_id as ani_id_madre,
    A.ani_nombre as ani_id_madre_nombre,
    A.ani_imagen as ani_id_madre_imagen,
    B.ani_id as ani_id_hijo,
    B.ani_nombre as ani_id_hijo_nombre,
    B.ani_imagen as ani_id_hijo_imagen
    FROM tbl_parto as parto
    INNER JOIN tbl_animales A on parto.ani_idmadre = A.ani_id
    INNER JOIN tbl_animales B on parto.ani_idhijo = B.ani_id
    WHERE A.fin_id = ${fin_id}
    `, { type: QueryTypes.SELECT });

    if (!partos) {
        return res.status(400).json({
            msg: `No existe partos de la finca de id: ${fin_id}`
        });
    }

    res.json({
        msg: `Detalle de parto`,
        dato: partos
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

