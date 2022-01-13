import { Request, Response } from "express";
import FincaPersona from "../models/tbl_fincapersona";

export const getFincasPersonas = async (req: Request, res: Response) => {
    const fincasPersonas = await FincaPersona.findAll({
        where: {
            fper_estado: true
        }
    });
    if (!fincasPersonas) {
        return res.status(400).json({
            msg: `No existe ningún registro de fincas-personas en la base de datos`
        })
    }

    res.json({
        msg: `Lista de personas`,
        fincasPersonas
    })
}

export const getFincaPersona = async (req: Request, res: Response) => {
    const { fper_id } = req.params;
    const fincaPersona = await FincaPersona.findByPk(fper_id);
    if (!fincaPersona) {
        return res.status(400).json({
            msg: `No existe ningún registro en la base de datos`
        })
    }
    res.json({
        msg: `Detalle finca persona`,
        fincaPersona
    })
}

export const postFincaPersona = async (req: Request, res: Response) => {
    const { per_id, fin_id } = req.body;
    const fincaPersonaBuscada = await FincaPersona.findOne({
        where: {
            per_id,
            fin_id
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
        fincaPersona
    });

}

export const putFincaPersona = async (req: Request, res: Response) => {
    const { fper_id } = req.params;
    const fincaPersonaBuscada = await FincaPersona.findByPk(fper_id);
    if (!fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `El registro no consta en la base de datos`
        });
    }

    const { per_id, fin_id } = req.body;
    await fincaPersonaBuscada.update({ per_id, fin_id });
    res.json({
        msg: `Se actualizo la entrada de id: ${fper_id}`,
        fincaPersona: fincaPersonaBuscada
    })

}

export const deleteFincaPersona = async (req: Request, res: Response) => {
    const { fper_id } = req.params;
    const fincaPersonaBuscada = await FincaPersona.findByPk(fper_id);
    if (!fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `El registro no consta en la base de datos`
        });
    }
    await fincaPersonaBuscada.update({ fper_estado: false });
    res.json({
        msg: `Se ha eliminado el registro de id: ${fper_id}`,
        fincaPersona: fincaPersonaBuscada
    });
}