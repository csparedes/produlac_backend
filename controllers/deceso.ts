import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import Animales from "../models/tbl_animales";
import Deceso from "../models/tbl_deceso";

export const getDecesos = async (req: Request, res: Response) => {
    const decesos = await Deceso.findAll({
        where: {
            dec_estado: true
        },
        include: {
            model: Animales
        }
    });
    if (!decesos) {
        return res.status(400).json({
            msg: `No existe ningún deceso registrado en la base de datos`
        });
    }

    res.json({
        msg: `Lista de Decesos`,
        dato: decesos
    })
}
export const getDecesosPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const decesos = await Deceso.sequelize?.query(`
    SELECT *
    FROM tbl_deceso
    INNER JOIN tbl_animales A ON tbl_deceso.ani_id = A.ani_id
    WHERE A.fin_id = ${fin_id}
    `, { type: QueryTypes.SELECT });
    
    if (!decesos) {
        return res.status(400).json({
            msg: `No existe ningún deceso registrado en la base de datos`
        });
    }

    res.json({
        msg: `Lista de Decesos`,
        dato: decesos
    })
}

export const getDeceso = async (req: Request, res: Response) => {
    const { dec_id } = req.params;
    const deceso = await Deceso.findOne({
        where: {
            dec_id,
            dec_estado: true
        },
        include: { model: Animales }
    });
    if (!deceso) {
        return res.status(400).json({
            msg: `No existe ningún registro con el id: ${dec_id}`
        });
    }
    res.json({
        msg: `Se ha encontrado el registro con el deceso`,
        dato: [deceso]
    })
}

export const postDeceso = async (req: Request, res: Response) => {
    const {
        ani_id,
        dec_fecha,
        dec_causa,
        dec_descripcion,
    } = req.body;
    const nuevoDeceso = {
        ani_id,
        dec_fecha,
        dec_causa,
        dec_descripcion,
    };
    const deceso = await Deceso.build(nuevoDeceso);
    deceso.save();
    
    //Actualizar en tbl_animal
    const animal = await Animales.findOne({
        where: {
            ani_id,
            ani_estado: true
        }
    });
    if (!animal) {
        return res.status(400).json({
            msg: `No se encontro el animal para deceso`
        });
    }
    // await animal.update({ ite_idetipoestado: 7 });
    await animal.update({ ite_idtipoestado: 7 , ani_estado:0});
    
    
    res.json({
        msg: `Se creó un nuevo Deceso :(`,
        dato: [deceso]
    });
}

export const putDeceso = async (req: Request, res: Response) => {
    const { dec_id } = req.params;
    const decesoActual = await Deceso.findOne({
        where: {
            dec_id,
            dec_estado: true
        },
    });
    if (!decesoActual) {
        return res.status(400).json({
            msg: `No existe un deceso con el id: ${dec_id}`
        });
    }
    const {
        ani_id,
        dec_fecha,
        dec_causa,
        dec_descripcion,
    } = req.body;
    await decesoActual.update({
        ani_id,
        dec_fecha,
        dec_causa,
        dec_descripcion,
    });
    res.json({
        msg: `Se actualizó el deceso con id: ${dec_id}`,
        dato: [decesoActual]
    });
}

export const deleteDeceso = async (req: Request, res: Response) => {
    const { dec_id } = req.params;
    const decesoActual = await Deceso.findOne({
        where: {
            dec_id,
            dec_estado: true
        },
    });
    if (!decesoActual) {
        return res.status(400).json({
            msg: `No existe un deceso con el id: ${dec_id}`
        });
    }
    await decesoActual.update({ estado: false });
    res.json({
        msg: `Se ha eliminado el deceso con id: ${dec_id}`,
        dato: [decesoActual]
    });
}