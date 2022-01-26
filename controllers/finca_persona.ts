import { Request, Response } from "express";
import { QueryTypes } from 'sequelize';
import Finca from "../models/tbl_finca";
import FincaPersona from "../models/tbl_fincapersona";
import Persona from "../models/tbl_personas";

export const getFincasPersonas = async (req: Request, res: Response) => {
    const fincasPersonas = await FincaPersona.sequelize?.query(`
    SELECT * FROM tbl_fincapersona as fincapersona
    INNER JOIN tbl_personas P1 On fincapersona.per_id = P1.per_id
    INNER JOIN tbl_rol R1 On P1.rol_id = R1.rol_id
    INNER join tbl_finca F1 ON fincapersona.fin_id = F1.fin_id
    `, { type: QueryTypes.SELECT })
    if (!fincasPersonas) {
        return res.status(400).json({
            msg: `No existe ningún registro de fincas-personas en la base de datos`
        })
    }

    res.json({
        msg: `Lista de personas`,
        dato: fincasPersonas
    })
}

export const getFincasDePersona = async (req: Request, res: Response) => {
    const { per_id } = req.params;
    const fincasPersonas = await FincaPersona.findAll({
        where: {
            per_id,
            fper_estado: true
        },
        include: [
            { model: Finca },
            { model: Persona}
        ]
    });
    if (!fincasPersonas) {
        return res.status(400).json({
            msg: `No existe ningún registro de fincas-personas en la base de datos`
        })
    }

    res.json({
        msg: `Lista de personas`,
        dato: fincasPersonas
    })
}

export const getFincaPersona = async (req: Request, res: Response) => {
    const { fper_id } = req.params;
    const fincaPersona = await FincaPersona.findOne({
        where: {
            fper_id,
            fper_estado: true
        },
        include: [
            { model: Persona },
            { model: Finca}
        ]
    });
    if (!fincaPersona) {
        return res.status(400).json({
            msg: `No existe ningún registro en la base de datos`
        })
    }
    res.json({
        msg: `Detalle finca persona`,
        dato: [fincaPersona]
    })
}
export const getPersonasPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const fincaPersona = await FincaPersona.sequelize?.query(`
    SELECT * FROM tbl_fincapersona as fincapersona
    JOIN tbl_personas P1 On fincapersona.per_id = P1.per_id
    JOIN tbl_rol R1 On P1.rol_id = R1.rol_id
    INNER join tbl_finca F1 ON fincapersona.fin_id = F1.fin_id
    WHERE F1.fin_id =${fin_id}
    `, { type: QueryTypes.SELECT })
    if (!fincaPersona) {
        return res.status(400).json({
            msg: `No existe ningún registro en la base de datos`
        })
    }
    res.json({
        msg: `Personas de una Finca`,
        dato: fincaPersona
    })
}

export const postFincaPersona = async (req: Request, res: Response) => {
    const { per_id, fin_id } = req.body;
    const fincaPersonaBuscada = await FincaPersona.findOne({
        where: {
            per_id,
            fin_id,
            fper_estado: true
        }
    });
    if (fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `La finca-persona ya se encuentra registrada`
        });
    }

    const nuevaFinca = { per_id, fin_id };
    const fincaPersona = await FincaPersona.build(nuevaFinca);
    fincaPersona.save();

    res.json({
        msg: `Se ha creado un nuevo ingreso de finca-persona`,
        dato: [fincaPersona]
    });

}

export const putFincaPersona = async (req: Request, res: Response) => {
    const { fper_id } = req.params;
    const fincaPersonaBuscada = await FincaPersona.findOne({
        where: {
            fper_id,
            fper_estado: true
        }
    })
    if (!fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `El registro no consta en la base de datos`
        });
    }

    const { per_id, fin_id } = req.body;
    await fincaPersonaBuscada.update({ per_id, fin_id });
    res.json({
        msg: `Se actualizo la entrada de id: ${fper_id}`,
        dato: [fincaPersonaBuscada]
    })

}

export const deleteFincaPersona = async (req: Request, res: Response) => {
    const { fper_id } = req.params;
    const fincaPersonaBuscada = await FincaPersona.findOne({
        where: {
            fper_id,
            fper_estado: true
        }
    });
    if (!fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `El registro no consta en la base de datos`
        });
    }
    await fincaPersonaBuscada.update({ fper_estado: false });
    res.json({
        msg: `Se ha eliminado el registro de id: ${fper_id}`,
        dato: [fincaPersonaBuscada]
    });
}