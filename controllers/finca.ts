import { Request, Response } from "express";
import Finca from "../models/tbl_finca";
import Persona from "../models/tbl_personas";

export const getFincas = async (req: Request, res: Response) => {
    const fincas = await Finca.findAll({
        where: {
            fin_estado: true
        },
        include: {
            model: Persona
        }
    });

    if (!fincas) {
        return res.status(400).json({
            msg: `No existe ninguna finca en la base de datos`
        });
    }

    res.json({
        msg: `Listado de Fincas`,
        dato: fincas
    });
}

export const getFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const fincaBuscada = await Finca.findOne({
        where: {
            fin_id,
            fin_estado: true
        },
        include: {
            model: Persona
        }
    })
    if (!fincaBuscada) {
        return res.status(400).json({
            msg: `No existe ninguna finca con el id: ${fin_id}`
        });
    }
    res.json({
        msg: `Detalles de la Finca`,
        dato: [fincaBuscada]
    });
}

export const postFinca = async (req: Request, res: Response) => {
    const {
        fin_nombre,
        fin_extension,
        fin_imagen,
        fin_pais,
        fin_provincia,
        fin_ciudad,
        fin_telefono,
        per_id
    } = req.body;
    const fincaBuscar = await Finca.findOne({
        where: {
            fin_nombre,
            fin_estado: true
        },
    });
    if (fincaBuscar) {
        return res.status(400).json({
            msg: `Ya existe aquella finca en el sistema`
        });
    }
    const nuevaFinca = {
        fin_nombre,
        fin_extension,
        fin_imagen,
        fin_pais,
        fin_provincia,
        fin_ciudad,
        fin_telefono,
        per_id
    };
    const finca = await Finca.build(nuevaFinca);
    finca.save();
    res.json({
        msg: `Se creó una nueva Finca`,
        dato: [finca]
    });
}

export const putFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const finca = await Finca.findOne({
        where: {
            fin_id,
            fin_estado: true
        },
    });
    if (!finca) {
        return res.status(400).json({
            msg: `No existe la finca con el id: ${fin_id}`
        });
    }
    const {
        fin_nombre,
        fin_extension,
        fin_imagen,
        fin_pais,
        fin_provincia,
        fin_ciudad,
        fin_telefono,
        per_id
    } = req.body;

    const nuevaFinca = {
        fin_nombre,
        fin_extension,
        fin_imagen,
        fin_pais,
        fin_provincia,
        fin_ciudad,
        fin_telefono,
        per_id
    };
    await finca.update(nuevaFinca);
    res.json({
        msg: `Se actualizó la finca con el id: ${fin_id}`,
        dato: [finca]
    });
}

export const deleteFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const finca = await Finca.findOne({
        where: {
            fin_id,
            fin_estado: true
        },
    });
    if (!finca) {
        return res.status(400).json({
            msg: `No existe la finca con el id: ${fin_id}`
        });
    }
    await finca.update({ fin_estado: false });
    res.json({
        msg: `Se eliminó la finca con el id: ${fin_id}`,
        dato: [finca]
    })
}