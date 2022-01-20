import { Request, Response } from "express";
import Finca from "../models/tbl_finca";
import FincaPersona from "../models/tbl_fincapersona";
import Persona from "../models/tbl_personas";

export const getFincasPersonas = async (req: Request, res: Response) => {
    const fincasPersonas = await FincaPersona.findAll({
        where: {
            fper_estado: true
        },
        include: [
            { model: Persona },
            { model: Finca }
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

export const getFincasDePersona = async (req: Request, res: Response) => {
    const { per_id } = req.params;
    const fincasPersonas = await FincaPersona.findAll({
        where: {
            fper_estado: true,
            per_id
        },
        include: [
            { model: Finca }
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
        }
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