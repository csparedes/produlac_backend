import {
    Request,
    Response
} from 'express';
import Aborto from '../models/tbl_aborto';
import Animales from '../models/tbl_animales';

export const getAbortos = async (req: Request, res: Response) => {
    const abortos = await Aborto.findAll({
        where: {
            abo_estado: true
        },
        include: {
            model: Animales
        }
    });

    if (!abortos) {
        return res.status(400).json({
            msg: `No se encontro ningún aborto registrado`
        });
    }

    res.json({
        msg: `Lista de abortos`,
        dato: abortos
    });
}

export const getAborto = async (req: Request, res: Response) => {
    const {
        abo_id
    } = req.params;
    const aborto = await Aborto.findOne({
        where: {
            abo_id,
            abo_estado: true
        }
    });

    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${abo_id}`
        });
    }

    res.json({
        msg: `Detalle del aborto`,
        dato: [aborto]
    });
}
export const getAbortosPorAnimal = async (req: Request, res: Response) => {
    const {
        ani_id
    } = req.params;
    const aborto = await Aborto.findAll({
        where: {
            ani_idmadre: ani_id,
            abo_estado: true
        },
        include: {
            model: Animales
        }
    });

    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${ani_id}`
        });
    }

    res.json({
        msg: `Detalle del aborto`,
        dato: aborto
    });
}

export const postAborto = async (req: Request, res: Response) => {
    const {
        abo_fecha,
        ani_idmadre,
        abo_descripcion
    } = req.body;

    const aborto = await Aborto.build({
        abo_fecha,
        ani_idmadre,
        abo_descripcion
    });
    aborto.save();

    res.json({
        msg: `Se ha creado un nuevo registro de aborto`,
        dato: [aborto]
    })
}

export const putAborto = async (req: Request, res: Response) => {
    const {
        abo_id
    } = req.params;
    const aborto = await Aborto.findOne({
        where: {
            abo_id,
            abo_estado: true
        }
    });

    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${abo_id}`
        });
    }
    const {
        abo_fecha,
        ani_idmadre,
        abo_descripcion
    } = req.body;
    await aborto.update({
        abo_fecha,
        ani_idmadre,
        abo_descripcion
    });

    res.json({
        msg: `Se actualizó un nuevo aborto`,
        dato: [aborto]
    })
}

export const deleteAborto = async (req: Request, res: Response) => {
    const {
        abo_id
    } = req.params;
    const aborto = await Aborto.findOne({
        where: {
            abo_id,
            abo_estado: true
        }
    });

    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${abo_id}`
        });
    }

    await aborto.update({
        abo_estado: false
    });

    res.json({
        msg: `Se elimino el registro de aborto`,
        dato: [aborto]
    })
}